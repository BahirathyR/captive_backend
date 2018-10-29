// var Tpa = require('../models/notify')

// exports.notification = () => {
//     return new Promise(async (resolve, reject) => {

//         Tpa.find({
            
            
//         }).then(result => {
            
//             console.log(result)
//             resolve({
//                 "status": 200,
//                 "patients": result
                
//             })
//              })

//     })
// }

'use strict';
var bcSdk = require('../fabcar/query');


exports.notification = (startKey, endKey) => {

    return new Promise((resolve, reject) => {
        console.log("startKey---", startKey);
        console.log("endKey---", endKey);
        console.log("entering into readAllrequest function.......!")

        bcSdk
            .getpatientdetails({
                startKey: startKey,
                endKey: endKey
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

