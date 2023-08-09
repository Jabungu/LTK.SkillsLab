const express = require('express');
require('./db/mongoose')
const loanRouter = require('./routes/loans/index')

const app = express();

app.use(express.json())
app.use(loanRouter)


module.exports = app