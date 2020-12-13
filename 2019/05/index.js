const fs = require('fs')
const Intcode = require('../shared/intcode')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const program = data.toString().split(',').filter(v => v.trim().length).map(Number)
	try {
		const output1 = Intcode.run(program, [1])
		console.log('Part 1', output1[output1.length - 1])
		const output2 = Intcode.run(program, [5])
		console.log('Part 2', output2[0])
	} catch (error) {
		console.log('ERROR!', error)
	}
})
