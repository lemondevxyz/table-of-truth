// called by the main div of the app
function main() {
	return {
		equal: function(one, two) {
			return JSON.stringify(one) === JSON.stringify(two);
		},
		modal: {
			name: "",
		},
		remove: function(index) {
			const size = this.countRows();
			const self = this;

			for(var i=this.values.length-1; i >= 0; i--) {
				const val = this.values[i];

				if(val.dependsOn !== undefined && val.dependsOn.indexOf(index) !== -1) {
					self.values.splice(i, 1);
				} else {
					if(self.values[index] !== undefined) {
						self.values[index].size = size;
						self.values[index].refresh();
					}
				}
			};
			this.values.splice(index, 1);
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
				this.values.remove(index);
			} else {
				var index = this.values.indexOf(val);

				var newval = createValue(inverse, val, this.countRows());
				newval.dependsOn = [index];
				if(val.dependsOn !== undefined) {
					newval.dependsOn = newval.dependsOn.concat(val.dependsOn);
				}

				newval.refresh();
				console.log(newval);

				this.values.splice(index+1, 0, newval);
			}
		},
		values: [],
		countRows: function() {
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

			const len = this.countRows()+1;
			const newval = createValue(letter, this.countRows(), len);

			this.values.push(newval);
			for(var i=0; i < this.values.length; i++) {
				const v = this.values[i];

				v.size = len;
				v.refresh();
			}

			return;
		},
		addOperation: function(type, one, two) {
			if(type === null || one === null || two === null) {
				return;
			}

			const len = this.countRows();

			const newval = createValue(type, {one: one, two: two}, len);
			
			const oneindex = this.values.indexOf(one);
			const twoindex = this.values.indexOf(two);

			newval.dependsOn = [oneindex, twoindex];
			if(one.dependsOn !== null) {
				newval.dependsOn = newval.dependsOn.concat(one.dependsOn);
			}
			if(two.dependsOn !== null) {
				newval.dependsOn = newval.dependsOn.concat(two.dependsOn);
			}

			newval.refresh();
			this.values.push(newval);

			return;
		},
	};
}
