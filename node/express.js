const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../')));

app.listen(8089, () => {
  console.log('Server is running on http://localhost:8089');
});
