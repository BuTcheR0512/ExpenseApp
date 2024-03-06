const express = require("express");
const {
  addtransaction,
  getAlltransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionCtrl");

//router object
const router = express.Router();

//routes
//add transaction POST MEthod
router.post("/add-transaction", addtransaction);

router.post("/edit-transaction", editTransaction);

router.post("/delete-transaction", deleteTransaction);

//get transactions
router.post("/get-transaction", getAlltransaction);

module.exports = router;
