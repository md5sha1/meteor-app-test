/* Template.postEdit.helpers({
		post: function(){
			return Posts.findOne(Session.get('currentPostId'));
			}
});
*/

Template.postEdit.events({
	'submit form' : function(e){
			e.preventDefault();	
			//capture the doc id from the postEdit object	
			var currentPostId = this._id;
			var postAttributes = {
				url: $(e.target).find('[name=url]').val(),
				title: $(e.target).find('[name=title]').val(),
				};
		Posts.update(currentPostId, {$set: postAttributes}, function(err){
				if(err)	throwError(err.reason);
				else
		Router.go('postPage', {_id: currentPostId});
		});
	},

	'click .delete': function(e){
			e.preventDefault();

			if(confirm('Delete this post?')){
			var currentPostId = this._id;
		Posts.remove(currentPostId);
		Router.go('postsList');
	   }
	}
});
