const mongoose = require('mongoose')

const borrowerSchema = new mongoose.Schema({
  pairId: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
})


const loanSchema = new mongoose.Schema({
  loanId: {
    type: Number,
    required: true,
  },
  borrowers: [borrowerSchema],
})

const Loan = mongoose.model("Loan", loanSchema)

module.exports = Loan