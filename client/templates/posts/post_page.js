Template.postPage.helpers({
		comments: function() {
			return Comments.find({ postId: this._id});
	}
});

//DEBUG template render counts; log number of times each template is rendered. It helps to find out why a template is RE-RENDERED after initial page load --maincause is the change in data source change the template depends on.

function logRenders(){
		_.each(Template, function(template, name){
				var oldRender = template.rendered;
				var counter = 0;

		template.rendered = function(){
				console.log(name, "render count: ", ++count);
	//if a template is rendered, apply this function w/function args
				oldRender && oldRender.apply(this, arguments);
			};
		});
}
