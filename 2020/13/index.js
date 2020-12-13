const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const now = data.toString().split('\n')[0]
	const buses = data.toString().split('\n')[1].split(',').map(Number)
	console.log('Part 1', nextBus(now, buses))

	// const buses = '1789,37,47,1889'.split(',').map(Number)

	console.log('Part 2', contest(buses))
})

function nextBus(now, buses) {
	let bus = null
	let time = Number.MAX_SAFE_INTEGER
	buses.filter(b => !isNaN(b)).map(b => {
		const t = Math.ceil(now / b) * b
		if (t < time) {
			bus = b
			time = t
		}
	})
	return bus * (time - now)
}

function contest(buses) {
	let start = 0
	let jump = buses[0]
	for (let i = 1; i < buses.length; i++) {
		if (isNaN(buses[i])) continue
		start = contestSub(buses.slice(0, i + 1), start, jump)
		jump *= buses[i]
	}
	return start
}

function contestSub(buses, start, jump) {
	let target = start
	while (true) {
		for (let i = 1; i < buses.length; i++) {
			if (isNaN(buses[i]) || (target + i) / buses[i] === Math.floor((target + i) / buses[i])) {
				if (i === buses.length - 1) return target
			} else break
		}
		target += jump
	}
}
