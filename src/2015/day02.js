AdventOfCode.day02 = {

	part1: input => {
		let presents = input.split('\n').map(line => line.split('x').map(i => parseInt(i)))
		let size = 0
		presents.forEach(present => {
			let w = present[0]
			let h = present[1]
			let l = present[2]
			size += 2*l*w + 2*w*h + 2*h*l + Math.min(l*w, w*h, h*l)
		})
		return size
	},
	
	part2: input => {
		let presents = input.split('\n').map(line => line.split('x').map(i => parseInt(i)))
		let length = 0
		presents.forEach(present => {
			let w = present[0]
			let h = present[1]
			let l = present[2]
			let o = [w, h, l].sort((a, b) => a > b)
			length += o[0]*2 + o[1]*2 + w*h*l
		})
		return length
	}

}
