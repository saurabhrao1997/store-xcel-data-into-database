const express = require("express");
const path =require("path");
const hbs =require("hbs");
const requests =require("requests");
const data =require("./API")
const excelData =require("./models/flightAPI");
const xlsxFile = require('read-excel-file/node');
const  bodyParser = require("body-parser");
const reader = require('xlsx')
  
const fs =require("fs");
var csv = require('csvtojson'); 
const multer = require("multer");
var storage = multer.diskStorage({  
  destination:(req,file,cb)=>{  
  cb(null,'./public/uploads');  
  },  
  filename:(req,file,cb)=>{  
  cb(null,file.originalname);  
  }  
  });  
  var upload = multer({storage:storage});  

require("./db/conn");
const FlightData = require("./models/flightAPI");
const async = require("hbs/lib/async");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
console.log(path.join(__dirname,"../public"))
app.use(express.static(path.join(__dirname,"../public/")));
const templatePath =path.join(__dirname,"../templates/views");
const partialPath =path.join(__dirname,"../templates/partials")
app.set("view engine","hbs");
app.set("views",templatePath)
hbs.registerPartials(partialPath)

app.get("/",(req,res)=>{
  res.render("index")
})

app.post("/",upload.single("csv"),(req,res)=>{

  
// csv()  
// .fromFile(req.file.path)  
// .then((jsonObj)=>{  

  

  const file = reader.readFile(req.file.path)
  
let data = []
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp =  reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      data.push(res)
   })
}
  

//console.log(data)



 //const result =[...data.reduce((map,current)=>{ map.set(current.Email,current)}),new Map().values()] 


 const emails = data.map(o => o.Email)
 const filtered =  data.filter(({Email}, index) => !emails.includes(Email, index + 1))

 ///res.send(filtered);
 
 filtered.map(async(val)=>{

  
    
    
  await excelData.insertMany([{

    nameOfCanDidate:val["Name of the Candidate"],
              Email:val["Email"],
              MobileNumber:val["Mobile No."],
              BirthDate:val["Date of Birth"],
              experience:val["Work Experience"],
              Resume: val["Resume Title"] ,
              currentLocation:val["Current Location"] ,
              postalAddress: val["Postal Address"] ,
              currentEmployer:val["Current Employer"] ,
              currentDesignation:val["Current Designation"] ,

   }])


 })




res.send("<h1>file is succssefully send<h1>")
    

// })
})






app.get("*",(req,res)=>{
    res.render("404",{
        errorPage :"opps page is not available"
    });
    

})

app.listen(4000,()=>{
    console.log("we are woking on port no 4000");
})