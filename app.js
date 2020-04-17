var express = require("express");
const path = require("path");
var app = express();
var flash = require("connect-flash");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
var LocalStrategy = require("passport-local").Strategy;
var Park = require("./models/park");
var ParkRequest = require("./models/parkRequest");
var Review = require("./models/review");
var User = require("./models/user");
var seedDB = require("./seed");

var parkRoutes = require("./routes/parks.js");
var reviewRoutes = require("./routes/reviews.js");
var indexRoutes = require("./routes/index.js");
//mongoose.connect("mongodb://localhost:27017/park_application", {useUnifiedTopology: true, useNewUrlParser: true});
/*
mongoose.connect("", {useUnifiedTopology: true,  useFindAndModify: false, useNewUrlParser: true}).catch(
(error)=>
{
  console.log("An error has occured");
});
*/
const PORT = process.env.PORT || 5000;


seedDB();
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")(
{
  secret: "secret",
  saveUninitialized: false,
  resave: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");



passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next)
{
  res.locals.user = req.user;
  res.locals.error= req.flash("error");
  res.locals.success= req.flash("success");
  res.locals.warning = req.flash("warning")
  next();
});

app.use("/parks", parkRoutes);
app.use("/parks/:id/reviews", reviewRoutes);
app.use(indexRoutes);

app.listen(PORT, () => console.log("The Park App Server Has Started!"));
