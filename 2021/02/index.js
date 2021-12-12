const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
  const start = +new Date()
	const commands = data.toString().split('\n').map(SubCommand)
	console.log('Part 1', part1(commands))
	console.log('Part 2', part2(commands))
  console.log('Time:', new Date() - start, 'ms')
})

function part1(commands) {
  let depth = 0
  let horiz = 0
  commands.forEach(({ command, value }) => {
    switch (command) {
      case 'forward':
        horiz += value
        break
      case 'up':
        depth -= value
        break
      case 'down':
        depth += value
        break
    }
  })
  return depth * horiz
}

function part2(commands) {
  let depth = 0
  let horiz = 0
  let aim = 0
  commands.forEach(({ command, value }) => {
    switch (command) {
      case 'forward':
        horiz += value
        depth += aim * value
        break
      case 'up':
        aim -= value
        break
      case 'down':
        aim += value
        break
    }
  })
  return depth * horiz
}

function SubCommand(input) {
  return {
    command: input.split(' ')[0],
    value: parseInt(input.split(' ')[1]),
  }
}
