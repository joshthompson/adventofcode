AdventOfCode.day09 = {

	part1: input => AdventOfCode.day09.process(input).score,

	part2: input => AdventOfCode.day09.process(input).garbageLength,

	process: input => {
		let groups = []
		let stream = {
			parent: null,
			score: 0,
			groups: []
		}
		let garbage = false
		let garbageLength = 0
		let ignoreNext = false
		let current = stream
		input.split('').forEach(char => {
			if (ignoreNext) {
				ignoreNext = false
			} else if (char === '!') {
				ignoreNext = true
			} else if (garbage) {
				switch (char) {
					case '>':
						garbage = false
						break
					default:
						garbageLength++
						break
				}
			} else {
				switch (char) {
					case '{':
						let group = {
							parent: current,
							score: current.score + 1,
							groups: []
						}
						current.groups.push(group)
						groups.push(group)
						current = group
						break
					case '}':
						current = current.parent
						break
					case '<':
						garbage = true
						break
				}
				
			}
		})

		let score = groups.map(g => g.score).reduce((a, b) => a + b)
		return {score: score, garbageLength: garbageLength}
	}

}