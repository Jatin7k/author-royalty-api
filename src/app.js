const express = require('express');
const cors = require('cors');

const authorRoutes = require('./routes/authorRoutes');
const withdrawalRoutes = require('./routes/withdrawalRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/authors', authorRoutes);
app.use('/withdrawals', withdrawalRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Page not found" });
});

module.exports = app;
