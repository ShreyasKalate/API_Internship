const express = require('express');
require('./database/connect'); // Ensure this path is correct
const bookRouter = require('./routes/router');

const app = express();
const port = 1001; // Directly specify the port number

app.use(express.json());
app.use(bookRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
