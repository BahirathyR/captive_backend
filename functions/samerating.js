'use strict';
var bcSdk = require('../fabcar/invoke.js');
const tpaupdate= require('../models/updatetpa')
exports.same=(patientData,submitID,groupID, AmountPayerWouldPay, AmountuserHavetopay, message, status)=>{
   // console.log("r",rating);
    return new Promise((resolve,reject)=>{
        var newupdate = new tpaupdate({
            "patientData":patientData,
            "submitID": submitID, 
            "status":status,
            "message": message,
            "AmountPayerWouldPay":AmountPayerWouldPay,
            "AmountuserHavetopay":AmountuserHavetopay,
            "groupID":groupID
           

        })
        var data3  = {TransactionDetails:{
                   
            "userId":submitID,
            "transactionstring":newupdate
           
            }}
     
console.log("data3===>",data3);
       // newupdate.save()
      //  .then(
            bcSdk.savetransaction(data3)
            .then(() => resolve({
                status: 201,
                message: 'Patient details saved'
            }))

            .catch(err =>{ 

                if (err.code == 11000) {

                    reject({
                        status: 409,
                        message: 'User Already Registered !'
                    });
    
                } else {
    
                    reject({
                        status: 500,
                        message: 'Internal Server Error !'
                    });
                }
 });

        })
    }