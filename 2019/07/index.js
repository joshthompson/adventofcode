const fs = require('fs')
const Intcode = require('../shared/intcode')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	// data = '3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5'
	// data = '3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10'
	const program = data.toString().split(',').filter(v => v.trim().length).map(Number)
	console.log('Part 1', part1(program))
	console.log('Part 2', part2(program))
})

function part1(program) {
	let maxOutput = 0
	generatePossibilities().forEach(p => {
		const o1 = Intcode.run(program, [p[0], 0])
		const o2 = Intcode.run(program, [p[1], ...o1])
		const o3 = Intcode.run(program, [p[2], ...o2])
		const o4 = Intcode.run(program, [p[3], ...o3])
		const o5 = Intcode.run(program, [p[4], ...o4])
		maxOutput = Math.max(maxOutput, o5[0])
	})
	return maxOutput
}

function part2(program) {
	let maxOutput = 0
	generatePossibilities(5).forEach(p => {
		// const ran = runParallel([
		// 	Intcode.parallel(program, [p[0]]),
		// 	Intcode.parallel(program, [p[1]]),
		// 	Intcode.parallel(program, [p[2]]),
		// 	Intcode.parallel(program, [p[3]]),
		// 	Intcode.parallel(program, [p[4]])
		// ])
		// maxOutput = Math.max(maxOutput, ran)
		
		maxOutput = Math.max(maxOutput, test(program, p))
	})
	return maxOutput
}

function runParallel(amps) {
	let a = 0
	let yield = { value: 0, done: false }
	let value = 0

	amps.forEach((a, i) => a.next(i === 0 ? [0] : []))

	while (!yield.done) {
		console.group('AMP', 'ABCDE'[a])
		yield = amps[a].next([value])
		if (yield.done) return yield.value
		value = yield.value
		a = (a + 1) % amps.length
		console.groupEnd()
	}
	return value
}

function test(program, p) {
	const ins = [[p[0], 0], [p[1]], [p[2]], [p[3]], [p[4]]]
	let i = 0
	let n = 0
	while (true) {
		const outs = Intcode.run(program, ins[i])
		const next = (i + 1) % 5
		if (outs[n]) {
			ins[next].push(outs[n])
		} else {
			return ins[0][ins[0].length - 1]
		}
		i = next
		if (next === 0) n++
	}
}

function generatePossibilities(s = 0) {
	// return [[9,8,7,6,5]]
	// return [[9,7,8,5,6]]
	const pos = []
	for (let a = 0; a < 5; a++) {
		for (let b = 0; b < 5; b++) {
			if (b === a) continue
			for (let c = 0; c < 5; c++) {
				if (c === b || c === a) continue
				for (let d = 0; d < 5; d++) {
					if (d === c || d === b || d === a) continue
					for (let e = 0; e < 5; e++) {
						if (e === d || e === c || e === b || e === a) continue
						pos.push([a + s, b + s, c + s, d + s, e + s])
					}
				}
			}
		}
	}
	return pos
}
