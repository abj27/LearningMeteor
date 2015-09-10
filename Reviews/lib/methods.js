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
	},
	addReview:function(id,rating,body){
		Products.update({_id:id	},
		{$push:{
				reviews:{
					rating: rating,
					body: body,
					date: new Date()
				}
			}
		});
	}
});
