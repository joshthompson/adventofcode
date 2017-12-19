AdventOfCode.day16 = {

	routine: (dancers, moves) => {
		dancers = dancers.split('')
		let swap
		let tmp
		moves.split(',').forEach(move => {
			switch (move[0]) {
				case 's': // Spin
					dancers = dancers.splice(-parseInt(move.substr(1))).concat(dancers)
					break
				case 'x': // Exchange
					swap = move.substr(1).split('/').map(i => parseInt(i))
					tmp = dancers[swap[0]]
					dancers[swap[0]] = dancers[swap[1]]
					dancers[swap[1]] = tmp
					break
				case 'p': // Partner
					swap = move.substr(1).split('/').map(i => dancers.indexOf(i))
					tmp = dancers[swap[0]]
					dancers[swap[0]] = dancers[swap[1]]
					dancers[swap[1]] = tmp
					break
			}
		})
		return dancers.join('')
	},

	part1: input => AdventOfCode.day16.routine('abcdefghijklmnop', input),

	part2: input => {
		let states = ['abcdefghijklmnop']
		for (let n = 0; n < 10**9; n++) {
			let state = AdventOfCode.day16.routine(states[states.length - 1], input)
			let repeat = states.indexOf(state)
			if (repeat !== -1) return states[repeat + (10**9 - n - 1) % (n - repeat + 1)]
			states.push(state)
		}
		return states[states.length - 1]
	}

}
