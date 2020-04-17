var express = require("express");
var router = express.Router();
var middleware = require("../middleware/index.js");
var Park = require("../models/park");
var Review = require("../models/review");
var User = require("../models/user");
/*
router.get("/newRequest", function(req, res)
{
      res.render("parks/newRequest");
});
*/

router.get("/", function(req, res)
{
  // Get all campgrounds from DB
  Park.find({}, function(err, parks)
  {
    if(err)
    {
      //console.log(err);
      req.flash("error", "An error has occured. Please report this.");
      res.redirect("/parks")
    }
    else
    {
      res.render("parks/index", {parks: parks});
    }
  });
});

/*
router.post("/newRequest", function(req, res)
{
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var streetAddress = req.body.streetAddress;
  var city = req.body.city;
  var state = req.body.state;
  var zipcode = req.body.zipcode;
  var images = req.body.images.split(",");
  var description = req.body.description;
  var ratings = [];
  var reviews = [];
  var rentRange;
  var rentable;
  if (req.body.rentable)
  {
    rentable = true;
    rentRange = req.body.rentRange;
  }
  else
  {
    rentable = false;
  }
  var newParkRequest = {name: name, streetAddress: streetAddress, city: city, state: state,
     zipcode:zipcode, images: images, description: description, ratings: ratings,
     reviews: reviews, rentable: rentable, rentRange: rentRange};
  // Create a new campground and save to DB
  ParkRequest.create(newParkRequest, function(err, newlyCreated)
    {
      if (err)
      {
        console.log(err);
      }
      else
      {
        // redirect back to campgrounds page
        res.redirect("parks/newRequestSent");
      }
    }
  )
});
*/

/*
router.get("/newRequestSent", function(req, res)
{
  res.render("parks/newRequestSent");
});
*/

router.post("/", middleware.isLoggedin, function(req, res)
{
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var streetAddress = req.body.streetAddress;
  var city = req.body.city;
  var state = req.body.state;
  var zipcode = req.body.zipcode;
  var images = req.body.images.split(",");
  var description = req.body.description;
  var ratings = [];
  var reviews = [];
  var rentRange;
  var rentable;
  if (req.body.rentable)
  {
    rentable = true;
    rentRange = req.body.rentRange;
  }
  else
  {
    rentable = false;
  }
  var newPark = {userId: req.user._id, author: req.user.displayName, name: name, streetAddress: streetAddress, city: city, state: state,
     zipcode:zipcode, images: images, description: description, ratings: ratings,
     reviews: reviews, rentable: rentable, rentRange: rentRange};
  // Create a new campground and save to DB
  Park.create(newPark, function(err, newlyCreated)
    {
      if (err)
      {
        console.log(err);
      }
      else
      {
        // redirect back to campgrounds page
        req.flash("success", "Your park has been added.");
        res.redirect("parks");
      }
    }
  )
});


router.get("/new", middleware.isLoggedin, function(req, res)
{
  res.render("parks/new");
});

router.get("/:id", function(req, res)
{
  Park.findById(req.params.id).populate("reviews").exec(function(err, foundPark)
  {
    if(err)
    {
      //console.log(err);
      req.flash("error", "An error has occured. Please report this.");
      res.redirect("/parks")
    }
    else
    {
        res.render("parks/show", {park : foundPark});
    }
  });

});

router.get("/:id/edit", function(req, res)
{
    Park.findById(req.params.id, function(err, foundPark)
    {
      if(err)
      {
        //console.log(err);
        req.flash("error", "An error has occured. Please report this.");
        res.redirect("/parks")
      }
      else
      {
        if (req.user)
        {
          if(!foundPark.userId || req.user._id == foundPark.userId)
          {
            res.render("parks/edit", {park : foundPark});
          }
          else
          {
            req.flash("error", "An error has occured. Please report this.");
            res.redirect("/");
          }
        }
        else
        {
          req.flash("error", "An error has occured. Please report this.");
          res.redirect("/");
        }
      }

  });
});

router.put("/:id", function(req, res)
{
  Park.findById(req.params.id,function(err, foundPark)
  {
    if(err)
    {
      //console.log(err);
      req.flash("error", "An error has occured. Please report this.");
      res.redirect("/");
    }
    else
    {
      var name = req.body.name;
      var streetAddress = req.body.streetAddress;
      var city = req.body.city;
      var state = req.body.state;
      var zipcode = req.body.zipcode;
      var images = req.body.images.split(",");
      var description = req.body.description;
      var ratings = [];
      var reviews = [];
      var rentRange;
      var rentable;
      if (req.body.rentable.checked)
      {
        rentable = true;
        rentRange = req.body.rentRange;
      }
      else
      {
        rentable = false;
      }
      var updatedPark = {name: name, streetAddress: streetAddress, city: city, state: state,
         zipcode:zipcode, images: images, description: description, ratings: ratings,
         reviews: reviews, rentable: rentable, rentRange: rentRange};;
      Park.findByIdAndUpdate(req.params.id, updatedPark, function(err, updatedPark)
      {
        if(err)
        {
          //console.log(err);
          req.flash("error", "An error has occured. Please report this.");
          res.redirect("/parks");
        }
        else
        {
          req.flash("success", "Your park has been successfully updated.");
          res.redirect("/parks/" + req.params.id);
        }
      });
    }
  });
});

router.delete("/:id", function(req, res)
{
  Park.findByIdAndRemove(req.params.id, function(err)
  {
    if(err)
    {
      //console.log(err);
      req.flash("error", "An error has occured. Please report this.");
      res.redirect("/parks");
    }
    else
    {
      req.flash("success", "Your park has been successfully deleted.");
      res.redirect("/parks");
    }
  });
});


module.exports = router;
