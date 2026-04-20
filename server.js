const  express = require('express')
const app = express()
const port = 3000

require('dotenv').config();

const dbConnection = require('./database/db.js');

dbConnection()




app.listen(port, () => console.log(`Example app listening on port ${port}!`))