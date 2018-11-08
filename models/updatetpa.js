'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tpa1Schema = mongoose.Schema({
    patientData:String,
    submitID: String, 
    status:String,
    message: String,
    AmountPayerWouldPay:String,
    AmountuserHavetopay:String,
    // groupID:String,
    rating:Number
});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://EHRTeam:EHRTeam1@ds139920.mlab.com:39920/ehr', {
    useMongoClient: true
});
module.exports = mongoose.model('tpaupdatepage', tpa1Schema);