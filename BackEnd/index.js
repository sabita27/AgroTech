var express = require("express")
var bodyParser = require("body-parser")
var mongoose =  require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/agrodb')
var db=mongoose.connection
db.on('error',()=>console.log("Error in connecting to Database"))
db.once('open',()=>console.log("connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name=req.body.name
    var email=req.body.email
    var phone=req.body.Phone
    var alt_Phone=req.body.alt_Phone
    var address=req.body.address
    var landmark=req.body.landmark
    var city=req.body.city
    var state=req.body.state
    var zip=req.body.zip

    var data={
        "name":name,
        "email":email,
        "phone":phone,
        "alt_Phone":alt_Phone,
        "address":address,
        "landmark":landmark,
        "city":city,
        "state":state,
        "zip":zip
    }
    db.collection('payment').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")
    })
    return res.redirect('signup_success.html')
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
 }).listen(3000);

 console.log("Listening on Port 3000")