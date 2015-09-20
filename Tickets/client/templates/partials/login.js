Template.login.events({
	"click .register-link": function(event){
		$(".panel-login").hide();
		$(".panel-register").fadeIn();
	},
	"click .login-link": function(event){
		$(".panel-register").hide();
		$(".panel-login").fadeIn();
	},
	"submit .register-form": function(event){
		var email = event.target.email.value;
		var password = event.target.password.value;
		var password2 = event.target.password2.value;
		debugger;
		Accounts.createUser({
			email: email,
			password: password,
			profile: {
				userType: "customer"
			}
		},function(err){
			if(err){
				FlashMessages.sendError("There was and error with the registration");
			}
			else{
				FlashMessages.sendSuccess("Account Created! You are now logged in");
				
			}
		});
		Router.go("/");
		return false;
	},
});
