//create a local Error collection on the client-side by passing 'null' to prevent creating the collection in the server db.

Errors = new Meteor.Collection(null); 

//throwError() throws message and adds to the Error collection
throwError = function(message){
			Errors.insert({message: message});
		};
