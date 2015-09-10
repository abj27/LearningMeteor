Template.new_review.events({
	"submit .new-review": function(event){
		var rating = event.target.rating.value;
		var body = event.target.body.value;
		FlashMessages.sendSuccess('Review Added');
		Meteor.call("addReview", this._id, rating, body);
		Router.go("/");
		return false;
	}
});
