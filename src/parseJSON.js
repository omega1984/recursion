// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
	var index = 0;
  	var character = ' ';

 	// return the character at index
  	var next = function(ch) {
	    if (ch && ch !== character ){
	    	throw new SyntaxError("Expected '" + ch + "' instead of '" + character + "'");
	    }
    	character = json.charAt(index);
    	index++;
    	return character;
  	};

  	// helper function to ignore spaces and any unwanted char
  	var whitespace = function() {
  		// while there is a char and char code is less than or equal to 32(char code of space)
  		// we move to the next char
    	while (character && character <= ' '){
      		next();
    	}
  	};

  	// parse a string value
  	var parseString = function() {
    	var str = "";
    	var exception = {
	      	'"'  : '"',
	      	'\\' : '\\',
	      	'/'  : '/',
	      	b    : '\b',
	      	f    : '\f',
	      	n    : '\n',
	      	r    : '\r',
	      	t    : '\t'
    	};

	    if(character === '"'){
	      	while(next()){
		        if (character === '"'){
		        	// check whether current index char is the same as the one passed in
		          	next('"');
		          	return str;
		        } else if (character === '\\'){
		          	next();
		          	if (exception[character]){
		            	str += exception[character];
		          	} else {
		            	break;
		          	}
		        } else {
		        	str += character;
		        }
	      	}
	    }
	    // throw an error because no closing quotation mark detected
	    throw new SyntaxError('Bad string');
  	};

  	// parse a number value
  	var parseNumber = function() {
    	var str = "";
    	var number;

	    if (character === '-'){
	      	str += '-';
	      	next();
	    }

	    while (character >= '0' && character <= '9'){
	      	str += character;
	      	next();
	    }

	    if (character === '.'){
	      	str += character;
	      	while (next() && character >= '0' && character <= '9'){
	        	str += character;
	      	}
	    }

    	number = Number(str);

	    if (isNaN(number)) {
	      	throw new SyntaxError("Bad number");
	    } else {
	      	return number;
	    }
  	};

  	// parse an array value
  	var parseArray = function() {
	    var arr = [];
	    if (character === '['){
	      	next();
	      	whitespace();
	      	if (character === ']'){
	        	next();
	        	return arr;
	      	}
	      	while (character){
	        	arr.push(parseValue());
	        	whitespace();
	        	if(character === ']'){
	          		next();
	          		return arr;
	        	}
	        	next();
	        	whitespace();
	      	}
	    }
	    throw new SyntaxError('Bad array');
  	};

  	// parse an object value
  	var parseObject = function() {
    	var obj = {};

	    if (character === '{'){
	      	next();
	      	whitespace();
	      	if (character === '}'){
	        	next();
	        	return obj;
	      	}
	       	while (character){
	       		// keys can only be strings
	        	var key = parseString();
	        	whitespace();
	        	next(':');
	        	// values can be anything: number string array or obj
	        	var value = parseValue();
	        	obj[key] = value;
	        	whitespace();
	        	if (character === '}'){
	          		next();
	          		return obj;
	        	}
	        	next(',');
	        	whitespace();
	      	}
	    }
	    throw new SyntaxError('Bad object');
  	};

  	// parse a special char
  	var parseSpecial = function() {
	    if (character === 't'){
	      	next('t');
	      	next('r');
	      	next('u');
	      	next('e');
	      	return true;
	    }
	    if (character === 'f'){
	      	next('f');
	      	next('a');
	      	next('l');
	      	next('s');
	      	next('e');
	      	return false;
	    }
	    if (character === 'n'){
	      	next('n');
	      	next('u');
	      	next('l');
	      	next('l');
	      	return null;
	    }
  	};

  	// a list of parse functions
  	var parseValue = function() {
    	whitespace();
    	if (character === '"'){
      		return parseString();
    	} else if (character === '-' || character >= '0' && character <= '9'){
      		return parseNumber();
    	} else if (character === '[') {
      		return parseArray();
    	} else if (character === '{') {
      		return parseObject();
    	} else {
      		return parseSpecial();
    	}
  	};

  	return parseValue();
};
