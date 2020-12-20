const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const rules = data.toString().split('\n\n')[0].split('\n').filter(line => line.length).map(mapRule)
	const messages = data.toString().split('\n\n')[1].split('\n').filter(line => line.length)
	console.log('Part 1', part1(rules, messages))
	console.log('Part 2', part2(rules, messages))
})

function part1(rules, messages) {
	const regexStr = `^${generateRegex(rules, 0)}$`
	return messages.map(message => {
		return new RegExp(regexStr, 'g').exec(message) !== null ? 1 : 0
	}).reduce((a, b) => a + b, 0)
}

function part2(rules, messages) {
	let oldBase = 0
	let base = 1000
	for (let i = 0; i < 3; i++) { // Fake 3 levels of recursion 
		rules.push(...rules.map(({id, ors}) => ({
			id: id + base,
			ors: ors.map(or => or.map(o => Number(o) ? Number(o) + base : o))
		})))
		rules.find(r => r.id === oldBase + 8).ors = [[base + 42], [base + 42, base + 8]]
		rules.find(r => r.id === oldBase + 11).ors = [[base + 42, base + 31], [base + 42, base + 11, base + 31]]
		oldBase = base
		base *= 2
	}
	
	const regexStr = `^${generateRegex(rules, 0)}$`
	return messages.map(message => {
		return new RegExp(regexStr, 'g').exec(message) !== null ? 1 : 0
	}).reduce((a, b) => a + b, 0)
}

function mapRule(rule) {
	return {
		id: Number(rule.split(': ')[0]),
		ors: rule.split(': ')[1].split(' | ').map(s => s.split(' '))
	}
}

function generateRegex(rules, id) {
	return "(" + rules.find(r => r.id === id).ors.map(o => {
		if (o[0] === '"a"') return "a"
		if (o[0] === '"b"') return "b"
		return `${o.map(r => generateRegex(rules, Number(r))).join('')}`
	}).join('|') + ")"
}
