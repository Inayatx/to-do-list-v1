//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let items = ["Buy food", "Cook food", "Eat food"];
let workItems = [""];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  let today = new Date();

  let options = {
    weekday: 'long',
    // year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  let day = today.toLocaleDateString("en-US", options);



  // var currentDay = today.getDay();
  // var day = "";

  // if (currentDay === 6 || currentDay === 0) {
  //   day = "Weekend";
  // } else {
  //   day = "Weekday";
  // }

  // switch (currentDay) {
  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //     day = "Monday";
  //     break;
  res.render("list", {listTitle: day, newListItems: workItems });

  app.post("/", function(req, res) {

    let item = req.body.newItem;

    console.log(item);

    items.push(item);

    res.redirect("/");
  });
});

app.get("/work", function(req,res){
  res.render("list", {listTitle:"Work List", newListItems: items});

});

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});


app.listen(3000, function() {
  console.log("Server started on port 3000.");
});