Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function(){
             return [Meteor.subscribe('notifications')];
	}
});


/*
Router.route('/:postsLimit?', {
		name: 'postsList',
		waitOn: function(){
			var limit = parseInt(this.params.postsLimit) || 5;
			return Meteor.subscribe('posts', {sort: {submitted: -1}, limit: limit});
			},
		data: function(){
			var limit= parseInt(this.params.postsLimit) || 5;
			return {
				posts: Posts.find({}, {sort:{submitted: -1}, limit:limit})						};
			},		
		});
//created a controller by extending RouteController Obj in order to pass options more dynamically below
*/
PostsListController = RouteController.extend({
		template: 'postsList',
		increment: 5,
		postsLimit: function(){
		return parseInt(this.params.postsLimit) || this.increment;
		},
		findOptions: function(){
		return {sort: this.sort, limit: this.postsLimit()};
		},
		waitOn: function(){
		return Meteor.subscribe('posts', this.findOptions());
		},
		posts: function(){
		return Posts.find({}, this.findOptions());
		},
		data: function(){
		var hasMore = this.posts().count()===this.postsLimit();

		//return the data context in posts and nextPath
		return {			
			posts: this.posts(),
			nextPath: hasMore ? this.nextPath() : null,
			};
		},

	});
//create path controller for Latest posts by extending main PostListController
NewPostsController = PostsListController.extend({
		sort: {submitted: -1, _id: -1}, //sort returned post data in ASC order
		nextPath: function(){
			return	Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment});	
	} //newPosts path will return data based on this sort and limit
});
//create path controller for top voted posts by submission date
BestPostsController = PostsListController.extend({
		sort: {votes: -1, submitted: -1, _id: -1},
		nextPath: function(){
		return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment});
	}
});
/*no longer using postLimit on home page but optional
Router.route('/:postsLimit?', {
		name:'postsList',
		controller: PostsListController
		});
*/
//pathFor home
Router.route('/', {
		name: 'home',
		controller: NewPostsController,	//show newposts
});
//pathFor newPosts
Router.route('/new/:postsLimit?', {
		name: 'newPosts',
		controller: NewPostsController,
});
//pathFor bestPosts
Router.route('/best/:postsLimit?', {
		name: 'bestPosts',
		controller: BestPostsController,
});
//pathFor postPage
Router.route('/posts/:_id', {
		name: 'postPage',
		waitOn: function(){
			return [
				Meteor.subscribe('singlePost', this.params._id),
				Meteor.subscribe('comments', this.params._id)
				];
			},
//wait on post and comment data; load them only when they're routed to their path
//find the cursor/array of cursors published from the collection
		data: function(){return Posts.findOne(this.params._id)}
						//scope of this is the route path
});
//pathFor postSubmit
Router.route('/submit', {
		name: 'postSubmit',
		disableProgress: true,
});
//pathFor postEdit
Router.route('/posts/:_id/edit', {
		name: 'postEdit',
		data: function(){return Posts.findOne(this.params._id);}
		});
//postsList name of the route as well as name of the template, when used same name, declaring path becomes optional

//define a login hook for the router to add user restriction on the page view for postSubmit
var requireLogin= function(){
				if(!Meteor.user()){
					if(Meteor.logginIn())
						this.render(this.loadingTemplate);
					else 
					this.render('accessDenied');//route this template
				} else	
					this.next();	
				
			};
Router.onBeforeAction(requireLogin, {only:'postSubmit'}); //attach the action hook to the router

