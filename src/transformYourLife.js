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

// 2. allNumbersMultipliedByThree
var numbers = [1, 2, 3, 4, 5];

var allNumbersMultipliedByThree = transform(numbers, function(value){
	console.log(value * 3)
	return value * 3;  
});

// 3. bestSentenceToUpperCase
var bestSentence = "This is the best six week course ever!";
var bestSentenceToUpperCase = transform(bestSentence, function(element){
	//console.log(element.toUpperCase());
	var answer = element.toUpperCase();
	return answer;
	;
}).join("");
console.log(bestSentenceToUpperCase);

// 4. collectedContents
var person = {name: 'Jon', greatestFear: 'fearItself'};
var collectedValues = function(value, key){
	console.log([value, key]);
	return [value, key];
}
var personValues = transform(person, collectedValues);
console.log(personValues);

// 5. multByThree
var multByThree = function(collection){
return transform (collection, function(number) {
	return number * 3;
}); 

};
console.log(multByThree([6,7,8,8,4]));


// 6. upperCase

var upperCase = function (string) {
	return transform(string, function(element){
		return element.toUpperCase();
	})
.join("")
}
console.log(upperCase("Practice makes perfect and practice makes the end."))

// 7. contentsCollection
var contentsCollection = function(object){
  return transform (object, function(element){
    return collectedContents;
  })
}
console.log(contentsCollection(person));

// 8. multByWhatever

// 9. divideByWhatever

// 10. switchCase

// 11. contentsCollector

// 13. makeArray

// 14. makeRow

// 15. makeTicTacToeBoard

// 16. setXorO 
