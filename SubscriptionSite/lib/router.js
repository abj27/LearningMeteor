Router.configure({
	layoutTemplate: "layout"
});

Router.map(function(){
	this.route("plans",{
		path:"/",
		template:"plans",
	});
	this.route("listplans",{
		path:"/admin/plans",
		template:"listplans",
		data: function(){
			templateData = {
				plans: Plans.find()
			};
			return templateData;
		}
	});

	this.route("addplan",{
		path:"/admin/plans/add",
		template:"addplan",
	});

	this.route("edit",{
		path:"/admin/plans/edit/:_id",
		template:"editplan"
	});

	this.route("listsubscribers",{
		path:"/admin/Subscribers",
		template:"listsubscribers"
	});
});


