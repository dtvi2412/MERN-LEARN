const express = require('express');
const app = express();
const PORT = process.env.PORT ||  4000;
const db = require('./config/index');
const homeRouter = require('./routers/index.js');
const cors = require('cors');
//Connect DB
db.connect();

app.use(express.json());
app.use(cors());

app.get('/',(req, res) => {
    res.send('Start server!')
})

app.use('/api', homeRouter);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})


