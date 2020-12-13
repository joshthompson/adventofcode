const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const wires = data.toString().split('\n').filter(line => line.length).map(wire => wire.split(','))
	const results = processWires(wires)
	console.log('Part 1', results.closest)
	console.log('Part 2', results.quickest)
})

function processWires(wires) {
	let grid = [[]]
	let closest = 999999
	let quickest = 999999
	wires.forEach((wire, id) => {
		let x = 0
		let y = 0
		let t = 0
		grid[x][y] = id
		wire.forEach(w => {
			const direction = w[0]
			const distance = parseInt(w.substr(1))
			for (let i = 0; i < distance; i++) {
				t++
				if (direction === 'R') x++
				else if (direction === 'L') x--
				else if (direction === 'D') y++
				else if (direction === 'U') y--
				const v = set(grid, x, y, id, t)
				if (v.intersect && Math.abs(x) + Math.abs(y) < closest) {
					closest = Math.abs(x) + Math.abs(y)
				}
				if (v.intersect && v.totalTime < quickest) {
					quickest = v.totalTime
				}
			}
		})
	})
	grid[0][0] = '*'
	return { closest, quickest }
}

function get(grid, x, y) {
	if (grid[x] === undefined) {
		grid[x] = []
	}
	if (grid[x][y] === undefined) {
		grid[x][y] = null
	}
	return grid[x][y]
}

function set(grid, x, y, id, time) {
	const v = get(grid, x, y)
	if (v === null) {
		grid[x][y] = {
			wires: [{ id, time }],
			intersect: false,
			totalTime: time
		}
	} else if (!v.wires.find(w => w.id === id)) {
		grid[x][y].wires.push({ id, time })
		grid[x][y].intersect = true
		grid[x][y].totalTime += time
	}
	return grid[x][y]
}
