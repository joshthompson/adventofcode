AdventOfCode.day03 = {

	part1: input => {
		let x = 0, y = 0
		let houses = {}
		let gift = () => houses[x+','+y] = houses[x+','+y] ? houses[x+','+y] + 1 : 1
		gift()
		input.split('').forEach(cmd => {
			if (cmd === '>') x++
			else if (cmd === '<') x--
			else if (cmd === 'v') y++
			else if (cmd === '^') y--
			gift()
		})
		return Object.keys(houses).length
	},

	part2: input => {
		let sx = 0, sy = 0, rx = 0, ry = 0
		let houses = {'0,0': 1}
		let gift = (x, y) => houses[x+','+y] = houses[x+','+y] ? houses[x+','+y] + 1 : 1
		input.split('').forEach((cmd, i) => {
			if (cmd === '>')      i%2 ? sx++ : rx++
			else if (cmd === '<') i%2 ? sx-- : rx--
			else if (cmd === 'v') i%2 ? sy++ : ry++
			else if (cmd === '^') i%2 ? sy-- : ry--
			gift(i%2 ? sx : rx, i%2 ? sy : ry)
		})
		return Object.keys(houses).length
	}

}
