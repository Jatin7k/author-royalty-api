const service = require('../services/authorService');

exports.getAuthors = async (req, res) => {
  const data = await service.getAuthors();
  res.json(data);
};

exports.getAuthorById = async (req, res) => {

  const author = await service.getAuthorDetail(req.params.id);

  if (!author)
    return res.status(404).json({ error: "Author not found" });

  res.json(author);
};

exports.getSales = async (req, res) => {
  const data = await service.getAuthorSales(req.params.id);
  res.json(data);
};

exports.getWithdrawals = async (req, res) => {
  const data = await service.getAuthorWithdrawals(req.params.id);
  res.json(data);
};
