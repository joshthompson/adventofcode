const fs = require('fs')

const coords = [0, 1, 2]
const gcd = (a, b) => a ? gcd(b % a, a) : b
const lcm = (a, b) => a * b / gcd(a, b)

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const moons = data.toString().split('\n').filter(v => v.length).map(makeMoon)
	console.log('Part 1', part1(moons))
	console.log('Part 2', part2(moons))
})

function part1(init) {
	const moons = JSON.parse(JSON.stringify(init))
	for (let i = 0; i < 1000; i++) {
		coords.forEach(c => update(moons, c))
	}
	return systemEnergy(moons)
}

function part2(init) {
	const moons = JSON.parse(JSON.stringify(init))
	let results = [];
	coords.forEach(c => {
		for (let i = 0; true; i++) {
			update(moons, c)
			if (!moons.find((m, i) => m.pos[c] !== init[i].pos[c] || m.vel[c] !== 0)) {
				return results[c] = i + 1
			}
		}
	})
	return results.reduce(lcm, 1)
}

function update(moons, c) {
	moons.forEach(a => moons.forEach(b => {
		if (a.pos[c] > b.pos[c]) a.vel[c]--
		else if (a.pos[c] < b.pos[c]) a.vel[c]++
	}))
	moons.forEach(moon => moon.pos[c] += moon.vel[c])
}

function systemEnergy(moons) {
	return moons.map(moonEnergy).reduce((a, b) => a + b, 0)
}

function moonEnergy(moon) {
	const potential = moon.pos.reduce((a, b) => Math.abs(a) + Math.abs(b), 0)
	const kinetic = moon.vel.reduce((a, b) => Math.abs(a) + Math.abs(b), 0)
	return potential * kinetic
}

function makeMoon(str, i) {
	return {
		name: ['Io', 'Europa', 'Ganymede', 'Callisto'][i],
		pos: [
			parseInt(/x\=([-\d]*)/g.exec(str)[1]),
			parseInt(/y\=([-\d]*)/g.exec(str)[1]),
			parseInt(/z\=([-\d]*)/g.exec(str)[1])
		],
		vel: [0, 0, 0]
	}
}
