const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
  const start = +new Date()
	const readings = data.toString().split('\n').map(Number)
	console.log('Part 1', part1(readings))
	console.log('Part 2', part2(readings))
  console.log('Time:', new Date() - start, 'ms')
})

function part1(readings) {
  let increases = 0;
  for (let i = 1; i < readings.length; i++) {
    if (readings[i] > readings[i - 1]) {
      increases++
    }
  }
  return increases
}

function part2(readings) {
  let increases = 0;
  for (let i = 3; i < readings.length; i++) {
    const prev = readings[i - 3] + readings[i - 2] + readings[i - 1];
    const curr = readings[i - 2] + readings[i - 1] + readings[i];
    if (curr > prev) {
      increases++
    }
  }
  return increases
}
