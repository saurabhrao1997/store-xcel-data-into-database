const express = require("express");

const mongoose = require("mongoose");
const validator =require("validator");


const flightSchema =new mongoose.Schema({

    nameOfCanDidate :{
        type:String,
        required:true,
        

    },
    Email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
              throw new Error("Email is not valid")

            }
        }

    },
    MobileNumber:{
        type:String,
        required:true,

    },
    BirthDate:{
        type:String,
        required:true,

    },
    experience:{
        type:String,
        required:true,
    },




    Resume:{
        type:String,
        required:true,
    },
    currentLocation:{
        type:String,
        requirted:true,
    },
    postalAddress:{
        type:String,
        required:true,
    },
    currentEmployer:{
        type:String,

    },
    currentDesignation:{
        type:String,

    }

    

})



const ExcelData = new mongoose.model('ExcelData',flightSchema);








module.exports = ExcelData;