Template.registerHelper("isCurrentRoute",function(route){
	return Router.current().route.getName() === route;
});
Template.registerHelper("isInRole",function(role){
    return Meteor.user() && Meteor.user().roles.indexOf("admin") >=0;
});
