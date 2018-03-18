const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8080;

app.listen(port, () => {
  console.info(`Server started on ${port}`);
  console.info(`Open http://localhost:${port}/`);
});

module.exports = app;
