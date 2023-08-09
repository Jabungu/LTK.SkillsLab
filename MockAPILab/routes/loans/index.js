const express = require('express');
const Loan = require('../../models/loan')

const router = new express.Router();

router.get('/', (req, res) => {
  res.json({
  message: "✨ 👋🌏 ✨",
  stage: process.env.NODE_ENV,
});
});

router.get("/ping", (req, res) => {
res.json({
  message: "🏓",
});
});


// get all loans
router.get("/loans", async (req, res) => {
  try {
    const loans = await Loan.find()
    res.json(loans)
  } catch (err) {
    res.status(400).json({ message: "Error fetchiing loans" })
  }
})


// get one loan based on loanId
router.get("/loans/:loanId", async (req, res) => {
  const loanId = parseInt(req.params.loanId)

  try {
    const loan = await Loan.findOne({ loanId: loanId })

    if (!loan) {
      res.status(404).json({ message: "Loan doesn't exist" })
    }
    res.json(loan)
  } catch (err) {
    res.status(400).json({ message: "Bad Request" })
  }
})


// add a new loan object
router.post("/loans", async (req, res) => {
  const newLoan = req.body

  try {
    const loan = await Loan.create(newLoan)
    res.status(201).json(loan)
  } catch (err) {
    res.status(400).json({ message: "Bad Request" })
  }
})


// update borrower info based on loanId and pairId
router.patch("/loans/:loanId/borrower/:pairId", async (req, res) => {
  const loanId = parseInt(req.params.loanId)
  const pairId = parseInt(req.params.pairId)
  const updatedBorrower = req.body

  try {
    const loan = await Loan.findOne({ loanId: loanId })

    if (!loan) {
      req.status(404).json({ message: "Cannot find loan" })
    }

    const borrower = await loan.borrowers.find((borrower) => borrower.pairId == pairId)

    if (!borrower) {
      res.status(404).json({ message: "Borrower doesn't exist" })
    }

    Object.assign(borrower, updatedBorrower)
    await loan.save()
    res.json(loan)
  } catch (err) {
    res.status(500).json({ message: "Error updating borrower" })
  }
})


// delete a borrower based on loanId and pairId
router.delete("/loans/:loanId/borrower/:pairId", async (req, res) => {
  const loanId = parseInt(req.params.loanId)
  const pairId = parseInt(req.params.pairId)

  try {
    const loan = await Loan.findOne({ loanId: loanId })

    if (!loan) {
      req.status(404).json({ message: "Loan does not exist" })
    }

    const borrowerIndx = await loan.borrowers.findIndex((borrower) => borrower.pairId == pairId)

    if (borrowerIndx === -1) {
      res.status(404).json({ message: "Borrower does not exist" })
    }

    loan.borrowers.splice(borrowerIndx, 1)
    await loan.save()
    res.json(loan)
  } catch (err) {
    res.status(500).json({ message: "Bad Request" })
  }
})


// delete loan based on loanId
router.delete("/loans/:loanId", async (req, res) => {
  const loanId = parseInt(req.params.loanId)

  try {
    const newResponse = await Loan.deleteOne({ loanId: loanId})

    if (newResponse.deletedCount === 0) {
      res.status(404).json({ message: "Loan doesn't exist" })
    }

    res.json({ message: "loan deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: "Bad Request" })
  }
})

module.exports = router;