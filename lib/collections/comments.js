
Comments = new Mongo.Collection('comments');

Meteor.methods({
	commentInsert: function(commentAttribs){
		//do some checks
		check(this.userId, String);
		check(commentAttribs, { body: String, postId: String});
//get the post ref for the comment
	var post = Posts.findOne(commentAttribs.postId);

//check comment submission errors
	if(!post) 
	throw new Meteor.Error('invalid-comment','You must comment on a post');
	if(!commentAttribs.body) 
	throw new Meteor.Error('invalid-comment','Write something yo!');
	//invalid-comment is the css error class

//Capture user
	var user = Meteor.user();
//extend the comment doc with all attribs
	 comment = _.extend(commentAttribs, {
			userId: user._id,
			author: user.username,
			submitted: new Date(),
	})
//update the commentsCount increment by one in the Posts collection
	Posts.update(comment.postId, {$inc: {commentsCount: 1}});

//insert this comment into Comments collection and save a ref to the doc
	comment._id = Comments.insert(comment);	

//since the comment has an id, now pass this new comment for notification to other commenters
	createCommentNotification(comment);

//return the doc
	return comment._id;
	}
});
