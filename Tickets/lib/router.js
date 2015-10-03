var onBeforeActions ={
	isStaff:function(){
		if(Meteor.user()){
			if(Meteor.user().profile.userType ==="staff"){
				Router.go("/staff");
			}
			else{
				this.next(); 
			}
		}
		else{
			this.next();
		}
	}	
};

Router.onBeforeAction(onBeforeActions.isStaff,{
	only: ["mytickets"]
});

Router.configure({
	layoutTemplate: "layout"
});
Router.map(function(){
	this.route("mytickets",{
		path:"/",
		template: "mytickets",
		data: function(){
			templateData = {
				tickets: Tickets.find({customer: Meteor.userId()})
			};
			return templateData;
		}
	});
	this.route("ticket",{
		path:"/ticket/:_id",
		template:"ticket",
		data: function(){
			var currentTicket = this.params._id;
			return Tickets.findOne({_id: currentTicket});
		}

	});
	this.route("staff",{
		path:"/staff",
		template:"stafftickets",
		data: function(){
			return{
				tickets:Tickets.find()	
			};
		}

	});
});
