const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  var jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/d5553c17ff";

  const options = {
    method: "POST",
    auth: "naod:ae4b6cbb88e8e831f20e7acb2420286b-us21",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.SendFile(__dirname + "/failure.html");
      }
    });

    request.write(jsonData);
    request.end();
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

//API Key
//ae4b6cbb88e8e831f20e7acb2420286b-us21

//List Id
//d5553c17ff
