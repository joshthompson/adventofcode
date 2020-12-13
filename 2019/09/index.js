const fs = require('fs')
const Intcode = require('../shared/intcode')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const program = data.toString().split(',').filter(v => v.trim().length).map(Number)
	console.log('Part 1', Intcode.run(program, [1]))
	console.log('Part 2', Intcode.run(program, [2]))
})
