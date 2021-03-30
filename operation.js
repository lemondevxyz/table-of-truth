// no enum lamo
const and = 1; // P ^ q
const or = 2; // P v q
const arrow = 3; // P -> q
const biarrow = 4; // P <-> q
// isOperation returns true if the type belongs to an operation
function isOperation(type) {
	return type === and || type === or || type === arrow || type === biarrow;
}
// Remember: order of operations: not, and, or, forward arrow
function executeOperation(type, one, two) {
	if(type === null || one === null || two === null) {
		throw "bad parameters";
	}

	if(typeof type !== "number" || typeof one !== "boolean" || typeof two !== "boolean") {
		throw "bad type parameters";
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

	throw "bad type not (and, or, arrow, biarrow)";
}
// operationtoString returns a string from an operation.
// where type is the operation type
// and one and two are strings
function operationToString(type, one, two) {
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
	} else if(type === not) {
		char = "\\neg";
		two = one;
		one = -1;
	}

	char = " " + char + " ";

	return one+char+two;
}
