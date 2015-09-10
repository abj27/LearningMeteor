Template.add_product.events({
	"submit .add_product": function(event){
		var name = event.target.name.value;
		var category = event.target.category.value;
		var description = event.target.description.value;
		var isFeatured = parseInt(event.target.is_featured.value);
		var file = $("#productImage").get(0).files[0];
		var productImage ="/img/noimage.png";
		if(file){
			var	fsFile = new FS.File(file);
			var imageUrl = null;
			ProductsImages.insert(fsFile, function(err,result){
				if(!err){
					imageUrl= "/cfs/files/productsImages/"+result._id;
				}
				Meteor.call("addProduct",imageUrl,name,category,description,isFeatured);
			});
		}
		else{
			Meteor.call("addProduct",imageUrl,name,category,description,isFeatured);
		}
		event.target.name.value ="";
		event.target.category.value ="";
		event.target.description.value ="";
		event.target.is_featured.value ="";
		FlashMessages.sendSuccess("Product Added");
		Router.go("/");
		return false;
	}
}); 
