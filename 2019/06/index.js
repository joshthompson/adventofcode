const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	let orbits = data.toString().split('\n').filter(line => line.length)
	const solarSystem = bigBang('COM', orbits)
	console.log('Part 1', countOrbits(solarSystem))
	console.log('Part 2', distance(solarSystem, 'YOU', 'SAN'))
})

function bigBang(name, orbits, parent = null) {
	const system = { name, parent }
	system.sub = orbits
		.filter(o => o.split(')')[0] === name)
		.map(o => bigBang(o.split(')')[1], orbits, system))
	return system
}

function countOrbits(system, depth = 0) {
	return depth + system.sub.map(sub => countOrbits(sub, depth + 1)).reduce((a, b) => a + b, 0)
}

function distance(solarSystem, p1, p2) {
	const parents1 = parentNames(find(solarSystem, p1))
	const parents2 = parentNames(find(solarSystem, p2))
	for (let d1 = 0; d1 < parents1.length; d1++) {
		const d2 = parents2.findIndex(p => p === parents1[d1])
		if (d2 >= 0) return d1 + d2 - 2 // Ignore positions of items ... -2
	}
}

function find(system, item) {
	if (system.name === item) {
		return system
	}
	for (let i = 0; i < system.sub.length; i++) {
		const res = find(system.sub[i], item)
		if (res) return res
	}
	return null
}

function parentNames(item) {
	return item.parent ? [item.name, ...parentNames(item.parent)] : [item.name]
}
