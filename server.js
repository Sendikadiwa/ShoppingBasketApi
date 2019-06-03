const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.send('Testing hello');
});

// listen to port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server set up on port ${port}`);
});
