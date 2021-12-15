const fallback = require('express-history-api-fallback');
const express = require('express');
const path = require('path');

const app = express();

// config stuff
const publicDir = path.join(__dirname, 'dist');
const port = process.env.SERVER_PORT || 8080;

// fallback to index.html
app.use(express.static(publicDir));
app.use(fallback(path.join(publicDir, 'index.html')));


app.listen(port, () => {
    console.log(`Listening on ${port}`)
});
