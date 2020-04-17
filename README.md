# Park-App
This is a website that lets people add and review parks. 
This is a fullstack web development project using the MEN stack MongoDB Express.js Node.js.


All packages needed to make this site work be in the package.json file. Please refer to that.

Home Page / Search Page
========================
The search bar on the home page does not work currently. The navbar does work though.


Park App logo on navbar
=========================
If this logo is clicked on any page it takes you back to the home page.


About Page
=========================
You can get to the about page by clicking About on the navbar from any page.
The about page is just a regular about page


Parks Page
==========================
You can get to the parks page by clicking on Parks on the navbar from any page.
This page displays all the parks currently in the database.
It give you the option to add a park but you must be logged in to add one.


Adding a Park
================
*Note: If you want to add images you should use image1.jpeg to image9.jpeg in this format image2.jpeg,image3.jpeg,image1.jpeg,image4.jpeg,image7.jpeg They must each be split by a , and have no spaces in between.


More information on a single Park Page
======================================
If you click on the button that says more info on any of the parks in the park page
you get taken to a new page with more information on the park.
shows more pictures if the park entry has more than one picture added. 
shows a description, and the exact address of the park. All parks on this app are fake.
shows a edit button and delete button if you are logged in to the account that added the park.
It shows an add a review button whether you are logged in or not but if you are not logged in
it won't let you write a review. You can also only write one review per park.


Sign up
========================================
If you click Sign Up on the navbar you get taken to the Sign Up page.
This page does not allow anyone to make their display name Park App.
It also makes it so that people have to enter a confirm password entry
that matches their password entry beore they can move on.


Log In
========================================
If you click Log In on the navbar you get taken to the Log In page.
This page is just a regular Log In page.


seedDB() Function
====================================
There is a sdatabase seeder or seedDB() function that runs everytime the server restarts.
This  function deletes all old data and fills in the database with all default data. 

