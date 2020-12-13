const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	let adaptors = data.toString().split('\n').filter(line => line.length).map(Number).sort((a, b) => a - b)
	adaptors = [0, ...adaptors, adaptors[adaptors.length - 1] + 3]
	console.log('Part 1', part1(adaptors))
	console.log('Part 2', part2(adaptors))
})

function part1(adaptors) {
	const jumps = [0, 0, 0]
	adaptors.forEach((a, i) => i && jumps[a - adaptors[i - 1] - 1]++)
	return jumps[0] * jumps[2]
}

function part2(ad) {
	const ar = [1]
	for (let i = 1; i < ad.length; i++) {
		ar[i] = (ad[i] - ad[i - 1] <= 3 ? ar[i - 1] : 0) +
				(ad[i] - ad[i - 2] <= 3 ? ar[i - 2] : 0) +
				(ad[i] - ad[i - 3] <= 3 ? ar[i - 3] : 0)
	}
	return ar[ar.length - 1]
}
