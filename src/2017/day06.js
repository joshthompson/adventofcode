AdventOfCode.day06 = {

	part1: input => AdventOfCode.day06.process(input).steps,

	part2: input => AdventOfCode.day06.process(input).diff,

	process: input => {
		let bank = input.split('\t').map(i => parseInt(i))
		let tracking = {}
		let remember = () => tracking[bank.join()] ? false : tracking[bank.join()] = steps
		let steps = 0

		while (remember() !== false) {
			let highest = Math.max.apply(null, bank)
			let index = bank.indexOf(highest)
			let value = bank[index]
			bank[index] = 0
			for (let i = 1; i <= value; i++) {
				bank[(index + i) % bank.length]++
			}
			steps++
		}
		let diff = steps - tracking[bank.join()]
		return {diff: diff, steps: steps}
	}

}