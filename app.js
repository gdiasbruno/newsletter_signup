const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express();
app.use(bodyParser({extended: true}))
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function(){
  console.log("Server running on port 3000.")
})

app.post("/", function(req,res){
  var fname = req.body.firstName;
  var sname = req.body.secondName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: sname,

        }
      }
    ]
  };

  var jsonData = JSON.stringify(data)
  var url = "https://us10.api.mailchimp.com/3.0/lists/fe10b78fe9";
  const options = {
    method: "POST",
    auth: "gusttavo:2cb1b34819786600b73e39897559e743-us10"
  }
  const request = https.request(url, options, function(response){
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/sucess.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      // console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();
})

app.get("/", function (req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/failure.html", function (req, res){
  res.redirect("/")
})

// ID list
//
// fe10b78fe9

// API Key
// 2cb1b34819786600b73e39897559e743-us10
