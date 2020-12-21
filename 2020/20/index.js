const fs = require('fs')

const seaMonsterRegExpTop = /^..................#./g
const seaMonsterRegExpMid =  /#....##....##....###/g
const seaMonsterRegExpBot = /^.#..#..#..#..#..#.../g

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const puzzle = data.toString().split('\n\n').filter(piece => piece.length).map(mapPiece)
	puzzle.forEach(p => p.setup(puzzle))
	console.log('Part 1', part1(puzzle))
	console.log('Part 2', part2(puzzle))
})

function part1(puzzle) {
	return puzzle.filter(p => p.corner).map(p => p.id).reduce((a, b) => a * b, 1)
}

function part2(puzzle) {
	// Choose random starting corner piece and rotate to top left
	const start = puzzle.filter(piece => piece.corner)[0]
	while (start.matches.s !== 1 || start.matches.e !== 1) {
		start.rotate()
	}
	start.place(0, 0)

	// Setup grid
	const size = puzzle.length ** 0.5;
	const completed = [[start]]

	// Fill grid
	for (let i = 1; i < puzzle.length; i++) {
		const x = i % size
		const y = Math.floor(i / size)
		const next = findPiece(puzzle, completed, x, y)
		next.place(x, y)
		completed[y] = completed[y] || []
		completed[y][x] = next
	}

	const rendered = render(completed)
// 	const rendered =
// `..#.....#......#.#.........#..#......#.....#.#..#.#....##.......##..#..........#.#.##.#...#.....
// ........#..#....#......##............#........................##..#......#........#.....#.......
// #.....#..###......##...###..#..#..#....#....##....##....###..####.#.....#....#...#.#.#....##....
// ....##......#...##...###...##....###..##..#...####..##.#.##..##......#..###......#...#......#...
// #.#...........#.###.#..#..####..#.......#..#..#....................#..#.##....##....###.......#.
// #...#.....#...#......###.#..............###.#...................#..##.##..#..#..#..#.#.##..####.`
	return roughness(rendered)
}

function findPiece(puzzle, completed, x, y) {
	const size = puzzle.length ** 0.5
	// Filter by piece already placed and type (corner, edge, other)
	const corner = x === 0 && y === 0 || x === size - 1 && y === 0 || x === 0 && y === size - 1 || x === size - 1 && y === size - 1 
	const side = !corner && (x === 0 || y === 0 || x === size - 1 || y === size - 1)
	const pieces = puzzle.filter(p => p.placed === false && p.corner === corner && p.side === side)

	// Do any of them fit?
	const left = completed[y] && completed[y][x - 1] ? completed[y][x - 1].edges.e : null
	const top = completed[y - 1] && completed[y - 1][x] ? completed[y - 1][x].edges.s : null
	for (let i = 0; i < pieces.length; i++) {
		const piece = pieces[i]
		for (let j = 0; j < 8; j++) {
			if ((!left || piece.edges.w === left) && (!top || piece.edges.n === top)) return piece
			piece.rotate()
			if (j % 4 === 3) piece.flip()
		}
	}

	// No :(
	throw 'No piece found'
}

