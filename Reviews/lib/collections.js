Categories = new Mongo.Collection("categories");
Products = new Mongo.Collection("products");
ProductsImages = new FS.Collection("productsImages", {
	stores:[new FS.Store.GridFS("productsImages")]
});
ProductsImages.allow({
	insert:function(){
		return true;
	},
	download:function(){
		return true;
	}
});
