// no enum lamo
// 0001
const and = 0x0001; // P ^ q
// 0010
const or = 2; // P v q
// 0100
const arrow = 4; // P -> q
// 1000
const biarrow = 8; // P <-> q

// Remember: order of operations: not, and, or, forward arrow
function executeOperation(type, one, two) {
	if(type === null || one === null || two === null) {
		throw "bad parameters";
	}

	if(typeof type !== "number" || typeof one !== "boolean" || typeof two !== "boolean") {
		throw TypeError;
	}

	if(type === and) {
		return one && two;
	}
	if(type === or) {
		return one || two;
	}
	if(type === arrow) {
		if(one && !two) {
			return false;
		}

		return true;
	}
	if(type === biarrow) {
		if(one === two) {
			return true;
		}

		return false;
	}
}
// operationtoString returns a string from an operation.
function operationToString(type, one, two) {
	validate(one, two);

	if(type === null || typeof type != 'number') {
		throw "type is null or has bad type";
	}

	var char = "";
	if(type === and) {
		char = "\\land";
	} else if(type === or) {
		char = "\\lor";
	} else if(type === arrow) {
		char = "\\rightarrow";
	} else if(type === biarrow) {
		char = "\\leftrightarrow";
	}

	char = " " + char + " ";

	return "$"+numberToLetter(one)+char+numberToLetter(two)+"$";
}
