Template.add_product.events({
	"submit .add_product": function(event){
		var name = event.target.name.value;
		var category = event.target.category.value;
		var description = event.target.description.value;
		var isFeatured = parseInt(event.target.is_featured.value);
		var file = $("#productImage").get(0).files[0];
		var productImage ="/img/noimage.png";
		if(file){
			var fsFile = new FS.File(file);
			ProductsImages.insert(fsFile, function(err,result){
				if(!err){
					productImage = "/cfs/files/productsImages/"+result._id;
					Products.insert({
						name: name,
						category: category,
						description: description,
						is_featured: isFeatured, 
						image: productImage,
						createdAt: new Date()
					});
				}
			});
		}else{
			Products.insert({
				name: name,
				category: category,
				description: description,
				is_featured: isFeatured, 
				image: productImage,
				createdAt: new Date()
			});
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
