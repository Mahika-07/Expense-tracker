const express = require("express");
const { addTransaction, getAllTransaction } = require("../controllers/transactionControllers");



//router object
const router = express.Router();

//routers
//add Transaction Post method
router.post('/add-transaction',addTransaction);

//get Transactions
router.get('/get-transaction',getAllTransaction);
module.exports = router;
