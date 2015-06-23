Template.postItem.helpers({
	domain: function(){
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
		},
	ownPost: function(){
		return this.userId == Meteor.userId();
		},

/*	commentsCount: function(){
		return Comments.find({postId: this._id}).count();
		},
//commentCount no longer needed manually to count since a field is being inserted in the Posts collection for each individual post doc; the field is incremented inside comments.js
*/
});

Template.postItem.events({
	'click .up': function(e){
			e.preventDefault();
			if (!Meteor.userId()){
		//	Router.go('atSignIn');
			bootbox.dialog({message: "Sign in first yo:)"});
			} else {
			Meteor.call('upvote', this._id);
			}
	}
});
/* THis was the old process of rendering post transition on upvote changes
Template.postItem.rendered = function(){
	var instance = this;
	var rank = this.data._rank;
	var $this = $(this.firstNode);
	console.log(rank);
	console.log($this);
	var postHeight = 80;
	var newPosition = rank*postHeight;

	if (typeof(instance.currentPosition) !== undefined){
		var previousPosition = instance.currentPosition;
		console.log(previousPosition);
		var delta = previousPosition - newPosition;
		console.log(delta);
		$this.css('top', delta + 'px');
		console.log($this);
	}

	Meteor.defer(function(){
	instance.currentPosition = newPositoin;
	$this.css('top', '0px');
	console.log($this);
});
}
*/
	
