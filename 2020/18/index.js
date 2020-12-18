const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const maths = data.toString().split('\n').filter(line => line.length)
	console.log('Part 1', maths.map(resolve1).reduce((a, b) => a + b, 0))
	console.log('Part 2', maths.map(resolve2).reduce((a, b) => a + b, 0))
})

function resolve1(exp) {
	let parenthesisMatch = null
	while (true) {
		parenthesisMatch = exp.match(/\(([0-9 \+\*]*?)\)/g)
		if (parenthesisMatch) {
			let sub = parenthesisMatch.sort((a, b) => a.length - b.length)[0]
			exp = exp.replace(sub, resolve1(sub.substr(1, sub.length - 2)))
		} else {
			break
		}
	}

	const sum = exp.split(' ')
	let value = Number(sum[0])
	for (let i = 1; i < sum.length; i += 2) {
		value = sum[i] === '+' ? value + Number(sum[i + 1]) : value * Number(sum[i + 1])
	}
	return value
}

function resolve2(exp) {
	let parenthesisMatch = null
	while (true) {
		parenthesisMatch = exp.match(/\(([0-9 \+\*]*?)\)/g)
		if (parenthesisMatch) {
			const sub = parenthesisMatch.sort((a, b) => a.length - b.length)[0]
			exp = exp.replace(sub, resolve2(sub.substr(1, sub.length - 2)))
		} else {
			break
		}
	}

	let addMatch = null
	while (true) {
		addMatch = exp.match(/([\d]+ \+ [\d]+)/g)
		if (addMatch) {
			const add = addMatch[0]
			exp = exp.replace(add, add.split(' + ').map(Number).reduce((a, b) => a + b, 0))
		} else {
			break
		}
	}

	const sum = exp.split(' ')
	let value = Number(sum[0])
	for (let i = 1; i < sum.length; i += 2) {
		value = sum[i] === '+' ? value + Number(sum[i + 1]) : value * Number(sum[i + 1])
	}
	return value
}
