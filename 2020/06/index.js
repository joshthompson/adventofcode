const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const groups = data.toString().split('\n\n').map(processGroup)
	console.log('Part 1', sumGroupScoresAny(groups))
	console.log('Part 2', sumGroupScoresEvery(groups))
})

function processGroup(group) {
	const people = group.split('\n').filter(line => line.length)
	const questions = {}
	people.forEach(person => person.split('').forEach(answer => {
		questions[answer] = questions[answer] ? questions[answer] + 1 : 1
	}))
	const anyone = Object.keys(questions).length
	const everyone = Object.keys(questions).filter(q => questions[q] === people.length).length
	return { people, questions, anyone, everyone }
}

function sumGroupScoresAny(groups) {
	return groups.map(g => g.anyone).reduce((a, b) => {
		return a + b
	}, 0)
}

function sumGroupScoresEvery(groups) {
	return groups.map(g => g.everyone).reduce((a, b) => {
		return a + b
	}, 0)
}
