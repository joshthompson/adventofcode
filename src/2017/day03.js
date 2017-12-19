AdventOfCode.day03 = {

	part1: (n, render) => {
		// Functions
		let sideFn = level => 2 * level + 1
		let startFn = level => Math.pow(sideFn(level - 1), 2) + 1

		// Which level of the spiral we're on 
		// Also the numbers of intial outward steps
		let level = Math.floor(Math.ceil(Math.sqrt(n)) / 2)
		let side = sideFn(level)
		let start = startFn(level)
		let offset = level - 1 // Offset from lowest value in level to middle

		let distance = n
		
		for (let i = 0; i < 4; i++) { // Loop each side
			let side_middle = start + offset + (side - 1) * i // Middle value for this side
			let side_distance = Math.abs(side_middle - n)
			distance = Math.min(distance, side_distance) // Keep shortest side distance
		}

		if (render) AdventOfCode.day03.render(parseInt(n), level, distance, 0)

		return level + distance
	},

	part1_2: n => {
		let level = Math.floor(Math.ceil(Math.sqrt(n)) / 2)
		let side = 2 * level + 1
		let highest = Math.pow(side, 2)
		while (n + side < highest) n += side
		return level + Math.abs(highest - (side - 1) / 2 - n)
	},

	processMove: (grid, x, y) => {
		let g = (x, y) => grid[x + ',' + y] ? grid[x + ',' + y] : 0 // value of cell in grid
		let c = (x, y) => !g(x, y) // is cell clear

		// 			NORTH			EAST			SOUTH			WEST
		if (		c(x, y-1) && 	c(x+1, y) && 	c(x, y+1) &&	c(x-1, y))	x += 1 // Everything is empty

		else if (	c(x, y-1) &&	c(x+1, y) &&	!c(x, y+1) &&	c(x-1, y))	x -= 1 // Just south is blocked
		else if (	c(x, y-1) &&	!c(x+1, y) &&	!c(x, y+1) &&	c(x-1, y))	x -= 1 // Just south and east are blocked

		else if (	c(x, y-1) &&	!c(x+1, y) &&	c(x, y+1) &&	c(x-1, y))	y += 1 // Just east is blocked
		else if (	!c(x, y-1) &&	!c(x+1, y) &&	c(x, y+1) &&	c(x-1, y))	y += 1 // Just north and east are blocked

		else if (	!c(x, y-1) &&	c(x+1, y) &&	c(x, y+1) &&	c(x-1, y))	x += 1 // Just north is blocked
		else if (	!c(x, y-1) &&	c(x+1, y) &&	c(x, y+1) &&	!c(x-1, y))	x += 1 // Just north and west are blocked

		else if (	c(x, y-1) &&	c(x+1, y) &&	c(x, y+1) &&	!c(x-1, y))	y -= 1 // Just west is blocked
		else if (	c(x, y-1) &&	c(x+1, y) &&	!c(x, y+1) &&	!c(x-1, y))	y -= 1 // Just south and west are blocked

		return {x: x, y: y}
	},

	part2: input => {
		let grid = {
			'0,0': 1
		}
		let g = (x, y) => grid[x + ',' + y] ? grid[x + ',' + y] : 0 // value of cell in grid
		let c = (x, y) => !g(x, y) // is cell clear
		let set = (x, y, value) => grid[x + ',' + y] = value

		var value = 1
		var x = 0
		var y = 0

		while (value < input) {
			// Move to next cell
			let pos = AdventOfCode.day03.processMove(grid, x, y)
			x = pos.x
			y = pos.y

			// Calculate total
			value = g(x-1, y-1) + g(x+0, y-1) + g(x+1, y-1)
				  + g(x-1, y+0) + 0           + g(x+1, y+0)
				  + g(x-1, y+1) + g(x+0, y+1) + g(x+1, y+1)
			set(x, y, value)
		}

		return value

	},

	renderHtml: '<canvas id="canvas3_1" style="height: 500px;"></canvas>',

	render: async (n, level, distance, frame) => {
		let c = document.getElementById('canvas3_1').getContext('2d')
		let w = c.canvas.width = document.getElementById('canvas3_1').clientWidth
		let h = c.canvas.height = document.getElementById('canvas3_1').clientHeight
		let max = 2000
		c.font = '8px Verdana'
		while (!n || parseInt(n) <= 1 || parseInt(n) > max) n = parseInt(prompt(`Number to find (Integer from 2 - ${max})`))
		console.log(parseInt(n))
		let grid = {}
		let size = 22
		let x = 0
		let y = 0
		let i = 1

		// Draw grid
		while (i <= n) {
			let pos = AdventOfCode.day03.processMove(grid, x, y)
			x = pos.x
			y = pos.y
			c.fillText(i, w/2 + x * size, h/2 + y * size / 2)
			grid[x + ',' + y] = i+1
			i++
			await sleep(1)
		}

		let xa = x / Math.abs(x)
		let ya = y / Math.abs(y)
		let cx = 0
		let cy = 0
		let colour = 0
		for (cx = 0; Math.abs(cx) <= Math.abs(x) + (x>0?-2:0); cx += xa) {
			c.fillStyle = `hsla(${137*colour++}, 100%, 50%, 0.5)`
			c.fillRect(w/2 + (cx + 0.8) * size, h/2 + (cy - 0.8)  * size / 2, size, size / 2)
			await sleep(25)
		}
		for (cy = 0; Math.abs(cy) <= Math.abs(y); cy += ya) {
			c.fillStyle = `hsla(${137*colour++}, 100%, 50%, 0.5)`
			c.fillRect(w/2 + (cx + 0.8) * size, h/2 + (cy - 0.8)  * size / 2, size, size / 2)
			await sleep(25)
		}
		c.fillRect = w/2 - 5



	}

}