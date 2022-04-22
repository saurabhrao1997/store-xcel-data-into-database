const express = require("express");
const path =require("path");
const hbs =require("hbs");
const requests =require("requests");
const data =require("./API")
const  bodyParser = require("body-parser");
const fs =require("fs");

require("./db/conn");
const FlightData = require("./models/flightAPI")
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
console.log(path.join(__dirname,"../public"))
app.use(express.static(path.join(__dirname,"../public")));
const templatePath =path.join(__dirname,"../templates/views");
const partialPath =path.join(__dirname,"../templates/partials")
app.set("view engine","hbs");
app.set("views",templatePath)
hbs.registerPartials(partialPath)

app.get("/",(req,res)=>{
    res.render("index");

    console.log(req.body)

})
app.get("/about", (req,res) =>{
res.render("about")

//res.send("helo about page   ")

}) 



app.post("/flight",async(req,res)=>{
 
 
 const result = await FlightData.find();
  
 //console.log(result)
  let a =req.body.locationFrom1;
  let b =req.body.locationTo1;
  let c =req.body.departureCalender;     
  let d =req.body.returnCalender;


 for (let i= 0 ; i< result.length; i++){
    if(result[1].locationFrom == a && result[1].locationTo == b){
      
    
    
      
         res.render("flight",{
           company: result[1].companyName,
           fristLocation:result[1].locationFrom,
           secondLocation:result[1].locationTo,
           departure:c,
           return1:d,
           flew :result[1].flewTime,
           landing:result[1].landingTime,
           price:result[1].price,
         })

         
    





    }else{
      console.log("data dont match")
    }
 


  }











    
  })
  

app.get("*",(req,res)=>{
    res.render("404",{
        errorPage :"opps page is not available"
    });
    

})

app.listen(4000,()=>{
    console.log("we are woking on port no 4000");
})