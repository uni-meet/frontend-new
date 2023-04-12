import dotenv from 'dotenv';
const express = require('express');
const app = express();
const port = process.env.LOCAL_HOST || 3000;
dotenv.config();
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
