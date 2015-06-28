
Notifications = new Mongo.Collection('notifications');

//allow update to that user's notification only on the client sub collection (restricts browser updates to otheruser docs) and on click returns only one field by setting it to true.
Notifications.allow({
	update: function(userId, doc, fieldNames){
		console.log(userId, doc, fieldNames);
		return ownsDocument(userId, doc) &&
			(fieldNames.length==1 && fieldNames[0] === 'read');
	}
});

createCommentNotification= function(comment){

//find the comment post doc
	var post = Posts.findOne(comment.postId);

//insert it into the collection if it's not your comment and the post
	if(post.userId !== comment.userId){

		Notifications.insert({
			postId: post._id,
			userId: post.userId,
			commentId: comment._id,
			commenterName: comment.author,
			read: false
			});	
		}
};

