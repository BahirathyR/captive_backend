// var captivepolicy = require('../models/notifyApprovemodels')

// // var hold = require('../models/hold')
// var bcSdk = require('../fabcar/query');
// exports.getusernotification = () => {
//     return new Promise(async (resolve, reject) => {
//         captivepolicy.find({})
//         bcSdk.getpolicy1({
//             // userId: userId
//             policyid:policyid

//         })

//             .then(result => {
//                 console.log("len", result)
//                 resolve({
//                     "status": 200,
//                     captivepolicydata: result
//                 })
//             })
//         console.log("arjun",result)


//     })
// }
'use strict';
var bcSdk = require('../fabcar/query');


exports.getusernotification = (startKey, endKey,decreasecount) => {

    return new Promise((resolve, reject) => {
        console.log("startKey---", startKey);
        console.log("endKey---", endKey);
        console.log("entering into readAllrequest function.......!",decreasecount)

        bcSdk
            .getpatientdetails({
                startKey: startKey,
                endKey: endKey,
                decreasecount:decreasecount
            })

            .then((requestarray) => {
                console.log("data in requestArray" + JSON.stringify(requestarray))
                console.log("key123...", requestarray)
                return resolve({
                    status: 200,
                    query: requestarray
                })
            })

            .catch(err => {

                if (err.code == 401) {

                    return reject({
                        status: 401,
                        message: 'cant fetch !'
                    });

                } else {
                    console.log("error occurred" + err);

                    return reject({
                        status: 500,
                        message: 'Internal Server Error !'
                    });
                }
            })
    })
};
