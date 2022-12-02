const request = require("request");
const TransactionObj = require('./transactionModel');

class Transactions {
  static async getSingleTransactions(Address) {
    let fbResponse;
    url = `https://api.etherscan.io/api?module=account&action=txlist&address=${Address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=R6UE3AH1MB9CQHTSBBZHA12B7H6ZF1NYX1`;
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        fbResponse = JSON.parse(body);
        console.log("Got a response: ", fbResponse);
      } else {
        console.log(
          "Got an error: ",
          error,
          ", status code: ",
          response.statusCode
        );
      }
    });
    const transaction = {};
    try {
      if (!Address) {
        logger.error("Did not receive user id");
        response.status = failure;
        response.statusCode = 400;
        response.message = "Did not receive user id";
        return response;
      } else {
        const transactionsObj = await fbResponse;
        if (transactionsObj) {
          transaction = transactionsObj;
          const user = await TransactionObj.findOne({ contractAddress: Address })
             if(!user){
                TransactionObj.create({contractAddress:transaction.result[0].contractAddress})
                logger.error('User Created');
                }
              else{
                logger.error('User already exist');
                response.status = failure;
                response.statusCode = 400;
                response.message = 'User already exist';
                return response;
              }  
             } 
             else {
               response.status = failure;
               response.statusCode = 400;
               response.message = "User not found";
              }
      }
    } catch (error) {
      logger.error(error.message);
      logger.error("Error while fetching user...");
      response.status = failure;
      response.statusCode = 400;
      response.message = "Error while fetching user";
    }
    return response;
  }


}

module.exports = Transactions;
