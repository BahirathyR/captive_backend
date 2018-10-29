'use strict';
/*
 * Copyright IBM Corp All Rights Reserved
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/*
 * Hyperledger Fabric Sample Query Program
 */
var hfc = require('fabric-client');
var path = require('path');
var options = {
    wallet_path: path.join(__dirname, './creds'),
    user_id: 'PeerAdmin',
    channel_id: 'mychannel',
    chaincode_id: 'Kare4u_20',
    network_url: 'grpc://localhost:7051'
};
var channel = {};
var client = null;
function readIndex() {
    
    return Promise.resolve().then(() => {
        console.log("Create a client and set the wallet location");
        client = new hfc();
        return hfc.newDefaultKeyValueStore({
            path: options.wallet_path
        });
    }).then((wallet) => {
        console.log("Set wallet path, and associate user ", options.user_id, " with application");
        client.setStateStore(wallet);
        return client.getUserContext(options.user_id, true);
    }).then((user) => {
        console.log("Check user is enrolled, and set a query URL in the network");
        if (user === undefined || user.isEnrolled() === false) {
            console.error("User not defined, or not enrolled - error");
        }
        channel = client.newChannel(options.channel_id);
        channel.addPeer(client.newPeer(options.network_url));
        return;
    }).then(() => {
        console.log("Make query");
        var transaction_id = client.newTransactionID();
        console.log("Assigning transaction_id: ", transaction_id._transaction_id);
        // queryCar - requires 1 argument, ex: args: ['CAR4'],
        // queryAllCars - requires no arguments , ex: args: [''],
        const request = {
            chaincodeId: options.chaincode_id,
            txId: transaction_id,
            fcn: 'readIndex',
            args: ['']
        };
        return channel.queryByChaincode(request);
    }).then((query_responses) => {
        console.log("returned from query");
        if (!query_responses.length) {
            console.log("No payloads were returned from query");
        } else {
            console.log("Query result count = ", query_responses.length)
        }
        if (query_responses[0] instanceof Error) {
            console.error("error from query = ", query_responses[0]);
        }
        console.log("lol" + query_responses[0].toString());
        var array = JSON.parse(query_responses[0].toString());
        return array
    }).catch((err) => {
        console.error("Caught Error", err);
    });
}
function getparticulardetails(params) {
    console.log(params, 'data in params for query method')
    return Promise.resolve().then(() => {
            console.log("Create a client and set the wallet location");
            client = new hfc();
            return hfc.newDefaultKeyValueStore({
                path: options.wallet_path
            });
        }).then((wallet) => {
            console.log("Set wallet path, and associate user ", options.user_id, " with application");
            client.setStateStore(wallet);
            return client.getUserContext(options.user_id, true);
        }).then((user) => {
            console.log("Check user is enrolled, and set a query URL in the network");
            if (user === undefined || user.isEnrolled() === false) {
                console.error("User not defined, or not enrolled - error");
            }
            channel = client.newChannel(options.channel_id);
            channel.addPeer(client.newPeer(options.network_url));
            return;
        }).then(() => {
            console.log("Make query");
            var requestid = params.requestid;
            console.log("request >-------->" + requestid);
            var transaction_id = client.newTransactionID();
            console.log("Assigning transaction_id: ", transaction_id._transaction_id);
           // queryCar - requires 1 argument, ex: args: ['CAR4'],
            // queryAllCars - requires no arguments , ex: args: [''],
            const request = {
                chaincodeId: options.chaincode_id,
                txId: transaction_id,
                fcn: 'readRequest',
                args: [requestid]
            };
            return channel.queryByChaincode(request);
        }).then((query_responses) => {
            console.log("returned from query");
            if (!query_responses.length) {
                console.log("No payloads were returned from query");
            } else {
                console.log("Query result count = ", query_responses.length)
            }
            if (query_responses[0] instanceof Error) {
                console.error("error from query = ", query_responses[0]);
            }
            console.log("lol:" + query_responses[0].toString());
            return JSON.parse(query_responses[0].toString());
            
       }).catch((err) => {
            console.error("Caught Error", err);
        });
}
function getpatientdetails(params) {
    console.log(params, 'data in params for query method')
    return Promise.resolve().then(() => {
            console.log("Create a client and set the wallet location");
            client = new hfc();
            return hfc.newDefaultKeyValueStore({
                path: options.wallet_path
            });
        }).then((wallet) => {
            console.log("Set wallet path, and associate user ", options.user_id, " with application");
            client.setStateStore(wallet);
            return client.getUserContext(options.user_id, true);
        }).then((user) => {
            console.log("Check user is enrolled, and set a query URL in the network");
            if (user === undefined || user.isEnrolled() === false) {
                console.error("User not defined, or not enrolled - error");
            }
            channel = client.newChannel(options.channel_id);
            channel.addPeer(client.newPeer(options.network_url));
            return;
        }).then(() => {
            console.log("Make query");
            var startKey = params.startKey
            console.log("request >-------->" + startKey);
            var endKey = params.endKey;
            console.log("request >-------->" + endKey);
           var transaction_id = client.newTransactionID();
            console.log("Assigning transaction_id: ", transaction_id._transaction_id);
            // queryCar - requires 1 argument, ex: args: ['CAR4'],
            // queryAllCars - requires no arguments , ex: args: [''],
            const request = {
                chaincodeId: options.chaincode_id,
                txId: transaction_id,
                fcn: 'readAllRequest',
                args: [startKey,endKey]
            };
            return channel.queryByChaincode(request);
        }) .then((query_responses) => {
                console.log("returned from query");
                if (!query_responses.length) {
                    console.log("No payloads were returned from query");
                } else {
                    console.log("Query result count = ", query_responses.length)
                }
                if (query_responses[0] instanceof Error) {
                    console.error("error from query = ", query_responses[0]);
                }
                console.log("Response is ", query_responses[0].toString());
              //  console.log("parsed data",JSON.parse(query_responses[0].toString()))
                return (JSON.parse(query_responses[0].toString()));
            })
            .catch((err) => {
                console.error("Caught Error", err);
            });
    } 
