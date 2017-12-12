AdventOfCode.day01 = {

	part1: input => {
		let up = input.replace(/\)/g, '').length
		let down = input.replace(/\(/g, '').length
		return up - down
	},

	part2: input => {
		let floor = 0
		let cmds = input.split('')
		for (let i = 0; i < cmds.length; i++) {
			floor += cmds[i] === '(' ? 1 : -1
			if (floor === -1) return i + 1
		}
	}

}
