const router = require('express').Router();
const controller = require('../controllers/authorController');

router.get('/', controller.getAuthors);
router.get('/:id', controller.getAuthorById);
router.get('/:id/sales', controller.getSales);
router.get('/:id/withdrawals', controller.getWithdrawals);

module.exports = router;
