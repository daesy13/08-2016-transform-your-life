var loop = function(collection, callback){

  if (Array.isArray(collection)){
    for (var i = 0; i < collection.length; i++){
      callback(collection[i], i);
    }
  } else if (typeof collection === 'object'){
    for (var key in collection){
      callback(collection[key], key);
    }
  }
  else {
  	for (var i = 0; i < collection.length; i++){
  		callback(collection[i],i);
  	}
  }
};


// 1. Build transform.
var transform = function(collection, callback){
	var results = [];
	loop(collection, function(element, key){
		results.push(callback(element, key))
	});
	return results;
};
console.log("1. transform: ", transform);

// 2. allNumbersMultipliedByThree
var numbers = [1, 2, 3, 4, 5];

var allNumbersMultipliedByThree = transform(numbers, function(value){
	return value * 3;  
});
console.log("2. MultipliedByThree: ", allNumbersMultipliedByThree);

// 3. bestSentenceToUpperCase
var bestSentence = "This is the best six week course ever!";

var bestSentenceToUpperCase = transform(bestSentence, function(element){
	var answer = element.toUpperCase();
	return answer;
	;
}).join("");

console.log("3. Upper Case: ", bestSentenceToUpperCase);

// 4. collectedContents
var person = {name: 'Jon', greatestFear: 'fearItself'};

var collectedContents = transform(person, function(value, key){
	return [key, value];
});
console.log("4. Collected Contents: ",  collectedContents)

// var collectedValues = function(value, key){
// 	//console.log([value, key]);
// 	return [value, key];
// }
// var personValues = transform(person, collectedValues);
// console.log(personValues);

// 5. multByThree
var multByThree = function(collection){
return transform (collection, function(number) {
	return number * 3;
}); 

};
console.log("5. MultByThree: ", multByThree([6,7,8,8,4]));


// 6. upperCase

var upperCase = function (string) {
	var splitString = string.split(" ");
	return transform(splitString, function(word){
		return word.toUpperCase();
	}).join(" ")
}
console.log("6. UpperCase: ", upperCase(bestSentence))

// 7. contentsCollection
var contentsCollection = function(object){
  var results = [];
  var nested = transform(object,function(value, key){
  	return [key,value];
  });
  loop(nested, function(innerArray){
  	var nestedArrays = innerArray;
  	loop(nestedArrays, function(valueInArray){
  		results.push(valueInArray);
  	})
  })
  return results;
}
console.log("7. ContestsCollection: ",contentsCollection(person));

// 8. multByWhatever
var multByWhatever = function(collection, mult){
	return transform(collection, function(number){
		return number * mult
	});
};
console.log("8. MultByWhatever: ", multByWhatever(numbers,5));

// 9. divideByWhatever
var divideByWhatever = function(collection, div){
	return transform(collection, function(number){
		return number / div;
	})
}
var bigNumbers = [10, 20, 30, 40, 50];
console.log("9. DivideByWhatever: ", divideByWhatever(bigNumbers, 5));

// 10. switchCase
var switchCase = function(sentence, switchCase){
	var newStr = sentence.split(" ");
	return transform(newStr, function(word){
		if (switchCase === 'lower'){
			return word.toLowerCase();
		}
		else if (switchCase === "upper"){
			return word.toUpperCase();
		}
	}).join(" ");
};

var bestSentence = "This is the best six week course ever!";
var bestSentenceUpper = switchCase(bestSentence, 'upper');
console.log("10. upper: ", bestSentenceUpper) // "THIS IS THE BEST 6 WEEK COURSE EVER!";

var bestSentenceLower = switchCase(bestSentenceUpper, 'lower');
console.log("10. lower: ", bestSentenceLower) // "this is the best 6 week course ever!";

// 11. contentsCollector
var contentsCollector = function(object, specifier){
	specifier = specifier || null

	return transform(object, function(value, key){
		if (specifier === 'keys'){
			return key;
		}
		else if (specifier === 'values'){
			return value;
		}
		else if (specifier === null){ 
			return [key,value];
		}
	})
}

var person = {name: 'Jon', greatestFear: 'fearItself'};
var allKeysInPerson = contentsCollector(person, 'keys');
console.log("11. keys: ", allKeysInPerson) // ['name', 'greatestFear'];

var allValuesInPerson = contentsCollector(person, 'values');
console.log("11. value: ", allValuesInPerson)  // ['Jon', 'fearItself'];

var keysAndValuesInPerson = contentsCollector(person);
console.log("11. keys and values: ", keysAndValuesInPerson) // ['name', 'Jon', 'greatestFear', 'fearItself'];

// 13. makeArray
// makeArray` takes a `number` as a parameter and returns an array starting at the integer 0 up until that number.

// Use loop to achieve this functionality
var makeArray = function(num){
	if (num === 0){
			return [];
		}
	var results = [0];
	loop(results, function(element){
		
		if (results.length < num){
			results.push(element + 1)
		}
	});
	return results;
}

var arrayWith5Elements = makeArray(5);
console.log("13. Array with 5: ",arrayWith5Elements) // [0, 1, 2, 3, 4];
console.log("13. Array with 0: ", makeArray(0));

// 14. makeRow

var makeRow = function(row){
	return transform(row, function(element){
		return element = {
			state: null
		};
	});
};

	var newRow = makeRow(makeArray(4));
	console.log("14. Make Row: ", newRow) // [{state: null}, {state: null}, {state: null}, {state: null}];


// 15. makeTicTacToeBoard
// `makeTicTacToeBoard` takes a `number` as a parameter and creates a matrix that contains as many rows and columns as the number specifies.

// Use your `makeArray` function to solve this 

var makeTicTacToeBoard = function(num){
	var results = [makeRow(makeArray(num))];
	loop(results, function(elem){
		if(results.length < num){
			results.push(makeRow(makeArray(num)))
		}
	})
	return results;
}	

	var myTicTacToeBoard = makeTicTacToeBoard(3);
	console.log("15. Tic Tac Toe: ", myTicTacToeBoard);

// 15.5.

var gameCreator = function(board){
	var gameObject = {
		count: 0,
		gameBoard: board
	};
	return gameObject;
}
var gameOne = gameCreator(makeTicTacToeBoard(3));
console.log("15.5. Game Creator: ", gameOne);

// 16. setXorO 
var setXorO = function(gameObj, arr){
	var rowInd = arr[0];
	var columnInd = arr[1];
	var pointer = gameObj.gameBoard[rowInd][columnInd];

	if(pointer.state === null){
		if(gameObj.count === 0 || gameObj.count % 2 === 0){
			pointer.state = 'x';
			gameObj.count++;
		}
		else if(gameObj.count % 2 !== 0){
			pointer.state = 'o';
			gameObj.count++;
		}
	}
}

	 var myTicTacToeBoard = makeTicTacToeBoard(3);
	 var gameOne = gameCreator(myTicTacToeBoard);

	 setXorO(gameOne, [0, 0]);

	 setXorO(gameOne, [0, 1]);

     console.log(gameOne.gameBoard);

