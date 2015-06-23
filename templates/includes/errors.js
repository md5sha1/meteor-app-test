Template.errors.helpers({
//return the error message to the template
	errors: function(){
		return Errors.find();
		}
});
//use onRendered method to add a callback function to setTimout on the error message for the error doc to be removed from the local collection after 3000ms

Template.error.onRendered(function(){
	var error = this.data; //capture the error doc by the {message} data from error obj
				//remove the error doc after 3 secs
	Meteor.setTimeout(function(){
			Errors.remove(error._id);
			}, 3000);
}); 
//Errors.findOne() returns undefined on browser console after 3secs.
//if error doc not removed from the local collection, it will show up when the app loads; meteor renders all local data on app startup
