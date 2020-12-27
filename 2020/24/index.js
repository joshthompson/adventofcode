const fs = require('fs')

const WHITE = '.'
const BLACK = '#'

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const lines = data.toString().split('\n').filter(line => line.length).map(mapLine)
	console.log('Part 1', blackTiles(setupGrid(lines)))
	console.log('Part 2', runDays(lines))
})

function mapLine(line) {
	const out = []
	for (let i = 0; i < line.length; i++) {
		if (['e', 'w'].includes(line[i])) out.push(line[i])
		if (['n', 's'].includes(line[i])) out.push(line[i] + line[++i])
	}
	return out
}

function runDays(lines, days = 100) {
	const grid = setupGrid(lines)
	for (let i = 0; i < days; i++) {
		const flips = []
		const { minX, maxX, minY, maxY } = bounds(grid)
		for (let y = minY - 1; y <= maxY + 1; y++) {
			for (let x = minX - 1; x <= maxX + 1; x++) {
				const adjacent = adjacentBlack(grid, x, y)
				if (grid[`${x},${y}`] === BLACK && (adjacent === 0 || adjacent > 2)) flips.push(`${x},${y}`)
				if (grid[`${x},${y}`] !== BLACK && adjacent === 2) flips.push(`${x},${y}`)
			}
		}
		flips.forEach(f => flip(grid, f))
	}
	return blackTiles(grid)
}

function setupGrid(lines) {
	let grid = {}
	lines.forEach(line => {
		let x = 0
		let y = 0
		line.forEach(instruction => {
			switch (instruction) {
				case 'ne': y--; break
				case 'nw': y--; x--; break
				case 'w': x--; break
				case 'e': x++; break
				case 'se': y++; x++; break
				case 'sw': y++; break
			}
		})
		flip(grid, `${x},${y}`)
	})
	return grid
}

function blackTiles(grid) {
	return Object.values(grid).filter(cell => cell === BLACK).length
}

function bounds(grid) {
	let xValues = Object.keys(grid).filter(key => grid[key] === BLACK).map(c => Number(c.split(',')[0])).sort((a, b) => a - b, 0)
	let minX = xValues[0]
	let maxX = xValues[xValues.length - 1]
	let yValues = Object.keys(grid).filter(key => grid[key] === BLACK).map(c => Number(c.split(',')[1])).sort((a, b) => a - b, 0)
	let minY = yValues[0]
	let maxY = yValues[yValues.length - 1]
	return { minX, maxX, minY, maxY }
}

function flip(grid, key) {
	grid[key] = grid[key] || WHITE
	grid[key] = grid[key] === WHITE ? BLACK : WHITE
}

function adjacentBlack(grid, x, y) {
	return (grid[`${x + 0},${y - 1}`] === BLACK ? 1 : 0) // NE
		 + (grid[`${x - 1},${y - 1}`] === BLACK ? 1 : 0) // NW
		 + (grid[`${x - 1},${y + 0}`] === BLACK ? 1 : 0) // W
		 + (grid[`${x + 1},${y + 0}`] === BLACK ? 1 : 0) // E
		 + (grid[`${x + 1},${y + 1}`] === BLACK ? 1 : 0) // SE
		 + (grid[`${x + 0},${y + 1}`] === BLACK ? 1 : 0) // SW
}
