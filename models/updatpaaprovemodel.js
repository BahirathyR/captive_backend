'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tpa1Schema = mongoose.Schema({
            policyid: String,
             policyName: String,
            policycatagory:String,
             policypercentage:Number,
            rules:String,
            inputradio:String,
            status:String,
            count1:Number
});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://EHRTeam:EHRTeam1@ds139920.mlab.com:39920/ehr', {
    useMongoClient: true
});
module.exports = mongoose.model('updatetpaapprove', tpa1Schema);