AdventOfCode.day17 = {

	part1: input => {
		let steps = parseInt(input)
		let pos = 0
		let spinlock = [0]
		for (let i = 1; i <= 2017; i++) {
			pos = (pos + steps + 1) % spinlock.length
			spinlock.splice(pos + 1, 0, i)
		}
		return spinlock[(pos + 2) % spinlock.length]
	},

	part2: input => {
		let steps = parseInt(input)
		let pos = 0
		let one = null
		for (let i = 1; i <= 5*10**7; i++) {
			pos = (pos + steps + 1) % i
			if (pos === 0) one = i
		}
		return one
	},

}
