Router.configure({
	layoutTemplate: 'layout'
});

var onBeforeActions = {
	loginRequired: function(){
		if(!Meteor.userId()){
			Router.go("/");
		}else{
			this.next();
		}
	}
};
Router.onBeforeAction(onBeforeActions.loginRequired,{
	only:["add_product, new_review"]
});
Router.map(function(){
	this.route('home',{
		path:'/',
		template:'home',
		data:function(){
			templateData = {
				products: Products.find({is_featured:1})
			};
			return templateData;
		}

	});

	this.route('products',{
		path:'/products',
		template:'products',
		data:function(){
			templateData = {
				products: Products.find()
			};
			return templateData;
		}
	});

	this.route('add_product',{
		path:'/add_product',
		template:'add_product',
		data:function(){
			templateData = {
				categories: Categories.find()
			};
			return templateData;
		}
	});

	this.route('products_category',{
		path:'/categories/:slug',
		template:'products_category',
		data:function(){
			templateData = {
				products: Products.find({
					category: this.params.slug
				})
			};
			return templateData;
		}
	});

	this.route('new_review',{
		path:'/new-review/:_id',
		template:'new_review',
		data:function(){
			return Products.findOne(this.params._id);
		}
	});

	this.route('product',{
		path:'/products/:_id',
		template:'product',
		data:function(){
			return Products.findOne(this.params._id);
		}
	});
});
