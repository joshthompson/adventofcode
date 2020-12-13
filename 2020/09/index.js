const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const numbers = data.toString().split('\n').filter(line => line.length).map(Number)
	const invalid = findInvalid(numbers)
	console.log('Part 1', invalid)
	console.log('Part 2', findContinuousSumGroup(numbers, invalid))
})

function findInvalid(numbers, preamble = 25) {
	for (let i = preamble; i < numbers.length; i++) {
		const subNumbers = numbers.slice(i - preamble, i)
		const match = findSumInArray(subNumbers, numbers[i])
		if (!match) return numbers[i]
	}
	return null
}

function findSumInArray(numbers, target) {
	numbers = [...numbers].sort((a, b) => a - b)
	for (let a = 0; a < numbers.length; a++) {
		if (numbers[a] >= target) break;
		for (let b = 0; b < numbers.length; b++) {
			if (numbers[a] + numbers[b] === target) return true
			if (numbers[a] + numbers[b] > target) break
		}
	}
}

function findContinuousSumGroup(numbers, target) {
	for (let i = 0; i < numbers.length; i++) {
		let sum = numbers[i]
		let group = [numbers[i]]
		for (let j = i + 1; j < numbers.length; j++) {
			group.push(numbers[j])
			sum += numbers[j]
			if (sum === target) {
				group.sort((a, b) => a - b)
				return group[0] + group[group.length - 1]
			}
			if (sum > target) break
		}
	}
}