//Manually insert into collections if no posts/comments exists

if (Posts.find().count() === 0){

//create couple of profile records in the users collection
var profile1 = Meteor.users.insert({
	profile: {name: 'Roby'}
});

var profile2 = Meteor.users.insert({
	profile: {name: 'Sha'}
});
//assign the ids to a var
var Roby = Meteor.users.findOne(profile1);
var Sha = Meteor.users.findOne(profile2);

var now = new Date().getTime();

//create a post doc with user and profile info
var yappyPostId= Posts.insert({
	title: 'yappyCity Social Listing',
	userId: Roby._id,
	author: Roby.profile.name,
	url: 'http://yappycity.com',
	commentsCount: 2,
	submitted: now - 11*3600*1000
});

//insert the related post into the Comments collection with comments
Comments.insert({
postId: yappyPostId,
userId: Sha._id,
author: Sha.profile.name,
submitted: now - 8*3600*1000,
body: 'I like the idea of an Interactive listing site; this is Sha, how can i contribute..'
});

Comments.insert({
postId: yappyPostId,
userId: Roby._id,
author: Roby.profile.name,
submitted: now - 5*3600*1000,
body: 'Hey Sha, join me in our chat room'
});

//insert couple more posts by these users while the Posts collection is empty
Posts.insert({
	title:'Share a Place with a Programmer',
	userId: Roby._id,
	author:Roby.profile.name,
	url:'http://yappycity.com/share',
	commentsCount: 0,
	submitted: now - 13*3600*1000
});

Posts.insert({
	title:'Meteor Developer Needed',
	userId: Sha._id,
	author:Sha.profile.name,
	url:'http://weworkmeteor.com',
	commentsCount: 0,
	submitted: now- 21*3600*1000
});


}
