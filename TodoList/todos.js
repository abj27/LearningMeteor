Todos = new Mongo.Collection('todos');
if (Meteor.isClient) {
	//Template Helpers
	Meteor.subscribe('todos');
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

if(Meteor.isServer){
	Meteor.publish('todos', function(){
		return Todos.find({userId: this.userId});
	});
}
var helpers = {
	throwIfNotAuthenticated:function(){
		if(!Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}
	},
	throwIfItsNotTheCurrenUser:function(userId){
		if(userId!= Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}
	}
}
Meteor.methods({
	addTodo:function(text){
		helpers.throwIfNotAuthenticated();
		Todos.insert({
			text: text,
			createdAt: new Date(),
			userId: Meteor.userId(),
			username: Meteor.user().username
		});
	},
	deleteTodo:function(todoId){
		helpers.throwIfNotAuthenticated();
		var todo = Todos.findOne(todoId);
		helpers.throwIfItsNotTheCurrenUser(todo.userId);
		Todos.remove(todoId);
	},
	setChecked: function(todoId, setChecked){
		helpers.throwIfNotAuthenticated();
		var todo = Todos.findOne(todoId);
		helpers.throwIfItsNotTheCurrenUser(todo.userId);
		Todos.update(todoId, {$set:{checked: setChecked}});
	},
});



