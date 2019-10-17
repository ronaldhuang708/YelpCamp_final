var express = require("express");
var router = express.Router({mergeParams: true}); // mergeParams so the same id for :id can be passed in
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


// Comment New
router.get("/new", middleware.isLoggedIn, function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

// Comment Create
router.post("/", middleware.isLoggedIn, function(req, res){
	//lookup campground using id
	Campground.findById(req.params.id, function(err, campground){
			if(err){
				console.log(err);
				res.redirect("/campgrounds");
			} else {
				//create new comment
				//connect new comment to campground
				//redirect to show page
				Comment.create(req.body.comment, function(err, comment){
					if(err){
						console.log(err);
					} else {
						//add username and id to comment
						comment.author.id = req.user._id;
						comment.author.username = req.user.username;
						//save comment
						comment.save();
						campground.comments.push(comment);
						campground.save();
						req.flash("success", "Successfully added a comment");
						res.redirect("/campgrounds/" + campground._id);
					}
				});
			}
	});
});

//Comment edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "No campground found");
			return res.redirect("/campgrounds");
		}
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("/campgrounds");
			} else {
				res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}); 
			}
		});
	});
});

//Comment Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});

//Comment Destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});
 

module.exports = router;