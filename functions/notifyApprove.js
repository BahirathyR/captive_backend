// 'use strict';

// const user = require('../models/notifyApprovemodels');
// // const user = require('../models/fetchdata');
// var bcSdk = require('../fabcar/invoke')

// exports.notifyApprove = (policyid, policyName, policycatagory, policypercentage, rules, inputradio, status, count1) => {
//    return new Promise((resolve, reject) => {

//        const newUser = new user({

//            policyid: policyid,
//            policyName: policyName,
//            policycatagory: policycatagory,
//            policypercentage: policypercentage,
//            rules: rules,
//            inputradio: inputradio,
//            status: status,
//            count1: count1

//        });
//        newUser
//            .save()
//        var ldata = {
//            TransactionDetails: {

//                "userId": policyid,
//                "transactionstring": newUser

//            }
//        }
//        bcSdk.savetransaction(ldata)
//            .then((result) => resolve({
//                status: 201,
//                message: 'Policy approved successfully!',
//                result: result
//            }))
//            // .then(() => resolve({
//            //     status: 201,
//            //     message: 'Policy approved successfully!'
//            // }))

//            // .then(() => bcSdk.createUser({
//            //     user: users,
//            //     UserDetails: newUser
//            // }))

//            .catch(err => {

//                if (err.code == 11000) {

//                    reject({
//                        status: 409,
//                        message: 'User Already Approved !'
//                    });

//                } else {

//                    reject({
//                        status: 500,
//                        message: 'Internal Server Error !'
//                    });
//                }
//            });

//    });
// }

'use strict';

// const user = require('../models/notify');
const user = require('../models/notifySelectPolicy');
var bcSdk = require('../fabcar/invoke');
// const user = require('../models/fetchdata');

exports.notifyApprove = (policyid, policyName, policycatagory, policypercentage, rules, inputradio, status, count1) => {
   return new Promise((resolve, reject) => {

       const newUser = new user({

           policyid: policyid,
           policyName: policyName,
           policycatagory: policycatagory,
           policypercentage: policypercentage,
           rules: rules,
           inputradio: inputradio,
           status: status,
           count1: count1
       });
       var ldata = {
           TransactionDetails: {

               "userId": policyid,
               "transactionstring": newUser

           }
       }
       newUser
           .save()

       // .then((result) => resolve({
       //     status: 201,
       //     message: 'Your Request has been recieved,Waiting for Admin Approval!',
       //     result: result
       // }))

       bcSdk.savetransaction(ldata)
           .then((result) => resolve({
               status: 201,
               message: 'Approved Successfully!',
               result: result
           }))
           .catch(err => {

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

   });
}