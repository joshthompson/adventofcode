AdventOfCode.day01 = {

	part1: input => {
		let numbers = input.split('').map(i => parseInt(i))
		numbers.push(numbers[0])
		let sum = 0

		for (let i = 0; i < numbers.length - 1; i++) {
			sum += numbers[i] === numbers[i + 1] ? numbers[i] : 0
		}
		return sum
	},

	part2: input => {
		let numbers = input.split('').map((i) => parseInt(i))
		let sum = 0

		for (let i = 0; i < numbers.length - 1; i++) {
			j = (i + numbers.length / 2) % numbers.length
			sum += numbers[i] === numbers[j] ? numbers[i] : 0
		}
		return sum
	}

}