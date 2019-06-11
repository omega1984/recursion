// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
    var array = [];

	var helper = function(element){
	  	if(element.classList && element.classList.contains(className)){
	    	array.push(element);
	  	}
	    var i = 0;
	    while(i < element.children.length){
	      	helper(element.children[i]);
	      	i++;
	    }
	}
	helper(document.body);
	return  array;
};
