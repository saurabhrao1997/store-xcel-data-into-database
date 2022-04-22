const express = require("express");

const mongoose = require("mongoose");


//app.use(express.urlencoded());


const flightSchema =new mongoose.Schema({

    flightNo :{
        type:Number,
        required:true,
        unique:[true,"these number is allready there"]

    },
    locationFrom:{
        type:String,
        required:true,

    },
    locationTo:{
        type:String,
        required:true,

    },
    flewTime:{
        type:String,
        required:true,

    },
    landingTime:{
        type:String,
        required:true,
    },
    companyName:{
        type:String,
        requirted:true,
    },
    planeCategary:{
        type:String,
        required:true,
    },
    price:{
        type:String,

    }

    

})

// flightSchema.pre("save" ,async function(next){
//      console.log(`input tag data : ${this.locationFrom1}`)
//      console.log(`input tag data : ${this.locationTo1}`)
//      console.log(`input tag data : ${this.departureCalender}`)
//      console.log(`input tag data : ${this.returnCalender}`)
//      next();
// })

const FlightData = new mongoose.model('FlightData',flightSchema);




const createDocument = async ()=>{
    try{

        const result = await FlightData.insertMany([{
            flightNo:"01",
            locationFrom:"pune",
            locationTo:"bangloru",
            flewTime:"10:00 AM",
            landingTime:"11:35 AM",
            companyName:"indiGO",
            planeCategary:"passenger"
        },
        {
            flightNo:"02",
            locationFrom:"pune",
            locationTo:"bangloru",
            flewTime:"10:00 AM",
            landingTime:"11:35 AM",
            companyName:"go First",
            planeCategary:"passenger"
        },
        {
            flightNo:"04",
            locationFrom:"pune",
            locationTo:"bangloru",
            flewTime:"10:00 AM",
            landingTime:"11:35 AM",
            companyName:"Air Asia",
            planeCategary:"passenger"
        },
        {
            flightNo:"05",
            locationFrom:"pune",
            locationTo:"bangloru",
            flewTime:"10:00 AM",
            landingTime:"11:35 AM",
            companyName:"spice jet",
            planeCategary:"passenger"
        }])


        console.log(result)
    }catch(er){
         console.log(er)
    }
}



//createDocument();

// const getDocument =async function(){
// const result = await FlightData.find();
//  console.log(result[0].companyName)




// }
// getDocument()

module.exports = FlightData;