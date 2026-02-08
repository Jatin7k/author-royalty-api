const service = require('../services/withdrawalService');

exports.createWithdrawal = async (req, res) => {

  try {
    const result = await service.createWithdrawal(
      req.body.author_id,
      req.body.amount
    );

    res.status(201).json(result);

  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }

};
