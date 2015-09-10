Meteor.methods({
	addProduct:function(fileUrl,name,category,description, isFeatured){
		Products.insert({
			name: name,
		category: category,
		description: description,
		is_featured: isFeatured, 
		image: fileUrl,
		createdAt: new Date()
		});
	}
});
