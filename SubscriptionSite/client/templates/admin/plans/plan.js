Template.addplan.events({
	"submit .add-plan-form":function(){
		Plans.insert({
			planName : event.target.plan_name.value,
			planLabel : event.target.plan_label.value,
			days : event.target.days.value,
			description : event.target.description.value,
			is_default : event.target.is_default.value,
			price : event.target.price.value
		});
		toastr.success("Plan Added");
		Router.go("/admin/plans");
		return false;
	}
});
