// called by the main div of the app
function main() {
	return {
		equal: function(one, two) {
			return JSON.stringify(one) === JSON.stringify(two);
		},
		modal: {
			name: "",
		},
		toggleInverse: function(val) {
			var index = -1;
			if(val.type === inverse) {
				index = this.values.indexOf(val);
				this.values.splice(index, 1);

				return;
			}

			for(var i=0; i < this.values.length; i++) {
				var v = this.values[i];
				if(v.type === inverse && v.value === val) {
					//console.log(v.value, val)
					index = i;
					break;
				}
			}
			if(index >= 0) {
				// remove it
				this.values.splice(index, 1);
			} else {
				var index = this.values.indexOf(val);

				var newval = createValue(inverse, val, this.allLetters());
				newval.refresh();
				console.log(newval);

				this.values.splice(index+1, 0, newval);
			}
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

			const newval = createValue(type, {one: one, two: two}, len);
			newval.refresh();
			//console.log(newval);
			this.values.push(newval);

			return;
		},
	};
}
