Template.sidebar.helpers({
	categories: function(){
		return Categories.find({},{
			sort:{
				name:1
			}
		});
	},

	products: function(){
		return Categories.find({},{
			sort:{
				name:1
			}
		});
	},
});

