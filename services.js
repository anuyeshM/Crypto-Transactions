const request = require("request");
const TransactionObj = require('./transactionModel');
const EtherPriceModelObj = require('./EtherPriceModel');

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
        console.log("Did not receive user id");
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
                console.log('User Created');
                }
              else{
                console.log('User already exist');
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
      console.log(error.message);
      console.log("Error while fetching user...");
      response.status = failure;
      response.statusCode = 400;
      response.message = "Error while fetching user";
    }
    return response;
  }

  static async getEtherumPrices() {

    async function callApi() {
      let response = await axios( { url: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr " });
      console.log("Response:", response.ethereum.inr);
      RealTimePrice = response.ethereum.inr
      if(!RealTimePrice){
        console.log("No RealTimePrice data is there");
      }
      else{
        EtherPriceModelObj.create({contractAddress:transaction.result[0].contractAddress})
      }
  } 
  
    let i = 0;
    let idInterval = setInterval(() => {
      if (i < dataFortheAPI.length) {
        callApi(dataFortheAPI[i]);
        i++;
      } else {
        clearInterval(idInterval);
      }
    }, 22000);
  }


}

module.exports = Transactions;
