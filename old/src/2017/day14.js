AdventOfCode.day14 = {

	init: async () => await loadDayScript(10),

	slowWarning: true,

	hexToPaddedBin: hex => ('000' + parseInt(hex, 16).toString(2)).substr(-4),

	grid: input => {
		let size = 128
		let grid = ''
		for (let row = 0; row < size; row++) {
			grid += AdventOfCode.knotHash(`${input}-${row}`)
				.split('')
				.map(h => AdventOfCode.day14.hexToPaddedBin(h))
				.join('') + '\n'
		}
		return grid
	},

	part1: async input => AdventOfCode.day14.grid(input).match(/1/g).length,

	part2: async (input, render) => {
		let grid = AdventOfCode.day14.grid(input).split('\n').map(row => row.split(''))
		let groups = 0
		let size = 128

		let checkCell = (x, y) => grid[x] && grid[x][y] && grid[x][y] === '1'

		let expandRegion = (x, y, region) => {
			grid[x][y] = region
			if (checkCell(x + 1, y + 0)) expandRegion(x + 1, y + 0, region)
			if (checkCell(x - 1, y + 0)) expandRegion(x - 1, y + 0, region)
			if (checkCell(x + 0, y - 1)) expandRegion(x + 0, y - 1, region)
			if (checkCell(x + 0, y + 1)) expandRegion(x + 0, y + 1, region)
		}

		for (let x = 0; x < size; x++) {
			for (let y = 0; y < size; y++){
				if (checkCell(x, y)) {
					groups++
					expandRegion(x, y, groups + 1)
				}
				if (render) await AdventOfCode.day14.render(grid, x, y, groups)
				else await sleep(1)
			}
		}
		return groups
	},

	renderHtml: "<canvas id='canvas14_2'></canvas>",

	render: async (grid, ox, oy, groups) => {
		let c = document.getElementById('canvas14_2').getContext('2d')
		let w = c.canvas.width = document.getElementById('canvas14_2').clientWidth
		let h = c.canvas.height = document.getElementById('canvas14_2').clientHeight
		let s = 2
		let maxX = 0
		grid.forEach((row, x) => {
			row.forEach((val, y) => {
				c.fillStyle = '#FFF'
				if (val === '1') c.fillStyle = '#000'
				if (val > 1) c.fillStyle = `hsl(${val*11}, 100%, 50%)`
				maxX = Math.max(maxX, x * s)
				c.fillRect(x * s, y * s, s, s)
			})
		})
		c.fillText(`Groups: ${groups}`, maxX + 10, 10)
		c.fillStyle = '#00F'
		c.fillRect(ox * 2, oy * 2, s, s)
		await sleep(1)
	}
	
}
