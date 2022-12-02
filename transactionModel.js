const mongoose = require('mongoose');

const transactionModel = mongoose.Schema({
    contractAddress: String 
});

// export model Tenders with TendersSchema
module.exports = mongoose.model('TendeDownloadUserData', transactionModel , 'TendeDownloadUserData');