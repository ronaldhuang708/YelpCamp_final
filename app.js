var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
	flash        = require("connect-flash"),
	passport 	= require("passport"),
	methodOverride = require("method-override"),
	LocalStrategy = require("passport-local"),
	Campground  = require("./models/campground"),
	Comment     = require("./models/comment"),
	User 	    = require("./models/user"),
	seedDB      = require("./seeds");

//requiring routes
var commentRoutes 		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes 		= require("./routes/index");

mongoose.connect(process.env.DATABASEURL, {
	useUnifiedTopology:true, 
	useNewUrlParser: true
});
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment"); //moment is availble to use in all view files via variable named moment
//seedDB(); // seed database

// PASSPORT Config
app.use(require("express-session")({
	secret: "RHMC",
	resave: false,
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// will add currentUser = req.user to every line
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes); //need to add mergeParams in comments js

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("YelpCamp server has started....");
});