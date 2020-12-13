const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const rules = data.toString().split('\n').filter(line => line.length).map(mapRule)
	console.log('Part 1', getContainers(rules, 'shiny_gold').size)
	console.log('Part 2', getTotalBags(rules, 'shiny_gold') - 1) // -1 because we don't count the container
})

function mapRule(ruleStr) {
	const base = ruleStr.match(/^(.*) (.*) bags contain (.*)$/)
	const [,adj,col] = base
	const name = `${adj}_${col}`
	const contains = base[3].split(', ').map(b => {
		const c = b.match(/^(\d+) (.*) (.*) bag[s]?[.]?$/)
		return c ? { num: parseInt(c[1]), name: `${c[2]}_${c[3]}` } : null
	}).filter(b => b)
	const containsList = contains.map(c => c.name)
	return { adj, col, contains, containsList, name }
}

function getContainers(rules, name, containers = new Set()) {
	const newContainers = rules.filter(rule => rule.containsList.find(c => c === name))
	newContainers.forEach(n => {
		if (![...containers].find(c => c === n.name)) {
			containers = getContainers(rules, n.name, containers)
		}
	})
	return new Set([...containers, ...newContainers])
}

function getTotalBags(rules, name) {
	const rule = rules.find(r => r.name === name)
	return 1 + rule.contains.map(c => getTotalBags(rules, c.name) * c.num).reduce((a, b) => a + b, 0)
}
