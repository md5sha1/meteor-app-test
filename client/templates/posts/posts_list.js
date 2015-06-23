/*Meteor looks at DOM elements and looks for a property called _uihooks to manipulate an elem before adding or removing it. Define those uihooks for smooth post transition animation */
/* 
var hooks = {
  insertElement: function(node, next) {
    //   called when Blaze intends to insert the 
    //   DOM element `node` before the element `next`
  },

  moveElement: function(node, next) {
    //   called when Blaze intends to move the 
    //   DOM element `node` before the element `next`
  },
  
  removeElement: function(node) {
    //   called when Blaze intends to remove
    //   the DOM element `node`
  }
}
//remember, DOM elems can't be moved; only can be animated by removing and inserting similar elems into the DOM. It's a 6 step process.
*/

Template.postsList.onRendered(function(){
	this.find('.wrapper')._uihooks = {

//triggers insertElement() when a new elem is added; it could also be done by adding a class of opacity 0.

		insertElement: function(node, next){
				$(node).hide().insertBefore(next).fadeIn();
				console.log(node);
				console.log(next);
		},
//trigger moveElement() during elems get sorted inbetween them
		moveElement: function(node, next){
				var $node = $(node), $next = $(next);
				var previousTop = $node.offset().top;
				var elemHeight	= $node.outerHeight(true);
				console.log(previousTop);
				console.log(elemHeight);

//check if there are more elems after the next elem
				var $inBetween = $next.nextUntil(node);
				if($inBetween.length === 0)
				    $inBetween = $node.nextUntil(next);
				
//now tigger insert elems before the next
				$node.insertBefore($next);
//measure the new top
				var newTop = $node.offset().top;
				console.log(newTop);
//to create transition effect, move the $node back to where it was before first
				$node.removeClass('animate')
					.css('top', previousTop - newTop);
//do the same for every other elem in between by pushing up(or down)
				$inBetween.removeClass('animate')
					.css('top', previousTop<newTop ? elemHeight : -1*elemHeight);
//force a redraw once all parameters defined
				$node.offset();
//reset everything to 0, animated
				$node.addClass('animate').css('top', 0);
				$inBetween.addClass('animate').css('top', 0);
		},
//triggers when an elem is removed
		removeElement : function(){
				$(node).fadeOut(function(){
				$(this).remove();
			});
		}

	}

});
