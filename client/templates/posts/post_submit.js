Template.postSubmit.events({
	'submit form':function(e){
			e.preventDefault();
//capture post attribute values to route them to the postPage	

			var postAttribs = {
				url: $(e.target).find('[name=url]').val(),
				title: $(e.target).find('[name=title]').val(),
				};

//call a server-side method Meteor.call for post inserts instead of client-side Posts.insert() to avoid security issues. Define postInsert method in collections/posts.js. postInsert() method checks if the postExists for the user with that url link and then inserts all the post user attributes into the post doc to return that postId ref to the router.

		Meteor.call('postInsert', postAttribs, function(error, result){
				if(error) 
					throwError(error.reason);
				if(result.postExists) 
					throwError('This link already been posted');

				Router.go('postPage', {_id: result._id});
          	 }); //route to the postpage with that id
	}
});
//put the mouse cursor focus on input fields
Template.postSubmit.onRendered(function(){
		this.$("input:first, textarea:first, select:first").focus();
});
