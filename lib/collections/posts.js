Posts = new Mongo.Collection('posts');

//collection.allow() accepts insert,update,remove functions and allows operations based on returned boolean value
Posts.allow({
        update: function(userId, post){return ownsDocument(userId, post)},
        remove: function(userId, post){return ownsDocument(userId, post)}
        });//ownsDoc permission is set in lib/permissions.js
Posts.deny({
	update: function(userId, post, fieldNames){
		return (_.without(fieldNames, 'url', 'title').length>0);
		}
	});//returns a boolean true on length condition of fieldNames array

//define post validation method for postInsert function
/*
validatePost= function(postArg){
        var errors = {};
        if(!postArg.title)
                errors.title = 'Please fill in a headline';
        if(!postArg.url)
                errors.url = 'Please fill in a URL';
        return
                errors;
};
*/
//define Meteor methods how client can access data

Meteor.methods({
        postInsert: function(postAttributes){

//check data types and errors of the post attribs
	check(this.userId, String);
	check(postAttributes, {title: String, url: String});
//      var errors = validatePost(postAttributes);
//      if(errors.title || errors.url) 
//              throw new Meteor.Error('invalid-entry', 'You must set a title and a URL');

//find the doc with same link
        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if(postWithSameLink){
                return  {postExists: true,
                        _id: postWithSameLink._id
                        }
                     }  //return this obj to the callback and route to this id

        var user = Meteor.user();

//create a post doc by extending existing post attribs values
        var post = _.extend(postAttributes, {
                        userId: user._id,
                        author: user.username,
			commentsCount: 0,
                        submitted: new Date(),
			upvoters: [],
			votes: 0
        });

//insert this extended doc into the collection, capture the postId for routing

        var postId = Posts.insert(post);
	return {
		_id: postId
		};  //the doc is routed to the postPage by this id  
 },

//create upvote method
	upvote: function(postId){
		check(this.userId, String);
		check(postId, String);
	var voted = Posts.update({
				_id:postId, 
				upvoters: {$ne: this.userId} //negate existing voter
			    }, {
				$addToSet: {upvoters: this.userId},
				$inc : {votes:1},
				});
	if (!voted) 
		throw new Meteor.Error('invalid', 'You could not upvote that post.');
		},	

});

