// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
    var array = [];

	var helper = function(data){
	  	if(data.classList && data.classList.contains(className)){
	    	array.push(data);
	  	}
	    var i = 0;
	    while(i < data.children.length){
	      	helper(data.children[i]);
	      	i+=1;
	    }
	}
	helper(document.body);
	return  array;
};
