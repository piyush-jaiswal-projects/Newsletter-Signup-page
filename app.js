const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+ "/signup.html");
});

app.post("/", function(req, res){

  const name = req.body.name;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/3b767fa1e0";
  const options = {
    method: "POST",
    auth: "piyushJ:7fd23a25a8946391d0d357fff387a8ee-us1"
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));

      if(response.statusCode === 200){
       res.sendFile(__dirname + "/success.html");
      }
      else{
        res.sendFile(__dirname + "/failure.html");
      }
    })

  });

  request.write(jsonData);
  request.end();

  console.log(name, email);

});

app.post("/failure", function(req, res){
 res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
console.log("Server is running on port 3000"); 
});





//API Key
//7fd23a25a8946391d0d357fff387a8ee-us1
//list id
//3b767fa1e0