require('dotenv/config');
const express = require('express');
const path = require('node:path');
const indexRouter = require('./routes/indexRouter');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started`);
  console.log(`\x1b[35mhttp://localhost:${PORT}/\x1b[0m`);
});
