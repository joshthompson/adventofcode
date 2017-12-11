AdventOfCode.day02 = {

	part1: input => {
		return input.split('\n').map((line) => {
			let values = line.split('\t').map(i => parseInt(i))
			let min = Math.min.apply(Math, values)
			let max = Math.max.apply(Math, values)
			return max - min
		}).reduce((a, b) => a + b, 0)
	},

	part2: input => {
		return input.split('\n').map((line) => {
			let values = line.split('\t').map(i => parseInt(i))
			let divided_value = false
			values.forEach((a, i) => {
				values.forEach((b, j) => {
					if (i !== j) {
						let min = Math.min(a, b)
						let max = Math.max(a, b)
						if (max / min === Math.round(max / min)) {
							return divided_value = max / min
						}
					}
				})
				if (divided_value) return divided_value
			})
			if (divided_value) return divided_value
		}).reduce((a, b) => a + b, 0)
	}

}