function getHistory(params) {
        return Promise.resolve().then(() => {
            console.log("Create a client and set the wallet location");
            client = new hfc();
            return hfc.newDefaultKeyValueStore({ path: options.wallet_path });
        }).then((wallet) => {
            console.log("Set wallet path, and associate user ", options.user_id, " with application");
            client.setStateStore(wallet);
            return client.getUserContext(options.user_id, true);
        }).then((user) => {
            console.log("Check user is enrolled, and set a query URL in the network");
            if (user === undefined || user.isEnrolled() === false) {
                console.error("User not defined, or not enrolled - error");
            }
            channel = client.newChannel(options.channel_id);
            channel.addPeer(client.newPeer(options.network_url));
            return;
        }).then(() => {
            var userId = params.userId;
            console.log("myindex"+userId);
            console.log("Make query");
            var transaction_id = client.newTransactionID();
            console.log("Assigning transaction_id: ", transaction_id._transaction_id);
    
           // queryCar - requires 1 argument, ex: args: ['CAR4'],
            // queryAllCars - requires no arguments , ex: args: [''],
            const request = {
                chaincodeId: options.chaincode_id,
                txId: transaction_id,
                fcn: "getHistory",    
               args: [userId]
            };
            return channel.queryByChaincode(request);
        }).then((query_responses) => {
            console.log("returned from query",query_responses);
            if (!query_responses.length) {
                console.log("No payloads were returned from query");
            } else {
                console.log("Query result count = ", query_responses.length)
            }
            if (query_responses[0] instanceof Error) {
                console.error("error from query = ", query_responses[0]);
            }
            console.log("Response is ", query_responses[0].toString());
            return (JSON.parse(query_responses[0].toString()));
            // var history = query_responses[0].toString();
            // console.log("readIndex", history);
            // return history;
        }).catch((err) => {
            console.error("Caught Error", err);
        });
    }
    function valiDate(params) {
        return Promise.resolve().then(() => {
            console.log("Create a client and set the wallet location");
            client = new hfc();
            return hfc.newDefaultKeyValueStore({ path: options.wallet_path });
        }).then((wallet) => {
            console.log("Set wallet path, and associate user ", options.user_id, " with application");
            client.setStateStore(wallet);
            return client.getUserContext(options.user_id, true);
        }).then((user) => {
            console.log("Check user is enrolled, and set a query URL in the network");
            if (user === undefined || user.isEnrolled() === false) {
                console.error("User not defined, or not enrolled - error");
            }
            channel = client.newChannel(options.channel_id);
            channel.addPeer(client.newPeer(options.network_url));
            return;
        }).then(() => {
            var userId = params.userId;
            console.log("myindex"+userId);
            console.log("Make query");
            var transaction_id = client.newTransactionID();
            console.log("Assigning transaction_id: ", transaction_id._transaction_id);
    
           // queryCar - requires 1 argument, ex: args: ['CAR4'],
            // queryAllCars - requires no arguments , ex: args: [''],
            const request = {
                chaincodeId: options.chaincode_id,
                txId: transaction_id,
                fcn: "valiDate",    
               args: [userId]
            };
            return channel.queryByChaincode(request);
        }).then((query_responses) => {
            console.log("returned from query",query_responses);
            if (!query_responses.length) {
                console.log("No payloads were returned from query");
            } else {
                console.log("Query result count = ", query_responses.length)
            }
            if (query_responses[0] instanceof Error) {
                console.error("error from query = ", query_responses[0]);
            }
            console.log("Response is ", query_responses[0].toString());
            return (JSON.parse(query_responses[0].toString()));
            // var history = query_responses[0].toString();
            // console.log("readIndex", history);
            // return history;
        }).catch((err) => {
            console.error("Caught Error", err);
        });
    }
