AdventOfCode.day11 = {

	part1: input => {
		let x = 0, y = 0
		input.split(',').forEach(d => {

			if (d === 'n') y++
			if (d === 's') y--

			if (d === 'nw') x--
			if (d === 'se') x++

			if (d === 'ne') { x++; y++ }
			if (d === 'sw') { x--; y-- }

		})
		return Math.abs(x) + Math.abs(y)
	},
	
	part2: input => {
		let x = 0, y = 0, max = 0
		input.split(',').forEach(d => {

			if (d === 'n') y++
			if (d === 's') y--

			if (d === 'nw') x--
			if (d === 'se') x++

			if (d === 'ne') { x++; y++ }
			if (d === 'sw') { x--; y-- }

			max = Math.max(max, Math.abs(x) + Math.abs(y))

		})
		return max
	}

}