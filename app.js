const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https=require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+'/signup.html');
})

app.post("/",function(req,res){
    const firstname= req.body.firstname;
    const lastname= req.body.lastname;
    const email= req.body.email;

    const data = {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstname,
                LNAME: lastname
            }
        }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us11.api.mailchimp.com/3.0/lists/108feb7fc6"
    const options = {
        method: "POST",
        auth: "lazimrayan:2bfcff7974acc0794b85c76903811e73-us11"
    };
    

    const request = https.request(url, options, function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})


app.listen(3000, function(){
    console.log("Server is running on port 3000");
})

//Mailchimp API
//API Key: 2bfcff7974acc0794b85c76903811e73-us11
//Audience ID: 108feb7fc6
