Template.ticket.events({
	"submit .add-reply":function(event){
		var reply = event.target.reply.value;
		var userType = "customer";
		if(Meteor.user().profile.userType == "staff"){
			userType = "staff";
		}
		Tickets.update({
			_id: this._id
		},{
			$push:{
				replies: {
					reply: reply,
					userType: userType,
					user: Meteor.userId(),
					replyDate: new Date()
				}
			}
		});
		event.target.reply.value = "";
		FlashMessages.sendSuccess("Reply Added");
		return false;
	}
});
