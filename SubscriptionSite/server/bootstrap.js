Meteor.startup(function(){
	if(Meteor.users.find().count() < 1){
		var id;
		id = Accounts.createUser({
			email: "admin@example.com",
		    password: "123456",
		    profile:{
			   name:"Superuser" 
		    }
		});
		Roles.addUsersToRoles(id,["admin"]);
	}
});
