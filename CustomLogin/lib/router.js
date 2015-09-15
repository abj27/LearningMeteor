Router.configure({
	layoutTemplate:"form_layout"
});

Router.map(function(){
	this.route("login",{
		path:"/",
		template:"login"
	});
}); 
Router.map(function(){
	this.route("register");
});
