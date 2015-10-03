Template.registerHelper("formatDate",function(date){
	return moment(date).format("MMMM Do YYYY, h:mm:ss a");
});

Template.registerHelper("capFirst",function(text){
	return text.charAt(0).toUpperCase() + text.slice(1);
});

Template.registerHelper("isStaff",function(){
	return Meteor.user().profile.userType === "staff";
});
