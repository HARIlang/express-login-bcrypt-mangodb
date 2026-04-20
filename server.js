const  express = require('express')
const app = express()
const port = 3000

app.use(express.json());

require('dotenv').config();

const dbConnection = require('./database/db.js');
const router = require('./router/userroute.js');


dbConnection();

app.use('/api/user',router)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))