function roughness(rendered) {
	let rendersWithMonsters = []
	for (let i = 0; i < 8; i++) {
		rendersWithMonsters[i] = findSeaMonsters(rendered)
		// Rotate
		rendered = rotateMatrix(rendered.split('\n').map(line => line.split(''))).map(line => line.join('')).join('\n')
		if (i % 4 === 3) { // Flip
			rendered = rendered.split('\n').reverse().join('\n')
		}
	}
	const roughest = rendersWithMonsters.map(render => ({ render, roughness: render.match(/#/g).length }))
	roughest.sort((a, b) => a.roughness - b.roughness)

	console.log(roughest[0].render.replace(/O/g, '\x1b[32mO\x1b[0m'))
	return roughest[0].roughness
}

function findSeaMonsters(rendered) {
	const lines = rendered.split('\n')

	// Find sea monsters
	let seaMonsters = []
	for (let y = 1; y < lines.length - 2; y++) {
		let match = null
		seaMonsterRegExpMid.lastIndex = 0
		while (match = seaMonsterRegExpMid.exec(lines[y])) {
			seaMonsterRegExpTop.lastIndex = 0
			seaMonsterRegExpBot.lastIndex = 0
			seaMonsterRegExpMid.lastIndex = match.index + 1
			const x = match.index
			const top = seaMonsterRegExpTop.exec(lines[y - 1].substr(x))
			const bot = seaMonsterRegExpBot.exec(lines[y + 1].substr(x))
			if (top && bot) seaMonsters.push({ x, y })
		}
	}

	// Render the monsters
	for (let i = 0; i < seaMonsters.length; i++) {
		const mon = seaMonsters[i]
		lines[mon.y - 1] = lines[mon.y - 1].split('').map((c, j) => [18].includes(j - mon.x) ? 'O' : c).join('')
		lines[mon.y] = lines[mon.y].split('').map((c, j) => [0,5,6,11,12,17,18,19].includes(j - mon.x) ? 'O' : c).join('')
		lines[mon.y + 1] = lines[mon.y + 1].split('').map((c, j) => [1,4,7,10,13,16].includes(j - mon.x) ? 'O' : c).join('')
	}
	return lines.join('\n')
}

function render(complete) {
	let out = ''
	const pieceSize = complete[0][0].pixels.length
	for (let y = 0; y < complete.length; y++) {
		for (let py = 1; py < pieceSize - 1; py++) {
			complete[y].forEach(piece => out += piece.pixels[py].slice(1, 9).join(''))
			out += '\n'
		}
	}
	return out
}

function mapPiece(piece) {
	const lines = piece.split('\n')
	const id = parseInt(lines[0].substr(5))
	const pixels = lines.slice(1).map(line => line.split(''))
	return new PuzzlePiece(id, pixels)
}

class PuzzlePiece {

	#puzzle = null

	constructor(id, pixels) {
		this.id = id
		this.used = false
		this.pixels = pixels
		this.edges = getEdges(this.pixels)
		this.matches = { n: 0, e: 0, s: 0, w: 0 }
		this.adjacent = null
		this.#puzzle = null
		this.x = null
		this.y = null
		this.placed = false
	}

	setup(puzzle) {
		this.#puzzle = puzzle
		this.getMatches()
	}

	getMatches() {
		this.matches = { n: 0, e: 0, s: 0, w: 0 }
		this.#puzzle.filter(p => p !== this).forEach(p => {
			if (Object.values(p.edges).includes(this.edges.n)) this.matches.n++
			if (Object.values(p.edges).includes(this.edges.e)) this.matches.e++
			if (Object.values(p.edges).includes(this.edges.s)) this.matches.s++
			if (Object.values(p.edges).includes(this.edges.w)) this.matches.w++
		})
		this.adjacent = Object.values(this.matches).reduce((a, b) => a + b, 0)
	}

	rotate() {
		this.pixels = rotateMatrix(this.pixels)
		this.edges = getEdges(this.pixels)
		this.getMatches()
	}

	flipVertical() {
		this.pixels.reverse()
		this.edges = getEdges(this.pixels)
		this.getMatches()
	}

	flip() {
		this.flipVertical()
	}

	get corner() {
		return this.adjacent === 2
	}

	get side() {
		return this.adjacent === 3
	}

	place(x, y) {
		this.x = x
		this.y = y
		this.placed = true
	}
}

function getEdges(pixels) {
	const size = pixels.length
	return {
		n: toBin(pixels[0]),
		e: toBin(pixels.map(row => row[size - 1])),
		s: toBin(pixels[size - 1]),
		w: toBin(pixels.map(row => row[0])),
		nf: toBin(pixels[0], true),
		ef: toBin(pixels.map(row => row[size - 1]), true),
		sf: toBin(pixels[size - 1], true),
		wf: toBin(pixels.map(row => row[0]), true)
	}
}

function toBin(edge, reverse = false) {
	edge = JSON.parse(JSON.stringify(edge))
	if (reverse) edge.reverse()
	return parseInt(edge.join('').replace(/\./g, '0').replace(/\#/g, '1'), 2)
}

function rotateMatrix(matrix) {
	const n = matrix.length
	const x = Math.floor(n / 2)
	const y = n - 1
	for (let i = 0; i < x; i++) {
		for (let j = i; j < y - i; j++) {
			k = matrix[i][j]
			matrix[i][j] = matrix[y - j][i]
			matrix[y - j][i] = matrix[y - i][y - j]
			matrix[y - i][y - j] = matrix[j][y - i]
			matrix[j][y - i] = k
		}
	}
	return matrix
}
