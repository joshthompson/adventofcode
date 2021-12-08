const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const crabs = data.toString().split(',').map(Number)
	console.log('Part 1', part1(crabs))
	console.log('Part 2', part2(crabs))
})

function part1(crabs) {
  const median = crabs.sort((a, b) => a - b)[Math.floor(crabs.length / 2)]
  const fuel = crabs.map(crab => Math.abs(crab - median)).reduce((a, b) => a + b, 0)
  return fuel
}

function part2(crabs) {
  const max = Math.max(...crabs)
  const fuels = []
  for (let i = 0; i < max; i++) {
    fuels.push(
      crabs.map(crab => fuelUsage(Math.abs(crab - i))).reduce((a, b) => a + b, 0)
    )
  }
  return Math.min(...fuels)
}

function fuelUsage(n) {
  return (n * n + n) / 2 // triangular number
}
