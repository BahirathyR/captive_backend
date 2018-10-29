'use strict';

const user = require('../models/createpolicymodels');
var bcSdk = require('../fabcar/invoke')

// const user = require('../models/fetchdata');

exports.captiveCreatePolicy = (policyid, policyName, policycatagory, rules, policypercentage, inputradio) => {
    return new Promise((resolve, reject) => {

        const newUser = new user({

            policyid: policyid,
            policyName: policyName,
            policycatagory: policycatagory,
            rules: rules,
            policypercentage: policypercentage,
            inputradio: inputradio,
        });
        // newUser
        //     .save()
        var data1 = {
            "TransactionDetails": {
                "userId": policyid,
                "transactionstring": newUser
            }
        }
        // data.save()
        bcSdk.savetransaction(data1).then((response) => {

            console.log(response)
            resolve({
                status: 201,
                 message: 'Contract details saved',
                 result:policyid
            })
        })

            // .then((result) => resolve({

            //     status: 201,
            //     message: 'Policy created Sucessfully !',
            //     result: result
            // }))

            // .then(() => bcSdk.createUser({
            //     user: users,
            //     UserDetails: newUser
            // }))

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