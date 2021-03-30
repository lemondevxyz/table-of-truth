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

		if(isOperation(type)) {
			// recursive function
			const one = this.value.one.values
			if(one === undefined || one.length === 0) {
				this.value.one.refresh();
			}

			const two = this.value.two.values;
			if(two === undefined || two.length === 0) {
				this.value.two.refresh();
			}

			this.values = [];
			for(var i=0; i < one.length; i++) {
				var v = executeOperation(type, one[i], two[i]);
				this.values.push(v);
			}

			return;
		}

		switch (type) {
			case letter:
				{
					this.values = getBoolean(this.size, this.value);

					break;
				}
			case inverse:
				{
					const len = this.value.values.length 
					this.values = [];

					for(var i=0; i < len; i++) {
						this.values[i] = !(this.value.values[i]);
					}

					break;
				}
		}
	}

	obj.string = function() {
		const type = this.type;
		if(isOperation(type)) {
			return operationToString(this.type, this.value.one.string(), this.value.two.string());
		}

		switch (type) {
			case letter:
				return numberToLetter(this.value);
			case inverse:
				if(this.value.type === letter) {
					return "\\lnot " + this.value.string();
				} else {
					return "\\lnot (" + this.value.string()+")";
				}
		}
	}

	return obj
}
