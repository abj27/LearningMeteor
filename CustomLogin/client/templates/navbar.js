Template.navbar.events({
	"click .logout-btn": function(event){
		Meteor.logout(function(error){
			if(error){
				FlashMessages.sendError(error.reason);
			}
			else{
				FlashMessages.sendSuccess("You are now loggget out");	
				Router.go("/");
			}
		});
	}
});
