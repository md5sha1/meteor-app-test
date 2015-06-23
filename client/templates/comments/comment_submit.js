Template.commentSubmit.events({
	'submit form': function(e, template){
		e.preventDefault();
//each comment should have the body, and the postId ref
	var commentAttribs = {
		body: $(e.target).find('[name=body]').val(),
		postId: template.data._id
	//each comment must have a postId ref in the Comments collection
	};
	Meteor.call('commentInsert', commentAttribs, function(error, result){
		if(error) throwError(error.reason);
		
		else result; //result is the doc returned from commentInsert
	});
   }

});
