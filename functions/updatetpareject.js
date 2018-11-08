'use strict';
var bcSdk = require('../fabcar/invoke.js');
// const tpaupdate= require('../models/updatpaaprovemodel')
exports.updatetpareject=(policyid, policyName, policycatagory, policypercentage, rules,inputradio, status, count1,registername)=>{

    return new Promise((resolve,reject)=>{
        var newupdate ={
            policyid:policyid,
            policyName: policyName, 
            policycatagory:policycatagory,
            policypercentage: policypercentage,
            rules:rules,
            inputradio:inputradio,
            status:status,
            count1:count1,
            registername:registername
        }
        var data3  = {updatedetails:{
                   
            "userId":policyid,
            "transactionstring":newupdate
           
            }}
     
console.log("data3===>",data3);
        // newupdate.save()
      
            bcSdk.updatetransaction(data3)
           resolve({
                status: 201,
                message: 'Patient details saved'
            
            })

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
