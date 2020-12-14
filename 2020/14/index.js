const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const program = data.toString().split('\n').filter(line => line.length)
	console.log('Part 1', version1(program))
	console.log('Part 2', version2(program))
})

function version1(program) {
	let mask = ''.padStart(36, '0')
	const mem = []
	program.forEach(line => {
		if (line.substr(0, 7) === 'mask = ') {
			mask = line.substr(7)
		} else {
			const [,i,v] = line.match(/mem\[([\d]*)\] = ([\d]*)/)
			bin = Number(v).toString(2).padStart(36, '0')
			mem[i] = parseInt(mask.split('').map((m, b) => m === 'X' ? bin[b] : m).join(''), 2)
		}
	})
	return mem.filter(m => m).reduce((a, b) => a + b, 0)
}

function version2(program) {
	let mask = ''.padStart(36, '0')
	let mem = {}
	program.forEach(line => {
		if (line.substr(0, 7) === 'mask = ') {
			mask = line.substr(7)
		} else {
			let [,i,v] = line.match(/mem\[([\d]*)\] = ([\d]*)/)
			bin = Number(i).toString(2).padStart(36, '0')
			const addressBin = mask.split('').map((m, b) => m === '0' ? bin[b] : m === '1' ? 1 : 'X').join('')
			floatingValues(addressBin).forEach(value => {
				mem[value] = Number(v)
			})
			
		}
	})
	return Object.keys(mem).map(m => mem[m]).reduce((a, b) => a + b, 0)
}

function floatingValues(value) {
	const floats = value.match(/X/g).length
	const num = 2 ** floats
	const values = []
	for (let i = 0; i < num; i++) {
		let bin = i.toString(2).padStart(floats, '0').split('')
		values.push(parseInt(value.split('').map(c => c === 'X' ? bin.shift() : c).join(''), 2))
	}
	return values
}
