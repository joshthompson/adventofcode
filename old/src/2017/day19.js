AdventOfCode.day19 = {

	result: null,

	explore: async (maze, pos, dir, canvas) => {
		if (!canvas) return {str: 'Only runs with animation', moves: 'Only runs with animation'}
		let str = ''
		let m = (x, y) => maze[y][x]
		let moves = 0
		while (true) {
			let move = {x: 0, y: 0}
			let x = pos.x
			let y = pos.y

			if (canvas) AdventOfCode.day19.render(canvas, x, y)

			if (dir === 'n') {
				if (m(x, y - 1) === '|') move.y -= 1
				else if (m(x, y - 1) === '-') move.y -= 2
				else if (m(x, y - 1) === ' ') break
				else if (m(x, y - 1) === '+') {
					move.y -= 1
					dir = m(x + 1, y - 1) === '-' ? 'e' : 'w'
				} else move.y -= 1
			} else if (dir === 'e') {
				if (m(x + 1, y) === '-') move.x += 1
				else if (m(x + 1, y) === '|') move.x += 2
				else if (m(x + 1, y) === ' ') break
				else if (m(x + 1, y) === '+') {
					move.x += 1
					dir = m(x + 1, y + 1) === '|' ? 's' : 'n'
				} else move.x += 1
			} else if (dir === 's') {
				if (m(x, y + 1) === '|') move.y += 1
				else if (m(x, y + 1) === '-') move.y += 2
				else if (m(x, y + 1) === ' ') break
				else if (m(x, y + 1) === '+') {
					move.y += 1
					dir = m(x + 1, y + 1) === '-' ? 'e' : 'w'
				} else move.y += 1
			} else if (dir === 'w') {
				if (m(x - 1, y) === '-') move.x -= 1
				else if (m(x - 1, y) === '|') move.x -= 2
				else if (m(x - 1, y) === ' ') break
				else if (m(x - 1, y) === '+') {
					move.x -= 1
					dir = m(x - 1, y + 1) === '|' ? 's' : 'n'
				} else move.x -= 1
			}

			pos.x += move.x
			pos.y += move.y
			moves += Math.abs(move.x) + Math.abs(move.y)

			if (m(pos.x, pos.y).match(/[A-Z]/)) str += m(pos.x, pos.y)

			await sleep(0)
		}
		return {str: str, moves: ++moves}
	},

	renderHtml: "<canvas id='canvas19_1' style='height: 500px'></canvas>",

	renderSetup: maze => {
		let c = document.getElementById('canvas19_1').getContext('2d')
		let w = c.canvas.width = document.getElementById('canvas19_1').clientWidth
		let h = c.canvas.height = document.getElementById('canvas19_1').clientHeight
		
		let s = 2
		for (let y = 0; y < maze.length; y++) {
			for (let x = 0; x < maze[y].length; x++) {
				c.fillStyle = '#000000'
				if (maze[y][x] === '|') c.fillRect(x * s, y * s, s, s)
				else if (maze[y][x] === '+') c.fillRect(x * s, y * s, s, s)
				else if (maze[y][x] === '-') {
					c.fillStyle = '#444444'
					c.fillRect(x * s, y * s, s, s)
				} else if (maze[y][x] === ' ') continue
				else {
					c.fillStyle = '#00FF00'
					c.fillRect(x * s, y * s, s, s)
				}
			}
		}
		return c
	},

	renderColour: 0,
	render: async (canvas, x, y) => {
		canvas.fillStyle = `hsl(${AdventOfCode.day19.renderColour++}, 100%, 50%)`
		canvas.fillRect(x * 2, y * 2, 2, 2)
	},

	part1: async (input, render) => {
		this.result = null
		let maze = input.split('\n').map(line => line.split(''))
		let pos = {x: maze[0].indexOf('|'), y: 0}
		let dir = 's'
		let canvas = false
		if (render) canvas = AdventOfCode.day19.renderSetup(maze)
		this.result = await AdventOfCode.day19.explore(maze, pos, dir, canvas)
		console.log(this.result)
		return this.result.str
	},

	part2: async input => {
		while (!this.result) await sleep(100)
		return this.result.moves
	}
}
