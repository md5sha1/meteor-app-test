Template.commentItem.helpers({
			submittedText: function(){
				return new Date(this.submitted).toString();
				//or, this.submitted.toString();
			}
});//pass the submitted date to the Date function and convert to readable format
