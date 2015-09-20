Template.login.helpers({
	userEmail: function(){
		return Meteor.user().emails[0].address;
	}
});
Template.login.events({
	"click .register-link": function(event){
		$(".panel-login").hide();
		$(".panel-register").fadeIn();
	},
	"click .login-link": function(event){
		$(".panel-register").hide();
		$(".panel-login").fadeIn();
	},
	"submit .logout-form":function(event){
		Meteor.logout(function(err){
			if(err){
				FlashMessages.sendError(err.reason);
			}else{
				FlashMessages.sendSuccess("You have been logged out");
				Router.go("/");
			}
			
		});
		return false;
	}, 
	"submit .register-form": function(event){
		var email = event.target.email.value;
		var password = event.target.password.value;
		var password2 = event.target.password2.value;
		var formIsValid = isNotEmpty(email) && isNotEmpty(password) && isNotEmpty(password2) && areValidPasswords(password,password2);
			
		if(formIsValid){
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
		}
		else{
			FlashMessages.sendError("Invalid inputs");
		}
		return false;
	},
	"submit .login-form":function(event){
		var email = event.target.email.value;
		var password= event.target.password.value;
		Meteor.loginWithPassword(email, password, function(error){
			if(error){
				event.target.email.value = email;
				event.target.password.value = password;	
				FlashMessages(err.reason);
			}
			else{
				FlashMessages.sendSuccess("You are now logged in");
				Router.go("/");
			}
		});
			
		return false;
	}
});
var trimInput= function(val){
	return val.replace(/^\s*|\s*$/g,"");
};

var isNotEmpty = function(value){
	if(value && value !==""){
		return true;
	}
	FlashMessages.sendError("Please fill in all fields");
	return false;
};

var isValidPassword = function(password){
	if(password.length  < 6){
		FlashMessages.sendError("Password must be at least 6 characters");
		return false;
	}
	return true;
};

var areValidPasswords = function(password,confirm){
	if(!isValidPassword(password)){
		return false;
	}
	if(confirm !== password){
		FlashMessages.sendError("Passwords do not match");
		return false;
	}
	return true;
};
