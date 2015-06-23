
//Publish posts
Meteor.publish('posts', function(options){
		check(options, {
		sort: Object,
		limit: Number,
		});
		return Posts.find({}, options);
});
//publish single post for req w/single post id
Meteor.publish('singlePost', function(id){
		check(id, String);
		return Posts.find(id);
});


//we've restricted routing comments with waitOn subscription so that they're not all loaded at once when the router is initialized; so publish comments only for the current post page
Meteor.publish('comments', function(postId){
		return Comments.find({postId: postId});
});

//Publish notifications only those specific to this user (remember access from the browser console)
Meteor.publish('notifications', function(){
		return Notifications.find({userId: this.userId});
});
