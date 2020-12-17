const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const [rules, ticket, nearby] = processData(data)
	console.log('Part 1', part1(rules, nearby))
	console.log('Part 2', part2(rules, ticket, nearby))
})

function part1(rules, nearby) {
	const valid = validValues(rules)
	return nearby.map(t => t.filter(v => !valid[v]).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
}

function part2(rules, ticket, nearby) {
	const valid = validValues(rules)
	nearby = nearby.filter(t => t.every(v => valid[v]))

	const values = Array(ticket.length).fill(null).map(() => new Set())
	nearby.forEach(t => t.forEach((v, i) => values[i].add(v)))

	rules.forEach(rule => {
		values.forEach((set, i) => {
			if ([...set].every(v => inRange(rule, v))) {
				rule.possibleTicketPositions.push(i)
			}
		})
	})

	rules.sort((a, b) => a.possibleTicketPositions.length - b.possibleTicketPositions.length)

	rules.forEach(rule => {
		const position = rule.possibleTicketPositions[0]
		rules.forEach(r => r.possibleTicketPositions = r.possibleTicketPositions.filter(p => p !== position))
		rule.ticketPosition = position
	})

	return rules.filter(rule => rule.name.startsWith('departure')).map(rule => ticket[rule.ticketPosition]).reduce((a, b) => a * b, 1)
}

function validValues(rules) {
	const valid = {}
	rules.forEach(rule => {
		for (let i = rule.range1[0]; i <= rule.range1[1]; i++) valid[i] = true
		for (let i = rule.range2[0]; i <= rule.range2[1]; i++) valid[i] = true
	})
	return valid
}

function inRange(rule, value) {
	return value >= rule.range1[0] && value <= rule.range1[1]
		|| value >= rule.range2[0] && value <= rule.range2[1]
}

function processData(data) {
	const rules = data.toString().split('\n\n')[0].split('\n').map(processRule)
	const ticket = data.toString().split('\n\n')[1].split('\n')[1].split(',').map(Number)
	const nearby = data.toString().split('\n\n')[2].split('\n').filter((_, i) => i > 0).map(t => t.split(',').map(Number))
	return [rules, ticket, nearby]
}

function processRule(rule) {
	const split = /^(.*): (\d*)-(\d*) or (\d*)-(\d*)$/g.exec(rule)
	return {
		name: split[1],
		range1: [Number(split[2]), Number(split[3])],
		range2: [Number(split[4]), Number(split[5])],
		possibleTicketPositions: [],
		ticketPosition: null
	}
}
