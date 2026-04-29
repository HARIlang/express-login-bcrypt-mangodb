const  express = require('express')   
const app = express()
const port = 5000
const cors = require('cors');
app.use(cors())
app.use(express.json()); // 

app.use(express.urlencoded({extended:true}));     // to send form data for , used for test apis in backend
require('dotenv').config();  //

const dbConnection = require('./database/db.js');
const router = require('./router/userroute.js');

const {globalLimiter} =  require('./middlewares/rateLimiter.js');


dbConnection();

app.use('/api/user',globalLimiter,router);



app.listen(port, () => console.log(`Example app listening on port ${port}!`));