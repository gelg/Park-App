var express = require("express");
var router = express.Router({mergeParams: true});
var Park = require("../models/park");
var Review = require("../models/review");
var User = require("../models/user");
var middleware = require("../middleware/index.js");

router.get("/new", middleware.isLoggedin, function(req, res)
{
  Park.findById(req.params.id, function(err, foundPark)
  {
    if(err)
    {
      //console.log(err);
      req.flash("error", "An error has occured. Please report this.");
      res.redirect("/parks")
    }
    else if (req.user.reviewedParks.includes(foundPark._id))
    {
      //console.log("already wrote a review");
      req.flash("warning", "You have already written a review for this park. If you want to add a different one delete your old one.");
      res.redirect("/parks/" + foundPark._id);
    }
    else
    {
        res.render("reviews/new", {park : foundPark});
    }
  });
});

router.post("/", middleware.isLoggedin, function(req, res)
{
  Park.findById(req.params.id, function(err, foundPark)
  {
    var newReview = {userId: req.user._id, author: req.user.displayName, rating: req.body.rating, reason: req.body.reason};
    if (err)
    {
      //console.log(err);
      req.flash("error", "An error has occured. Please report this.");
      res.redirect("/parks");
    }
    else
    {
      Review.create(newReview, function(err, review)
      {
        if (err)
        {
          //console.log(err);
          req.flash("error", "An error has occured. Please report this.");
          res.redirect("/parks");
        }
        else
        {
          req.user.reviewedParks.push(foundPark._id);
          req.user.save();
          foundPark.reviews.push(review);
          foundPark.save();
          req.flash("success", "Your review has been added.");
          res.redirect("/parks/" + foundPark._id);
        }
      });
    }
  });
});

router.delete("/:reviewId", function(req, res)
{
  if(req.user)
  {
    if(req.user.reviewedParks.includes(req.params.id))
    {
      Review.findByIdAndRemove(req.params.reviewId, function(err, foundPark)
      {
        if(err)
        {
          //console.log(err);
          req.flash("error", "An error has occured. Please report this.");
          res.redirect("/parks");
        }
        else
        {
          req.user.reviewedParks.splice(req.user.reviewedParks.indexOf(req.params.id), 1);
          req.user.save();
          req.flash("success", "Your review for this park has been deleted.");
          res.redirect("/parks/" + req.params.id);
        }

      });
    }
    else
    {
      req.flash("error", "An error has occured. Please report this.");
      res.redirect("/parks");
    }
  }
  else
  {
    req.flash("error", "An error has occured. Please report this.");
    res.redirect("/parks");
  }
});



module.exports = router;
