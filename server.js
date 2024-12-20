// A: package.json!

// what command do we run to start an npm project?
// A: npm init

// what does the below chunk of code do?
// A: imports libraries
const express = require("express"); // imports express
const multer = require("multer"); // imports multer -- handles file upload
const bodyParser = require("body-parser"); // imports body parser -- allows us to have a body in server request
const nedb = require("@seald-io/nedb");

// translates bits and bytes (literal memory and data) to something readable by the server
const urlEncodedParser = bodyParser.urlencoded({ extended: true });

// what is app?
// A: instance of express
const app = express();

// what is this configuring?
// A: destination for where files should be uploaded
const upload = multer({
  dest: "public/uploads",
});

let database = new nedb({
  filename: "database.txt",
  autoload: true,
});
let fishcollected = new nedb({
  filename: "fishcollected.txt",
  autoload: true,
});
// what do each of these statements do?

app.use(express.static("public")); // set the default folder for any static files such as assets, css, html
app.use(urlEncodedParser); // middleware to make sure the bits and bytes can be understood by the app
app.set("view engine", "ejs"); // allows us to use ejs

// what is this?
// A: route that handles when the client makes a request to /
app.get("/", (req, res) => {
  // response.send("server working");

  // what steps do we need in order to use a template ejs file?
  //

  res.render("index.ejs", {});
  // make sure to comment out the res.send() code above
});

app.post("/collectfish", (req, res) => {
  console.log(req.body.fishinfo);
  let Fishinput = JSON.parse(req.body.fishinfo);

  console.log("data:" + Fishinput);
  fishcollected.insert(Fishinput, (err, newData) => {
    console.log("loading" + newData);
  });
  res.redirect("/collect");
});

app.get("/fishingSite", (req, res) => {
  // response.send("server working");
  // what steps do we need in order to use a template ejs file?
  //
  database.count({}, function (err, count) {
    if (!err && count > 0) {
      // count is the number of docs

      // skip a random number between 0 to count-1
      var skipCount = Math.floor(Math.random() * count);

      database
        .find({})
        .skip(skipCount)
        .limit(1)
        .exec(function (err2, docs) {
          if (!err2) {
            // docs[0] is your random doc
            console.log(docs[0]);
            res.render("fishing-site.ejs", {
              doc: docs[0],
              fishPopup: { visible: false },
            });
          }
        });
    }
  });
});

app.get("/random", (req, res) => {
  database.count({}, function (err, count) {
    if (!err && count > 0) {
      // count is the number of docs

      // skip a random number between 0 to count-1
      var skipCount = Math.floor(Math.random() * count);

      database
        .find({})
        .skip(skipCount)
        .limit(1)
        .exec(function (err2, docs) {
          if (!err2) {
            // docs[0] is your random doc
            console.log(docs[0]);
            fishPageData = docs[0];
            res.json({ data: fishPageData });
            //create another database to store
          }
        });
    }
  });
});
app.get("/collect", (req, res) => {
  let query = {};
  fishcollected.find(query).exec((err, retreivedData) => {
    res.render("collect.ejs", { fishs: retreivedData });
    // console.log(fishs);
  });

  // res.render("collect.ejs", {});
  // make sure to comment out the res.send() code above
});
// A: port number!
// how do we access this on the web?
// A: ip address:port ex. localhost:6001
app.listen(6001, () => {
  console.log("server started on port 6001");
});
// app.listen(5000, function() {

// })
// secret comment for later in the demo:
// @seald-io/nedb

// function foo() {
//   console.log("hello")
// }
// const foo = () => {
//   console.log("hello")
// }
// foo()