function getpolicy1(params) {
        return Promise.resolve().then(() => {
            console.log("Create a client and set the wallet location");
            client = new hfc();
            return hfc.newDefaultKeyValueStore({ path: options.wallet_path });
        }).then((wallet) => {
            console.log("Set wallet path, and associate user ", options.user_id, " with application");
            client.setStateStore(wallet);
            return client.getUserContext(options.user_id, true);
        }).then((user) => {
            console.log("Check user is enrolled, and set a query URL in the network");
            if (user === undefined || user.isEnrolled() === false) {
                console.error("User not defined, or not enrolled - error");
            }
            channel = client.newChannel(options.channel_id);
            channel.addPeer(client.newPeer(options.network_url));
            return;
        }).then(() => {
            var userId = params.userId;
            console.log("myindex"+userId);
            console.log("Make query");
            var transaction_id = client.newTransactionID();
            console.log("Assigning transaction_id: ", transaction_id._transaction_id);
    
           // queryCar - requires 1 argument, ex: args: ['CAR4'],
            // queryAllCars - requires no arguments , ex: args: [''],
            const request = {
                chaincodeId: options.chaincode_id,
                txId: transaction_id,
                fcn: "getHistory",    
               args: [userId]
            };
            return channel.queryByChaincode(request);
        }).then((query_responses) => {
            console.log("returned from query",query_responses);
            if (!query_responses.length) {
                console.log("No payloads were returned from query");
            } else {
                console.log("Query result count = ", query_responses.length)
            }
            if (query_responses[0] instanceof Error) {
                console.error("error from query = ", query_responses[0]);
            }
            console.log("Response is ", query_responses[0].toString());
            return (JSON.parse(query_responses[0].toString()));
            // var history = query_responses[0].toString();
            // console.log("readIndex", history);
            // return history;
        }).catch((err) => {
            console.error("Caught Error", err);
        });
    
        } 

module.exports = {
    readIndex:readIndex,
    getparticulardetails: getparticulardetails,
    getpatientdetails:getpatientdetails,
    getHistory:getHistory,
    valiDate:valiDate,
    getpolicy1:getpolicy1
};