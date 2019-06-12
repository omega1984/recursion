// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  /*
  insert code for:
  at, ch, next, error, value, nully, bool, number, escapes, string, array, object
  */

	var index, // current index of JSON text
    	ch; // character at current index

	var next = function() {
	  	// increments at
	  	// updates ch
	  	index++;
	  	ch = json.charAt(index); // json is the JSON text passed into our parser
  		return ch;
	};

	var error = function() { // throw error for bad syntax
  		throw undefined;
	};

	var value = function () {
	 	switch(ch) {
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
		      if(ch === '-' || (ch && ch >= 0 && ch <= 9)) { // number
		        return number();
		      } else {
		    	error();
		      }
		      break;
	  	}
	};

	var nully = function() {
		// ch is at 'n', verify and return null
		var nully = '';
		if(ch === 'n') {
		   	_.times(4, function() {
		    	nully += ch;
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
	  	if(ch === 't') {
	    	_.times(4, function() {
	      		bool += ch;
	      		next();
	    	});
		    if(bool === 'true') {
		      	return true;
		    }else{
		      	error();
		    }
	  	}else if(ch === 'f') {
		    _.times(5, function() {
		      bool += ch;
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
	    	while(ch && ch >= 0 && ch <= 9) { // need to avoid empty strings
	      		number += ch;
	      		next();
	    	}
	  	}

	  	// optional - get neg sign
	  	if(ch === '-') {
	    	number += ch;
	    	next();
	 	}
	  	getDigits();

	  	// optional - get decimal point
	  	if(ch === '.') {
	    	number += ch;
	    	next();
	    	getDigits();
	  	}

	  	// optional - get exponential
	  	if(ch === 'e' || ch === 'E') {
	    	number += ch;
	    	next();
	    // required - get sign of exponent
	    	if(ch === '-' || ch === '+') {
	      		number += ch;
	      		next();
	    	}
	    	getDigits(); // exponent
		}

	  	if(!isNaN(Number(number))) { // check if string can be converted to number
	    	return Number(number);
	  	} else { // string could not be converted to number
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
	  	if(ch !== '\"') error();
	  		next();
	  	while(ch) {
	    	// watch for end of string
	    	if(ch === '\"') {
	      		next();
	      		return string;
	    	}
	    	// watch for escapes
	    	if(ch === '\\') {
	      		next();
	      		if(escapes.hasOwnProperty(ch)) {
	        		string += escapes[ch];
	      		} else {
			        // if not a proper escape code, ignore escape and just add char
			        // NOTE: this should never be called if proper stringified JSON provided
			        string += ch;
	      		}
	    	} else {
		      	// anything other than \ and " => just add character to string
		      	string += ch;
	    	}
	    	next();
	  	}
		// reached end without closing quote => error
		error();
	};

	var array = function() {
	  	// ch is at opening bracket, create & return the array
	  	var array = [];
	  	if(ch !== '[') error();
	  	if(next() === ']') return array; // empty array

	  	do {
	    	array.push(value());
	    	if(ch === ']') { // array end reached
	      		next();
	      		return array;
	    	}
	  	} 
	  	while(ch && ch === ',' && next()); // found ',' => more elements to go
	  	error();
	};

	var object = function() {
	  	// ch is at opening curley brace, create & return the object
	  	var object = {};
	  	if(ch !== '{') error();
	  	if(next() === '}') return object; // empty object

	  	do {
	    	var key = string(); // get key
	    	if(ch !== ':') error();
	    	next();
	    	object[key] = value(); // create property with whatever value is, perhaps another object/array
	    	if(ch === '}') {  // object end reached
		      	next();
		      	return object;
	    	}
	  	} 
	  	while(ch && ch === ',' && next()); // found ',' => more properties to go
	  	error();
	};
	index = 0;
	ch = json.charAt(index);
	return value();
};
