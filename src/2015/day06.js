AdventOfCode.day06 = {

	on: (lights, x1, y1, x2, y2) => {
		for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) lights[x][y] = 1
	},

	off: (lights, x1, y1, x2, y2) => {
		for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) lights[x][y] = 0
	},

	toggle: (lights, x1, y1, x2, y2) => {
		for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) lights[x][y] = 1 - lights[x][y]
	},

	add: (lights, x1, y1, x2, y2, add) => {
		for (let x = x1; x <= x2; x++) for (let y = y1; y <= y2; y++) lights[x][y] = Math.max(0, lights[x][y] + add)
	},

	getLights: () => {
		let lights = []
		for (let x = 0; x < 1000; x++) {
			lights.push([])
			for (let y = 0; y < 1000; y++) lights[x].push(0)
		}
		return lights
	},

	part1: input => {
		let day06 = AdventOfCode.day06
		let lights = day06.getLights()
		input.split('\n').forEach(l => {
			l = l.split(' ')
			l[l.length - 1] = l[l.length - 1].split(',').map(i => parseInt(i))
			l[l.length - 3] = l[l.length - 3].split(',').map(i => parseInt(i))
			if (l[0] === 'toggle') day06[l[0]](lights, l[1][0], l[1][1], l[3][0], l[3][1])
			if (l[0] === 'turn') day06[l[1]](lights, l[2][0], l[2][1], l[4][0], l[4][1])
		})
		return lights.map(a => a.reduce((a, b) => a + b)).reduce((a, b) => a + b)
	},

	part2: input => {
		let day06 = AdventOfCode.day06
		let lights = day06.getLights()
		input.split('\n').forEach(l => {
			l = l.split(' ')
			l[l.length - 1] = l[l.length - 1].split(',').map(i => parseInt(i))
			l[l.length - 3] = l[l.length - 3].split(',').map(i => parseInt(i))
			if (l[0] === 'toggle') day06.add(lights, l[1][0], l[1][1], l[3][0], l[3][1], 2)
			if (l[0] === 'turn') day06.add(lights, l[2][0], l[2][1], l[4][0], l[4][1], l[1] === 'on' ? 1 : -1)
		})
		return lights.map(a => a.reduce((a, b) => a + b)).reduce((a, b) => a + b)
	}

}
