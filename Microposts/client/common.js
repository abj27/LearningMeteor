Meteor.startup(function(){
	AccountsEntry.config({
		homeRoute: '/',
		dashboardRoute:'/',
		passwordSignupFields: 'USERNAME_AND_EMAIL'
	});

	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_AND_EMAIL'
	});
});

Template.registerHelper('getProfileImage', function(userId){
	var imageData= UserImages.findOne({userId: userId});
	return imageData&&imageData.image;
});
