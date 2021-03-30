const letter = 5;
const inverse = 6;

// creates a new value with methods: 
// - refresh() to create all case values
function createValue(type, value, size) {
	var obj = {
		type: type,
		value: value,
		size: size,
	}

	obj.refresh = function() {
		const type = this.type;
		switch (type) {
			case isOperation(type):
				{
					const one = getBoolean(this.size, this.value.one);
					const two = getBoolean(this.size, this.value.two);

					this.values = [];
					for(var i=0; i < one.length; i++) {
						var v;
						try {
							v = executeOperation(type, one[i], two[i]);
							this.values.push(v);
						} catch(e) {
							console.log("type is", type);
							console.log("values", e);
							break;
						}
					}

					break;
				}

			case letter:
				{
					this.values = getBoolean(this.size, this.value);

					break;
				}
			case inverse:
				{
					const len = this.value.values.length 
					for(var i=0; i < len; i++) {
						this.values = !(this.value.values[i]);
					}

					break;
				}
		}
	}

	obj.string = function() {
		const type = this.type;
		if(isOperation(type)) {
			return operationToString(this.type, this.value.one, this.value.two);
		}

		switch (type) {
			case letter:
				return numberToLetter(this.value);
			case inverse:
				return "\lnot " + this.value.string();
		}
	}

	return obj
}
