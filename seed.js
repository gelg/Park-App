var mongoose = require("mongoose");
var Park = require("./models/park");
var ParkRequest = require("./models/parkRequest");
var Review = require("./models/review");
var User = require("./models/user")
var parks =
[
  {
    author: "Park App",
    name: "Blue Park",
    streetAddress: "12345 Portland St.",
    city: "Portland",
    state: "Maine",
    zipcode: "12345",
    images: ["Blue-Basketball-Austin.jpeg","Blue-Soccer-Austin.jpeg", "Blue-Park-Austin.jpeg"],
    description: "Blue Park Portland is home to a large community that loves playing hockey, baseball, basketball, and soccer",
    rentable: true,
    rentRange: "500-1000 day"
  },
  {
    author: "Park App",
    name: "Red Park",
    streetAddress: "12345 Portland St.",
    city: "Portland",
    state: "Maine",
    zipcode: "12345",
    images: ["Red-Basketball-Austin.jpeg","Red-Soccer-Austin.jpeg", "Red-Park-Austin.jpeg"],
    description: "Red Park Portland is home to a large community that loves playing hockey, baseball, basketball, and soccer",
    rentable: true,
    rentRange: "500-1000 day"
  },
  {
    author: "Park App",
    name: "Green Park",
    streetAddress: "12345 Portland St.",
    city: "Portland",
    state: "Maine",
    zipcode: "12345",
    images: ["Green-Basketball-Austin.jpeg","Green-Soccer-Austin.jpeg", "Green-Park-Austin.jpeg"],
    description: "Green Park Portland is home to a large community that loves playing hockey, baseball, basketball, and soccer",
    rentable: true,
    rentRange: "500-1000 day"
  },
  {
    author: "Park App",
    name: "Green Park",
    streetAddress: "12345 Second St.",
    city: "Austin",
    state: "Texas",
    zipcode: "67890",
    images: ["Green-Park-Austin.jpeg","Green-Soccer-Austin.jpeg", "Green-Basketball-Austin.jpeg"],
    description: "Green Park Austin is home to a large community that loves playing football, basketball, and soccer",
    rentable: true,
    rentRange: "200-400 day"
  },
  {
    author: "Park App",
    name: "Red Park",
    streetAddress: "12345 Third St.",
    city: "Austin",
    state: "Texas",
    zipcode: "12345",
    images: ["Red-Park-Austin.jpeg","Red-Soccer-Austin.jpeg", "Red-Basketball-Austin.jpeg"],
    description: "Red Park Austin is home to a large community that loves playing Football, baseball, and basketball",
    rentable: true,
    rentRange: "500-1000 day"
  },
  {
    author: "Park App",
    name: "Blue Park",
    streetAddress: "12345 Third St.",
    city: "Austin",
    state: "Texas",
    zipcode: "12345",
    images: ["Blue-Park-Austin.jpeg","Blue-Soccer-Austin.jpeg", "Blue-Basketball-Austin.jpeg"],
    description: "Blue Park Austin is home to a large community that loves playing Football, baseball, and basketball",
    rentable: true,
    rentRange: "600-800 day"
  }
]
function seedDB()
{
  Park.deleteMany({}, function(err)
  {
    if (err)
    {
        console.log(err);
    }
    else
    {
      console.log("removed parks");
    }
  });

  ParkRequest.deleteMany({}, function(err)
  {
    if (err)
    {
        console.log(err);
    }
    else
    {
      console.log("removed park requests");
    }
  });

  Review.deleteMany({}, function(err)
  {
    if (err)
    {
        console.log(err);
    }
    else
    {
      console.log("removed reviews");
    }
  });

  User.deleteMany({}, function(err)
  {
    if (err)
    {
        console.log(err);
    }
    else
    {
      console.log("removed users");
    }
  });

  parks.forEach(function(seed)
  {
    Park.create(seed, function(err, park)
    {
      if (err)
      {
        console.log(err);;
      }
      else
      {
        Review.create(
        {
          author: "Park App",
          rating: 10,
          reason: "Amazing great courts, and fields, and it has an amazing trail to run on"
        }, function(err, review)
        {
          if (err)
          {
            console.log(error);
          }
          else
          {
            park.reviews.push(review);
            park.save();
          }
        });
      }
    });
  });
}

module.exports = seedDB;
