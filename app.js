const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "//index.html");
});

app.post("/", function(req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
        }]
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/d8ca9c88ff";

    const options = {
        method: "POST",
        auth: "mandarsatam:fd8443d7f83dd9c83e06517f2dbd8bf0-us17",
    };

    const request = https.request(url, options, function(response) {
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "//success.html")
        } else {
            res.sendFile(__dirname + "//failure.html")
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })

    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.listen(3000, function(req, res) {
    console.log("Server is running");

});

//fd8443d7f83dd9c83e06517f2dbd8bf0-us17


// d8ca9c88ff

//https://usX.api.mailchimp.com/3.0/lists/