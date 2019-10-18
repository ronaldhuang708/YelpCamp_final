# YelpCamp_final
The website can be viewed at the following link
https://hidden-brook-14856.herokuapp.com/


##Setup(RESTFUL Route)

-Landing Page
-Campgrounds Page that lists all campgrounds
-Login/Sign Up Page

##Features
-Background slider for the landing page

-Authentication/Authorization middleware
  1. Need to login/sign up to add new campground/comment
  2. Users can only delete/update their own campground/comment
  3. Edit/Delete button is hidden if users don't have the permission to do that
  
-Mongoose database
 1. Setup a campground/comment model
 2. Associated users and comments
 3. Associated users and campgrouds
 
-Flash message for error/success

-Layout and Styling with Bootstrap

-Seed File
  1. To generate some data in database for the first time use
  
-Collapsible Comment Section


###RESTFUL Route

Name    Path            HTTP Verb   Purpose                               Mongoose Method
Index   /dogs           Get         List all dogs                         Dog.find()
New     /dogs/new       Get         Show new dog form                     N/A
Create  /dogs           Post        Creat a new dog and redirect          Dog.create()
Show    /dogs/:id       Get         Show info about one specific dog      Dog.findById()
Edit    /dogs/:id/edit  Get         Show edit form for one dog            Dog.findById()
Update  /dogs/:id       Put         Update a particular dog and redirect  Dog.findByIdAndUpdate()
Destroy /dogs/:id       Delete      Delete a particular dog and redirect  Dog.findByIdAndRemove()


