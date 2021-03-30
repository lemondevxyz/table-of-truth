// called by the main div of the app
function main() {
	return {
		equal: function(one, two) {
			return JSON.stringify(one) === JSON.stringify(two);
		},
		modal: {
			name: "",
		},
		values: [],
		allLetters: function() {
			var count = 0;
			const values = this.values;

			for(var i=0; i < values.length; i++) {
				var v = this.values[i];
				if(v.type === letter) {
					count++;
				}
			}

			return count;
		},
		addLetter: function() {

			const len = this.allLetters()+1;
			const newval = createValue(letter, this.allLetters(), len);

			this.values.push(newval);
			this.values.forEach(function(val) {
				val.size = len;
				val.refresh();
			})

			return;
		},
		addOperation: function(type, one, two) {
			if(type === null || one === null || two === null) {
				return;
			}

			const len = this.allLetters();

			const newval = createValue(type, {one: one.value, two: two.value}, len);
			newval.refresh();

			this.values.push(newval);
			console.log(newval.string());

			return;
		},
	};
}
