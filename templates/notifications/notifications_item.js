Template.notificationsItem.helpers({
	notifications: function(){
		return Notifications.find({userId: Meteor.userId(), read:false});
		},
	notificationCount: function(){
		return Notifications.find({userId: Meteor.userId(), read: false}).count();
		},
});

Template.notification.helpers({
	notificationPostPath: function(){
//set the routing path to the post page using the notification doc's postId
		return Router.routes.postPage.path({_id: this.postId});
		
	}
});

Template.notification.events({
	'click a': function(){
		Notifications.update(this._id, {$set: {read:true}});
		}	
});
