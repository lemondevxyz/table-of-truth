// dec2bin is used to debug the enum up above
function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

// merge returns a combination of one and two
function merge(one, two) {
	validate(one, two);
	return one | two;
}

// has checks if one matches two
function has(one, two) {
	validate(one, two);
	return (one & two) !== 0;
}
