// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  /*
  insert code for:
  index ch, next, error, value, nully, bool, number, escapes, string, array, object
  */

	var index, // current index of JSON text
    	char; // character at current index

	var next = function() {
	  	// increments at
	  	// updates ch
	  	index++;
	  	char = json.charAt(index); // json is the JSON text passed into our parser
  		return char;
	};

	var error = function() { // throw error for bad syntax
		throw undefined;
	};

	var value = function () {
	 	switch(char) {
		    case '{':
		    	return object();
		    case '[':
		      	return array();
		    case '\"':
		      	return string();
		    case 't':
		    case 'f':
		      	return bool();
		    case 'n':
		      	return nully();
		    default:
		      	if(char === '-' || (char && char >= 0 && char <= 9)) { // number
		        	return number();
		      	}else{
		    		error();
		     	}
		      	break;
	  	}
	};

	var nully = function() {
		// ch is at 'n', verify and return null
		var nully = '';
		if(char === 'n') {
		   	_.times(4, function() {
		    	nully += char;
		      	next();
		    });
		    if(nully === 'null') {
		      	return null;
		    } else {
		      	error();
		    }
		}
		error();
	};

	var bool = function() {
	  	// ch is at 't' of 'f', verify & return the boolean
	  	var bool = '';
	  	if(char === 't') {
	    	_.times(4, function() {
	      		bool += char;
	      		next();
	    	});
		    if(bool === 'true') {
		      	return true;
		    }else{
		      	error();
		    }
	  	}else if(char === 'f') {
		    _.times(5, function() {
		      	bool += char;
		      	next();
		    });
		    if(bool === 'false') {
		      	return false;
		    }else{
		      	error();
		    }
	  	}
	  	error();
	};
	var number = function() {
	  	// ch is at negative sign '-' or digit 0-9, create & return the number
	  	var number = ''; // create string and then use Number() to convert
	  	function getDigits() { // collect consecutive digits until non-digit is reached
	    	while(char && char >= 0 && char <= 9) { // need to avoid empty strings
	      		number += char;
	      		next();
	    	}
	  	}

	  	// optional - get neg sign
	  	if(char === '-') {
	    	number += char;
	    	next();
	 	}
	  	getDigits();

	  	// optional - get decimal point
	  	if(char === '.') {
	    	number += char;
	    	next();
	    	getDigits();
	  	}

	  	// optional - get exponential
	  	if(char === 'e' || char === 'E') {
	    	number += char;
	    	next();
	    // required - get sign of exponent
	    	if(char === '-' || char === '+') {
	      		number += char;
	      		next();
	    	}
	    	getDigits(); // exponent
		}

	  	if(!isNaN(Number(number))) { // check if string can be converted to number
	    	return Number(number);
	  	}else{ // string could not be converted to number
	    	error();
	  	}
	};

	var escapes = { // helper variable
		'b': '\b',
		'n': '\n',
		't': '\t',
		'r': '\r',
		'f': '\f',
		'\"': '\"',
		'\\': '\\'
	};

	var string = function() {
	  	// ch is at opening quote, create & return the string
	  	var string = '';
	  	if(char !== '\"') error();
	  		next();
	  	while(char) {
	    	// watch for end of string
	    	if(char === '\"') {
	      		next();
	      		return string;
	    	}
	    	// watch for escapes
	    	if(char === '\\') {
	      		next();
	      		if(escapes.hasOwnProperty(char)) {
	        		string += escapes[char];
	      		} else {
			        // if not a proper escape code, ignore escape and just add char
			        // NOTE: this should never be called if proper stringified JSON provided
			        string += char;
	      		}
	    	} else {
		      	// anything other than \ and " => just add character to string
		      	string += char;
	    	}
	    	next();
	  	}
		// reached end without closing quote => error
		error();
	};

	var array = function() {
	  	// ch is at opening bracket, create & return the array
	  	var array = [];
	  	if(char !== '[') error();
	  	if(next() === ']') return array; // empty array

	  	do {
	    	array.push(value());
	    	if(char === ']') { // array end reached
	      		next();
	      		return array;
	    	}
	  	} 
	  	while(char && char === ',' && next()); // found ',' => more elements to go
	  	error();
	};

	var object = function() {
	  	// ch is at opening curley brace, create & return the object
	  	var object = {};
	  	if(char !== '{') error();
	  	if(next() === '}') return object; // empty object

	  	do {
	    	var key = string(); // get key
	    	if(char !== ':') error();
	    	next();
	    	object[key] = value(); // create property with whatever value is, perhaps another object/array
	    	if(char === '}') {  // object end reached
		      	next();
		      	return object;
	    	}
	  	} 
	  	while(char && char === ',' && next()); // found ',' => more properties to go
	  	error();
	};
	index = 0;
	char = json.charAt(index);
	return value();
};
