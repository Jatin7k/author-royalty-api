const db = require('../db/db');
const { getAuthorEarnings } = require('../utils/earningsCalculator');

function createWithdrawal(authorId, amount) {

  return new Promise((resolve, reject) => {

    if (amount < 500)
      return reject({ status: 400, message: "Minimum withdrawal is ₹500" });

    getAuthorEarnings(authorId).then((earnings) => {

      db.get(`SELECT SUM(amount) withdrawn FROM withdrawals WHERE author_id=?`,
        [authorId], (err, wRow) => {

          const withdrawn = wRow?.withdrawn || 0;
          const balance = earnings - withdrawn;

          if (amount > balance)
            return reject({ status: 400, message: "Insufficient balance" });

          db.run(`INSERT INTO withdrawals(author_id,amount,status,created_at)
VALUES(?,?,?,datetime('now','localtime'))`,

            [authorId, amount, 'pending'],
            function () {

              resolve({
                id: this.lastID,
                new_balance: balance - amount
              });

            });

        });

    });

  });

}

module.exports = { createWithdrawal };
