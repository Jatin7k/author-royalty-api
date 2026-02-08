const db = require('../db/db');

function getAuthorEarnings(authorId) {

  return new Promise((resolve, reject) => {

    const query = `
      SELECT SUM(s.quantity * b.royalty) AS earnings
      FROM books b
      JOIN sales s ON b.id = s.book_id
      WHERE b.author_id = ?
    `;

    db.get(query, [authorId], (err, row) => {
      if (err) reject(err);
      resolve(row.earnings || 0);
    });

  });
}

module.exports = { getAuthorEarnings };
