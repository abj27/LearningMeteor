Todos = new Mongo.Collection('todos');
if (Meteor.isClient) {
	//Template Helpers
	Template.main.helpers({
		todos: function(){
			return Todos.find({}, {sort: {createdAt:-1 }});
		},
	    currentUser: function(){
			return Meteor.user();
		}
	});

	Template.main.events({
		"submit .new-todo": function(event){
			var text = event.target.text.value; 
					event.target.text.value = '';
			Meteor.call('addTodo', text);
			return false;
		},
		"click .toggle-checked": function(){
			Meteor.call('setChecked',this._id, !this.checked);
		},
		"click .delete-todo": function(){
			if(confirm("Are you sure?")){
				Meteor.call("deleteTodo", this._id);
			}
		}
	});
	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});
}

Meteor.methods({
	addTodo:function(text){
		if(!Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}
		Todos.insert({
			text: text,
			createdAt: new Date(),
			userId: Meteor.userId(),
			username: Meteor.user().username
		});
	},
	deleteTodo:function(todoId){
		if(!Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}
		Todos.remove(todoId);
	},
	setChecked: function(todoId, setChecked){
		if(!Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}
		Todos.update(todoId, {$set:{checked: setChecked}});
	}
});
