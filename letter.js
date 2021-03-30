// validate throws an error whenever one or two is invalid
function validate(one, two) {
	if(one === null || two === null) {
		throw "one or two is null";
	}

	if(typeof one != "number" || typeof two != "number") {
		throw "validate: type error";
	}

	return;
}
// numberToLetter converts a number to a letter for a case.
// 0 -> p
// 1 -> q
// 2 -> r
// then it starts opposite of the alphabet. 3 -> z and so on.
function numberToLetter(num) {
	if(num === null) {
		throw "num is null";
	}
	if(typeof num!= "number") {
		throw "numberToLetter: type error";
	}

	if(num === -1)
		return "";

	const arr = ["p", "q", "r", "s","t","u","v","w","x","y","z","o","n","m","l","k","j","i","h","g","f","e","d","c","b","a"];
	return arr[num];
}
// getBoolean returns the boolean value for the case.
function getBoolean(len, num) {
	validate(len, num);

	const index = len - num;
	const value = Math.pow(2, index);

	const half = (value / 2); // cause start from 0

	var arr = [];
	for(var i=0; i < value; i++) {
		if(i >= half) {
			arr.push(false);
		} else {
			arr.push(true);
		}
	}

	if(value == 0) {
		throw "cannot divide by zero";
	}

	for(var i=0; i < num; i++) {
		arr = arr.concat(arr);
	}

	return arr;
}

