const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const numbers = data.toString().split('').filter(v => v.trim().length).map(Number)
	const width = 25
	const height = 6
	const layers = processLayers(numbers, width, height)
	console.log('Part 1', part1(layers))
	console.log(`Part 2\n${part2(layers, width, height)}`)
})

function part1(layers) {
	const most0s = [...layers].sort((a, b) => {
		return a.filter(aa => aa === 0).length - b.filter(bb => bb === 0).length
	})[0]
	const ones = most0s.filter(n => n === 1).length
	const twos = most0s.filter(n => n === 2).length
	return ones * twos
}

function part2(layers, width, height) {
	let image = Array(height).fill(null).map(() => ''.padEnd(width, '.').split(''))
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			for (let i = 0; i < layers.length; i++) {
				if (image[y][x] === '.') {
					const pixel = layers[i][y * width + x]
					if (pixel === 0 || pixel === 1) {
						image[y][x] = !pixel ? '⬜' : '⬛'
						break
					}
				}
			}
		}
	}
	return image.map(r => r.join('')).join('\n')
}

function processLayers(numbers, width, height) {
	const layers = []
	for (let i = 0; i < numbers.length; i++) {
		const layer = Math.floor(i / (width * height))
		layers[layer] = layers[layer] || []
		layers[layer].push(numbers[i])
	}
	return layers
}
