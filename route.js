const express = require("express");
const router = express.Router();
const Transactions =require("./services")
const TRANSACTION = {
   getTransactions: "/getTransactions /:userId"
};

router.get(TRANSACTION.getTransactions, async (req, res, next) => {
  logger.info(`${TRANSACTION.getTransactions}------------`);
  const userId = req.params.userId;
  if (req) {
    logger.info("get user------------");
    response = await Transactions.getSingleTransactions(userId);
  } else {
    response = tokenResponse;
  }
  res.send(response);
});

module.exports = router;
