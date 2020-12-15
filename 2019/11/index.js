const fs = require('fs')
const Intcode = require('../shared/intcode')

fs.readFile(`${__dirname}/input.txt`, async (_e, data) => {
	const program = data.toString().split(',').filter(v => v.trim().length).map(Number)
	console.log('Part 1', await run(program, 0, { 0: '.', 1: '#', undefined: ' ' }))
	console.log('Part 2', await run(program, 1, { 0: '⬜', 1: '⬛', undefined: '⬜' }))
})

async function run(program, start, key) {

	const panels = []

	const positions = new Set()
	positions.add('0,0')

	const movX = { 0: 0, 90: 1, 180: 0, 270: -1 }
	const movY = { 0: -1, 90: 0, 180: 1, 270: 0 }

	let x = 0
	let y = 0
	let minX = 0
	let minY = 0
	let maxX = 0
	let maxY = 0
	let rot = 0

	const robot = Intcode.parallel(program, [start])
	let response = null

	while (true) {
		// await render(panels, minX, maxX, minY, maxY, x, y, rot, key) // Uncomment to animate

		panels[y] = panels[y] || []
		response = robot.next([
			panels[y][x] === undefined ? 0 : panels[y][x]
		])
		if (response.done) break;
		panels[y][x] = response.value
		response = robot.next([])
		if (response.done) break;
		rot = (rot + (response.value ? 90 : 270)) % 360
		

		x += movX[rot]
		y += movY[rot]
		positions.add(`${x},${y}`)
		
		
		minX = Math.min(x, minX)
		maxX = Math.max(x, maxX)
		minY = Math.min(y, minY)
		maxY = Math.max(y, maxY)

	}
	return await render(panels, minX, maxX, minY, maxY, null, null, null, key, false)
}


async function render(panels, minX, maxX, minY, maxY, sx, sy, rot, key, moveCursor = true) {
	await new Promise((resolve) => setTimeout(() => resolve(), 0))

	let str = ''
	for (let y = minY; y <= maxY; y++) {
		str += '\n'
		for (let x = minX; x <= maxX; x++) {
			if (x === sx && y === sy) {
				str += '^>v<'[rot / 90]
			} else {
				panels[y] = panels[y] || []
				str += key[panels[y][x]]
			}
		}
	}
	process.stdout.write(`\r${str}`)
	if (moveCursor) process.stdout.moveCursor(0, minY - maxY - 1)
	else console.log()

	return (str.match(/[#|\.]/g) || []).length
}
