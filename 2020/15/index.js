const numbers = '14,3,1,0,9,5'.split(',').map(Number)

console.log('Part 1', run(numbers, 2020))
console.log('Calculating... (Part 2 takes 5-10 seconds to run)')
console.log('Part 2', run(numbers, 30000000))

function run(numbers, total) {
	const occurances = new Map()
	let next = 0
	for (let i = 0; i < total; i++) {
		if (numbers[i] === undefined) numbers[i] = next
		next = occurances.get(numbers[i]) !== undefined ? i - occurances.get(numbers[i]) : 0
		occurances.set(numbers[i], i)
	}
	return numbers[numbers.length - 1]
}
