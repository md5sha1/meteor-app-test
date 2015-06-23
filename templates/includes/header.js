Template.header.helpers({
		activeRouteClass: function(/*route names as args*/){
				var args = Array.prototype.slice.call(arguments, 0);
					//pop-out the last elem from the args array, it's a # from Handlebars
				args.pop();
					//return active names only from args array
				var active = _.any(args, function(name){
					return Router.current() && Router.current().route.getName() === name;
					}); //checks if current path equals to corresponding named path
				console.log(active);// boolean true or false
				return active && 'active'; //true && 'String' returns String in JS; so in template, it will show class="active" for Latest link in the homepage
			}
		});
