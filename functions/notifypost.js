'use strict';

// const user = require('../models/notify');
//const user = require('../models/notifySelectPolicy');
var bcSdk = require('../fabcar/invoke');
// const user = require('../models/fetchdata');

exports.notifypost = (policyid, policyName, policycatagory, policypercentage, rules, inputradio, registername, status, count) => {
    return new Promise((resolve, reject) => {

        const newUser = ({
            policyid: policyid,
            policyName: policyName,
            policycatagory: policycatagory,
            policypercentage: policypercentage,
            rules: rules,
            inputradio: inputradio,
            registername: registername,
            status: status,
            count: count
        });
        var ldata = {
            TransactionDetails: {

                "userId": policyid,
                "transactionstring": newUser

            }
        }
        // newUser
        //     .save()

        // .then((result) => resolve({
        //     status: 201,
        //     message: 'Your Request has been recieved,Waiting for Admin Approval!',
        //     result: result
        // }))

        bcSdk.savetransaction(ldata)
        resolve({
            status: 201,
            message: 'Your Request has been recieved,Waiting for Admin Approval!',
            result: newUser
        })
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