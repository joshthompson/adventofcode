const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const list = data.toString().split('\n')
		.map(n => parseInt(n, 10))
		.filter(n => !isNaN(n))
	console.log('Part 1', findSumPair(list))
	console.log('Part 2', findSumTrio(list))
})

function findSumPair(list, target = 2020) {
	// Sort list
	list.sort((a, b) => a > b ? 1 : -1)
	for (let i = 0; i < list.length; i++) {
		const a = list[i];
		if (a > target) break;
		for (let j = list.length - 1; j >= 0; j--) {
			const b = list[j]
			if (b > target || a + b < target) break;
			if (a + b === target) return a * b
		}
	}
	return null
}

function findSumTrio(list, target = 2020) {
	// Sort list
	list.sort((a, b) => a > b ? 1 : -1)
	for (let i = 0; i < list.length; i++) {
		const a = list[i];
		console.log('A', a, '=', a)
		if (a > target) break;

		for (let j = list.length - 1; j >= 0; j--) {
			const b = list[j]
			console.log('B', a, b, '=', a + b)
			if (a + b > target) continue;

			for (let k = 0; k < list.length; k++) {
				const c = list[k]
				console.log(a, b, c, '=', a + b + c)
				if (a + b + c === target) return a * b * c
			}

		}
	}
	return null
}
