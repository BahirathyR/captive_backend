'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patientDataSchema = mongoose.Schema({
  NAME:String,
    AGE:Number,
     DOA:String,
   REF_DOC:String,
   IPD_No:Number,
     MLC:Number,
     SEX:String,
     DOD:String,
    DAIGONIS:String,
    Cheif_Complaints_On_Admission:String,
    Past_History_with_Allergy:String,
    Personal_History:String,
    Family_History:String,
    Menstrual_History:String,
    Obstretric_History:String,
    Genral_Examination:String,
    Systematic_Examination:String,
   Investigations:String,
   BaBys_Details:String,
   Course_in_Hospital_And_condition:String,
   Treatment_Given:String,
  Treatment_Adviced:String,
   Follow_Up_Visit:String,
  Procedure_done:String,
  policyId:String,
  claimAmount:Number,
    HospitalName:String,
    submitID:String,
    userId:String,
    status:String,
    created_at: String
    
});
mongoose.Promise = global.Promise;
<<<<<<< HEAD
mongoose.connect('mongodb://EHRTeam:EHRTeam1@ds139920.mlab.com:39920/ehr', { useMongoClient: true });
=======

mongoose.connect('mongodb://risabhsharma71:Rpqb123@ds111420.mlab.com:11420/care4u', { useMongoClient: true });


>>>>>>> c20a0b299b30e21d75daf1e174b20316b54a56d3
module.exports = mongoose.model('patientData', patientDataSchema);