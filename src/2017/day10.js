AdventOfCode.day10 = {

	part1: input => {
		let lengths = input.split(',').map(i => parseInt(i))
		let list = AdventOfCode.day10.process(lengths, 1)
		return list[0] * list[1]
	},
	
	part2: (input, rounds) => {
		let lengths = input.split('').map(c => c.charCodeAt(0)).concat(17, 31, 73, 47, 23)
		let list = AdventOfCode.day10.process(lengths, rounds ? rounds : 64)
		let dense = []
		while (list.length) dense.push(list.splice(0, 16).reduce((a, b) => a ^ b))
		return dense.map(x => x.toString(16)).map(x => x.length === 1 ? '0' + x : x).join('')
	},

	process: (lengths, rounds) => {
		let list = []
		let size = 256
		for (var i = 0; i < size; i++) list.push(i)
		let skip = 0
		let pos = 0
		for (let round = 0; round < rounds; round++) {
			lengths.forEach(length => {
				let before = list.splice(0, pos)
				let section = list.splice(0, length)
				let after = list
				let wrap = length - section.length
				if (wrap > 0) section = section.concat(before.splice(0, wrap))
				section.reverse()
				list = before.concat(section, after)
				if (wrap > 0) list = list.splice(-wrap).concat(list)
				pos = (pos + length + skip) % list.length
				skip++
			})
		}
		return list
	}

}

AdventOfCode.knotHash = (input, rounds) => AdventOfCode.day10.part2(input, rounds) // For use in other days tasks