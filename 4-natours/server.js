/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');
// console.log(app.get('env'));
// console.log(process.env);
const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB)
  .then(() => console.log('Database connected successfully!'));

const port = 3000;
app.listen(port, () => {
  console.log(`App Listening at port ${port}...`);
});
