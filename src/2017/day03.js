AdventOfCode.day03 = {

	part1: n => {
		let level = Math.floor(Math.ceil(Math.sqrt(n)) / 2)
		let side = 2 * level + 1
		let highest = Math.pow(side, 2)
		while (n + side < highest) n += side
		return level + Math.abs(highest - (side - 1) / 2 - n)
	},

	part2: input => {
		let grid = {
			'0,0': 1
		}
		let g = (x, y) => grid[x + ',' + y] ? grid[x + ',' + y] : 0// value of cell in grid
		let c = (x, y) => !g(x, y) // is cell clear
		let set = (x, y, value) => grid[x + ',' + y] = value

		var value = 1
		var x = 0
		var y = 0

		while (value < input) {
			// Move to next cell

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

			// Calculate total
			value = g(x-1, y-1) + g(x+0, y-1) + g(x+1, y-1)
				  + g(x-1, y+0) + 0           + g(x+1, y+0)
				  + g(x-1, y+1) + g(x+0, y+1) + g(x+1, y+1)
			set(x, y, value)
		}

		return value

	}

}