const express = require('express')
const cors = require('cors')

const app = express();
const bodyParser = require('body-parser')
const Transaction = require('./db/models/transaction');
const { addTransaction, transactionList } = require('./controller/transactionController');

// app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
require('./db/database')

app.post('/add-transaction',addTransaction)
app.get('/transaction-list',transactionList)



app.listen(3000,()=>{
    console.log("listening on 3000")
})