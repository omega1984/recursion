// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	// if(obj === null){
 //    return "null";
 //  }
 //  if(typeof obj === "string"){
 //  return '"' + obj + '"';
 //  }

 //  if(typeof obj === "function" || typeof obj === "undefined"){
 //    return "";
 //  }
 //  if(Array.isArray(obj)){
 //    var stringArr = [];

 //    obj.forEach(function(element){
 //      stringArr.push(stringifyJSON(element));
 //    })
 //    return "[" + stringArr.toString() + "]";
 //  }

 //  if(typeof obj === "object"){
 //  var stringObj = "";
 //  var objKeys = Object.keys(obj);
 //  objKeys.forEach(function(k){
 //    if(typeof k === "function" || typeof k === "undefined" || typeof obj[k] === "function" || typeof obj[k] === "undefined"){
 //      return "";
 //    }
 //    else{stringObj += stringifyJSON(k) + ':' + stringifyJSON(obj[k]) + ',';
 //    }
 //  })
 //  return "{" + stringObj.slice(0, stringObj.length - 1) + "}"
 //  }

 //  return obj.toString();
	var result = '';

  	// If obj is an array
  	if (Array.isArray(obj)) {
    	result += '[';
    	for (var i = 0; i < obj.length; i++) {
      		result += stringifyJSON(obj[i]);
      		if (i + 1 < obj.length) {
        		result += ',';
      		}
    	}
    	result += ']';
  	// Else if obj is an object
  	} else if (obj && typeof obj === 'object') {
	    result += '{';
	    for (var key in obj) {
      		if (obj[key] !== undefined && typeof obj[key] !== 'function') {
        		result += '"' + key + '":';
        		result += stringifyJSON(obj[key]) + ',';
      		}
    	}
    	if (result.charAt(result.length - 1) === ',') {
      		result = result.slice(0, result.length - 1);
    	}
    	result += '}';
  	// Else if obj is a boolean
  	} else if (typeof obj === 'boolean') {
    	if (obj) {
      		result +='true';
    	} else {
      		result += 'false';
    	}
  	// Else if obj is a string
  	} else if (typeof obj === 'string') {
    	result += '"' + obj + '"';
  	// Else if obj is a number
  	} else if (typeof obj === 'number') {
    	result += obj.toString();
  	// Else if obj is undefined
  	} else if (obj === undefined) {
    	return 'undefined';
  	// Else if obj is null
  	} else if (obj === null) {
    	return 'null';
  	}

  	// Return result
  	return result;
};
