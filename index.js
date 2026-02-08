const app = require('./src/app');
const seedDatabase = require('./src/data/seed');
seedDatabase();


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});