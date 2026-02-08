const db = require('../db/db');
const { getAuthorEarnings } = require('../utils/earningsCalculator');


function getAuthors() {
  return new Promise((resolve, reject) => {

    db.all(`SELECT * FROM authors`, async (err, authors) => {
      if (err) return reject(err);

      const results = await Promise.all(authors.map(a => getAuthorSummary(a)));

      resolve(results);
    });

  });
}

function getAuthorSummary(author) {

  return new Promise((resolve, reject) => {

    getAuthorEarnings(author.id).then((earnings) => {

      db.get(
        `SELECT SUM(amount) AS withdrawn FROM withdrawals WHERE author_id=?`,
        [author.id],
        (err, wRow) => {

          if (err) return reject(err);

          const withdrawn = wRow?.withdrawn || 0;

          resolve({
            id: author.id,
            name: author.name,
            total_earnings: earnings,
            current_balance: earnings - withdrawn
          });

        });

    }).catch(reject);

  });

}


function getAuthorDetail(id) {

  return new Promise((resolve, reject) => {

    db.get(`SELECT * FROM authors WHERE id=?`, [id], (err, author) => {

      if (!author) return resolve(null);

      db.all(`SELECT * FROM books WHERE author_id=?`, [id], (err, books) => {

        author.total_books = books.length;
        author.books = books;

        resolve(author);

      });

    });

  });

}

function getAuthorSales(id) {

  return new Promise((resolve, reject) => {

    const query = `
    SELECT b.title book_title,
           s.quantity,
           s.sale_date,
           s.quantity*b.royalty AS royalty_earned
    FROM books b
    JOIN sales s ON b.id=s.book_id
    WHERE b.author_id=?
    ORDER BY s.sale_date DESC`;

    db.all(query, [id], (err, rows) => {
      resolve(rows);
    });

  });

}

function getAuthorWithdrawals(id) {

  return new Promise((resolve) => {

    db.all(`SELECT * FROM withdrawals WHERE author_id=? ORDER BY created_at DESC`,
      [id], (err, rows) => resolve(rows));

  });

}

module.exports = {
  getAuthors,
  getAuthorDetail,
  getAuthorSales,
  getAuthorWithdrawals
};
