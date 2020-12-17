// TODO - generalise dimentions
// (Likelyhood of me acutally doing this is low)

const fs = require('fs')

const State = {
	Active: '#',
	Inactive: '.'
}

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const cubes = [[data.toString().split('\n').filter(line => line.length).map(r => r.split(''))]]
	console.log('Part 1', run(cubes, true))
	console.log('Part 2', run(cubes, false))
})

function run(cubes, cutWDimension) {
	cubes = JSON.parse(JSON.stringify(cubes))
	for (let i = 0; i < 6; i++) {
		cubes = cycle(cubes)
		if (cutWDimension) cubes = [cubes[0]]
	}
	return totalActive(cubes)
}

function cycle(cubes) {
	const bounds = activeBounds(cubes)
	const clone = JSON.parse(JSON.stringify(cubes))

	for (let w = bounds.minW- 1; w <= bounds.maxW + 1; w++) {
		if (!cubes[w]) cubes[w] = []
		if (!clone[w]) clone[w] = []

		for (let z = bounds.minZ - 1; z <= bounds.maxZ + 1; z++) {
			if (!cubes[w][z]) cubes[w][z] = []
			if (!clone[w][z]) clone[w][z] = []

			for (let y = bounds.minY - 1; y <= bounds.maxY + 1; y++) {
				if (!cubes[w][z][y]) cubes[w][z][y] = []
				if (!clone[w][z][y]) clone[w][z][y] = []

				for (let x = bounds.minX - 1; x <= bounds.maxX + 1; x++) {
					if (!cubes[w][z][y][x]) cubes[w][z][y][x] = State.Inactive
					if (!clone[w][z][y][x]) clone[w][z][y][x] = State.Inactive
						if (!clone[w][z][y][x]) clone[w][z][y][x] = State.Inactive

					const n = neighbours(cubes, x, y, z, w)
					if (cubes[w][z][y][x] === State.Active) {
						clone[w][z][y][x] = n === 2 || n === 3 ? State.Active : State.Inactive
					} else {
						clone[w][z][y][x] = n === 3 ? State.Active : State.Inactive
					}
				}
			}
		}
	}
	return clone
}

function activeBounds(cubes) {
	const bounds = {
		minX: 0,
		maxX: 0,
		minY: 0,
		maxY: 0,
		minZ: 0,
		maxZ: 0,
		minW: 0,
		maxW: 0
	}

	Object.keys(cubes).forEach(w => {
		Object.keys(cubes[w]).forEach(z => {
			Object.keys(cubes[w][z]).forEach(y => {
				Object.keys(cubes[w][z][y]).forEach(x => {
					if (cubes[w][z][y][x] === State.Active) {
						bounds.minX = Math.min(x, bounds.minX)
						bounds.maxX = Math.max(x, bounds.maxX)
						bounds.minY = Math.min(y, bounds.minY)
						bounds.maxY = Math.max(y, bounds.maxY)
						bounds.minZ = Math.min(z, bounds.minZ)
						bounds.maxZ = Math.max(z, bounds.maxZ)
						bounds.minW = Math.min(w, bounds.minW)
						bounds.maxW = Math.max(w, bounds.maxW)
					}
				})
			})
		})
	})

	return bounds
}

function totalActive(cubes) {
	let active = 0
	Object.keys(cubes).forEach(w => {
		Object.keys(cubes[w]).forEach(z => {
			Object.keys(cubes[w][z]).forEach(y => {
				Object.keys(cubes[w][z][y]).forEach(x => {
					if (cubes[w][z][y][x] === State.Active) {
						active++
					}
				})
			})
		})
	})
	return active
}

function neighbours(cubes, x, y, z, w) {
	let n = 0
	for (let ww = w - 1; ww <= w + 1; ww++) {
		for (let zz = z - 1; zz <= z + 1; zz++) {
			for (let yy = y - 1; yy <= y + 1; yy++) {
				for (let xx = x - 1; xx <= x + 1; xx++) {
					if (xx === x && yy === y && zz === z && ww === w) continue
					if (cubes[ww] && cubes[ww][zz] && cubes[ww][zz][yy] && cubes[ww][zz][yy][xx] === State.Active) n++
				}
			}
		}
	}
	return n
}
