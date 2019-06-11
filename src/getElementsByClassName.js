// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
	var result = [];
	function findElementsWithClassName(element){
		if (element.classList && element.classList.contains(className)){
			result.push(element);
		}
		if (element.childNodes){
			element.childNodes.forEach(function(node){
				findElementsWithClassName(node);
			});
		}
	}
	findElementsWithClassName(document.body);
	return result;

 //    var array = [];

	// var helper = function(element){
	//   	if(element.classList && element.classList.contains(className)){
	//     	array.push(element);
	//   	}
	//     var i = 0;
	//     while(i < element.children.length){
	//       	helper(element.children[i]);
	//       	i++;
	//     }
	// }
	// helper(document.body);
	// return  array;
	// var result = [];

 //  	searchForChildNodes = function (parentNode, result, className) {
	//     var currentLayer = parentNode.childNodes;
	//     for (var i = 0; i < currentLayer.length; i++) {
	//       var classList = currentLayer[i].classList;
	//       if (classList && classList.contains(className)) {
	//         result.push(currentLayer[i]);
	//       }
	//       if (currentLayer[i].childNodes.length) {
	//         searchForChildNodes(currentLayer[i], result, className)
	//       }
	//     }

 //  	}
	// searchForChildNodes(document, result, className);
	// return result;
};
