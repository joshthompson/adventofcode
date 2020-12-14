const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const asteroidMap = data.toString().split('\n').filter(l => l.length).map(l => l.split(''))
	const station = part1(asteroidMap)
	console.log('Part 1', station)
	console.log('Part 2', part2(asteroidMap, station))
})

function part1(asteroidMap) {
	const lineOfSightMap = []
	let max = { value: 0, x: null, y: null }
	for (let y = 0; y < asteroidMap.length; y++) {
		lineOfSightMap[y] = []
		for (let x = 0; x < asteroidMap[y].length; x++) {
			lineOfSightMap[y][x] = asteroidMap[y][x] === '#' ? lineOfSight(asteroidMap, { x, y }) : 0
			if (lineOfSightMap[y][x] > max.value) {
				max = { value: lineOfSightMap[y][x], x, y }
			}
		}
	}
	return max
}

function lineOfSight(asteroidMap, asteroid) {
	const cloneMap = JSON.parse(JSON.stringify(asteroidMap))
	cloneMap[asteroid.y][asteroid.x] = '@'
	for (let y = 0; y < cloneMap.length; y++) {
		for (let x = 0; x < cloneMap[y].length; x++) {
			if (cloneMap[y][x] === '#') {
				const offset = { x: x - asteroid.x, y: y - asteroid.y }
				const multiple = Math.max(Math.abs(offset.x), Math.abs(offset.y))
				offset.x /= multiple
				offset.y /= multiple
				let n = 1
				let ox = x + offset.x * n
				let oy = y + offset.y * n
				while (oy >= 0 && oy < cloneMap.length && ox >= 0 && ox < cloneMap[Math.floor(oy)].length) {
					if (cloneMap[oy] && cloneMap[oy][ox] === '#') cloneMap[oy][ox] = '_'
					n++
					ox = x + offset.x * n
					oy = y + offset.y * n
				}
			}
		}
	}
	return cloneMap.map(l => l.join('')).join('').match(/#/g).length
}

function part2(originMap, station) {
	const map = JSON.parse(JSON.stringify(originMap))
	map[station.y][station.x] = 'X'
	console.table(map)
	const destroyed = []
	const asteroids = {}
	const angles = new Set()

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (map[y][x] === '#') {
				const dx = x - station.x
				const dy = y - station.y
				const angle = (360 + 90 + Math.atan2(dy, dx) * 180 / Math.PI) % 360
				const distance = Math.sqrt(dx ** 2 + dy ** 2)
				asteroids[angle] = asteroids[angle] ? asteroids[angle] : []
				asteroids[angle].push({ x, y, angle, distance })
				angles.add(angle)
			}
		}
	}

	const anglesOrder = [...angles].sort((a, b) => a - b)
	anglesOrder.forEach(angle => asteroids[angle].sort((a, b) => a.distance - b.distance))

	let i = 0
	while (true) {
		const asteroid = asteroids[anglesOrder[i]].shift()
		if (asteroid) {
			destroyed.push(asteroid)
			if (destroyed.length === 200) {
				return asteroid.x * 100 + asteroid.y
			}
		}
		i = (i + 1) % anglesOrder.length
	}
}
