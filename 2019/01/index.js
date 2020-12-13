const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const modules = data.toString().split('\n').filter(line => line.length).map(Number)
	console.log('Part 1', totalFuel1(modules))
	console.log('Part 2', totalFuel2(modules))
})

function totalFuel1(modules) {
	return modules.map(m => Math.floor(m / 3) - 2).reduce((a, b) => a + b, 0)
}

function totalFuel2(modules) {
	return modules.map(m => {
		let f = 0;
		let n = m;
		while (n > 0) {
			n = Math.max(0, Math.floor(n / 3) - 2)
			f += n
		}
		return f
	}).reduce((a, b) => a + b, 0)
}
