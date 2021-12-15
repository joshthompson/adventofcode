const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
  const start = +new Date()
  console.log('Part 1', part1(data.toString().split('\n').map(line => line.split('').map(Number))))
  console.log('Part 2', part2(data.toString().split('\n').map(line => line.split('').map(Number))))
  console.log('Time:', new Date() - start, 'ms')
})

function part1(octopi) {
  let flashes = 0
  for (let i = 0; i < 100; i++) {
    flashes += step(octopi)
  }
  return flashes
}

function part2(octopi) {
  let i = 0
  while (true) {
    i++
    if (step(octopi) === 100) {
      return i
    }
  }
}

function step(octopi) {
  let flashes = 0
  for (let y = 0; y < octopi.length; y++) {
    for (let x = 0; x < octopi[y].length; x++) {
      flashes += gainEnergy(octopi, x, y)
    }
  }
  for (let y = 0; y < octopi.length; y++) {
    for (let x = 0; x < octopi[y].length; x++) {
      if (octopi[y][x] > 9) {
        octopi[y][x] = 0
      }
    }
  }
  return flashes
}

function gainEnergy(octopi, x, y) {
  if (octopi[y] === undefined || octopi[y][x] === undefined) {
    return 0
  }
  let flashes = 0
  octopi[y][x]++
  if (octopi[y][x] === 10) {
    flashes += flash(octopi, x, y)
  }
  return flashes
}

function flash(octopi, x, y) {
  return 1
    + gainEnergy(octopi, x - 1, y - 1)
    + gainEnergy(octopi, x - 1, y)
    + gainEnergy(octopi, x - 1, y + 1)
    + gainEnergy(octopi, x, y - 1)
    + gainEnergy(octopi, x, y + 1)
    + gainEnergy(octopi, x + 1, y - 1)
    + gainEnergy(octopi, x + 1, y)
    + gainEnergy(octopi, x + 1, y + 1)
}
