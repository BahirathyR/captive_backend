// 'use strict';
// var bcSdk = require('../fabcar/invoke.js');
// //const tpaupdate= require('../models/updatetpa')
// exports.updatetpa=(status,policyid, policyName, policycatagory, policypercentage, rules, inputradio,  count1)=>{

//     return new Promise((resolve,reject)=>{
//         var newupdate =({
//             "status":status,
//             "policyid": policyid, 
//             "policyName":policyName,
//             "policycatagory":policycatagory,
//             "policypercentage":policypercentage,
//             "rules":rules,
//             "inputradio":inputradio,
           
//             "count1":count1
//             // "AmountPayerWouldPay":AmountPayerWouldPay,
//             // "AmountuserHavetopay":AmountuserHavetopay

//         })
//         console.log("test",newupdate)
//         var data3  = {TransactionDetails:{
                   
            
//             "userId":policyid,
//             "transactionstring":newupdate
           
//             }}
     
// console.log("data3===>",data3);
//        // newupdate.save()
//         // .then(
//             bcSdk.savetransaction(data3)
//            resolve({
               
//                 status: 201,
//                 message: 'Patient details saved',
                
//                 //result:result
//             })
       
        
//             .catch(err =>{ 

//                 if (err.code == 11000) {

//                     reject({
//                         status: 409,
//                         message: 'User Already Registered !'
//                     });
    
//                 } else {
    
//                     reject({
//                         status: 500,
//                         message: 'Internal Server Error !'
//                     });
//                 }
//  });

//         })
//     }
'use strict';
var bcSdk = require('../fabcar/invoke.js');
const tpaupdate= require('../models/updatetpa')
exports.updatetpa=(patientData,submitID,groupID, AmountPayerWouldPay, AmountuserHavetopay, message, status,rating)=>{

    return new Promise((resolve,reject)=>{
        var newupdate = new tpaupdate({
            "patientData":patientData,
            "submitID": submitID, 
            "status":status,
            "message": message,
            "AmountPayerWouldPay":AmountPayerWouldPay,
            "AmountuserHavetopay":AmountuserHavetopay,
            "groupID":groupID,
            "rating":rating
        })
        var data3  = {updatedetails:{
                   
            "userId":submitID,
            "transactionstring":newupdate
           
            }}
     
console.log("data3===>",data3);
        newupdate.save()
        .then(
            bcSdk.updatetransaction(data3))
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
