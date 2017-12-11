var aoc =  [
	{
		// DAY 1
		parts: [
			input => {
				let up = input.replace(/\)/g, '').length
				let down = input.replace(/\(/g, '').length
				return up - down
			},
			input => {
				let floor = 0
				let cmds = input.split('')
				for (let i = 0; i < cmds.length; i++) {
					floor += cmds[i] === '(' ? 1 : -1
					if (floor === -1) return i + 1
				}
			}
		]
	},
	{
		// DAY 2
		parts: [
			input => {
				let presents = input.split('\n').map(line => line.split('x').map(i => parseInt(i)))
				let size = 0
				presents.forEach(present => {
					let w = present[0]
					let h = present[1]
					let l = present[2]
					size += 2*l*w + 2*w*h + 2*h*l + Math.min(l*w, w*h, h*l)
				})
				return size
			},
			input => {
				let presents = input.split('\n').map(line => line.split('x').map(i => parseInt(i)))
				let length = 0
				presents.forEach(present => {
					let w = present[0]
					let h = present[1]
					let l = present[2]
					let o = [w, h, l].sort((a, b) => a > b)
					length += o[0]*2 + o[1]*2 + w*h*l
				})
				return length
			}
		]
	},
	{
		// DAY 3
		parts: [
			input => {
				let x = 0, y = 0
				let houses = {}
				let gift = () => houses[x+','+y] = houses[x+','+y] ? houses[x+','+y] + 1 : 1
				gift()
				input.split('').forEach(cmd => {
					if (cmd === '>') x++
					else if (cmd === '<') x--
					else if (cmd === 'v') y++
					else if (cmd === '^') y--
					gift()
				})
				return Object.keys(houses).length
			},
			input => {
				let sx = 0, sy = 0, rx = 0, ry = 0
				let houses = {'0,0': 1}
				let gift = (x, y) => houses[x+','+y] = houses[x+','+y] ? houses[x+','+y] + 1 : 1
				input.split('').forEach((cmd, i) => {
					if (cmd === '>')      i%2 ? sx++ : rx++
					else if (cmd === '<') i%2 ? sx-- : rx--
					else if (cmd === 'v') i%2 ? sy++ : ry++
					else if (cmd === '^') i%2 ? sy-- : ry--
					gift(i%2 ? sx : rx, i%2 ? sy : ry)
				})
				return Object.keys(houses).length
			}
		]
	},
	{
		// DAY 4
		parts: [input => 'Skipping...']
	},
	{
		// DAY 5
		parts: [input => 'Skipping...']
	},
	{
		// DAY 6
		parts: [input => 'Skipping...']
	},
	{
		// DAY 7
		parts: [input => 'Skipping...']
	},
	{
		// DAY 8
		parts: [input => 'Skipping...']
	},
	{
		// DAY 9
		parts: [
			input => {
				let distances = {}
				input.split('\n').forEach(text => {
					let data = text.match(/([a-zA-Z]*) to ([a-zA-Z]*) = ([0-9]*)/i)
					distances[data[1]] = distances[data[1]] ? distances[data[1]] : {}
					distances[data[2]] = distances[data[2]] ? distances[data[2]] : {}
					distances[data[1]][data[2]] = distances[data[2]][data[1]] = parseInt(data[3])
				})
				console.log(distances)

				_.forEach(distances, () => {
					
				})
			}
		]
	},
	{
		// DAY 10
		parts: [input => 'Skipping...']
	},
	{
		// DAY 11
		parts: [input => 'Skipping...']
	},
	{
		// DAY 12
		parts: [input => 'Skipping...']
	},
	{
		// DAY 13
		parts: [input => 'Skipping...']
	},
	{
		// DAY 14
		parts: [
			input => {
				let tavlingtid = 2503
				let regex = /([a-zA-Z]*) can fly ([0-9]*) km\/s for ([0-9]*) seconds, but then must rest for ([0-9]*) seconds./i
				let renar = input.split('\n').map(text => {
					let ren = text.match(regex)
					return {
						namn: ren[1],
						fart: parseInt(ren[2]),
						flygtid: parseInt(ren[3]),
						vilotid: parseInt(ren[4]),
						distans: 0
					}
				})

				renar.forEach(ren => {
					let tid = 0
					let flyg = true
					while (tid < tavlingtid) {
						tid += flyg ? ren.flygtid : ren.vilotid
						ren.distans += (flyg ? ren.fart * (ren.flygtid + Math.min(0, tavlingtid - tid)) : 0)
						flyg = !flyg
					}
				})

				renar.sort((renA, renB) => renA.distans < renB.distans)
				return renar[0].distans
			},
			input => {
				let tavlingtid = 2503
				let regex = /([a-zA-Z]*) can fly ([0-9]*) km\/s for ([0-9]*) seconds, but then must rest for ([0-9]*) seconds./i
				let renar = input.split('\n').map(text => {
					let ren = text.match(regex)
					return {
						namn: ren[1],
						fart: parseInt(ren[2]),
						flygtid: parseInt(ren[3]),
						vilotid: parseInt(ren[4]),
						distans: 0,
						nedrakning: parseInt(ren[3]),
						flyg: true,
						poang: 0
					}
				})
				for (let s = 0; s < tavlingtid; s++) {
					let maxDistans = 0
					renar.forEach(ren => {
						ren.distans += ren.flyg ? ren.fart : 0
						if (!--ren.nedrakning) {
							ren.flyg = !ren.flyg
							ren.nedrakning = ren.flyg ? ren.flygtid : ren.vilotid
						}
						maxDistans = Math.max(maxDistans, ren.distans)
					})
					_.filter(renar, ren => ren.distans === maxDistans).forEach(ren => ren.poang++)
				}
				renar.sort((renA, renB) => renA.poang < renB.poang)
				return renar[0].poang
			}
		]
	},
	{
		// DAY 15
		parts: [input => 'Skipping...']
	},
	{
		// DAY 16
		parts: [input => 'Skipping...']
	},
	{
		// DAY 17
		warn: true,
		parts: [
			input => {
				const target = 150
				let containers = input.split('\n').map(i => parseInt(i))
				let combos = {}
				let combos_list = {}
				let addCombo = (total, combo) => {
					combos_list[combo.concat().sort().join()] = true
					combos[total] ? combos[total].push(combo) : combos[total] = [combo]
				}
				let comboTotal = (combo) => combo.map(i => containers[i]).reduce((a, b) => a + b)
				containers.forEach((c, i) => addCombo(c, [i]))
				var changes = false
				do {
					changes = false
					_.forEach(combos, a => _.forEach(combos, b => {
						let total = comboTotal(a[0]) + comboTotal(b[0])
						if (total <= target) {

							// Loop sub groups
							a.forEach(c => b.forEach(d => {
								let combo = c.concat(d)
								if (_.uniq(combo).length === c.length + d.length && !combos_list[combo.concat().sort().join()]) {
									let total = comboTotal(combo)
									if (total <= target) {
										addCombo(total, combo)
										changes = true
									}
								}
							}))


						}
					}))
				} while (changes)
				return combos[target].length
			},
			input => {
				const target = 150
				let containers = input.split('\n').map(i => parseInt(i))
				let combos = {}
				let combos_list = {}
				let addCombo = (total, combo) => {
					combos_list[combo.concat().sort().join()] = true
					combos[total] ? combos[total].push(combo) : combos[total] = [combo]
				}
				let comboTotal = (combo) => combo.map(i => containers[i]).reduce((a, b) => a + b)
				containers.forEach((c, i) => addCombo(c, [i]))
				var changes = false
				do {
					changes = false
					_.forEach(combos, a => _.forEach(combos, b => {
						let total = comboTotal(a[0]) + comboTotal(b[0])
						if (total <= target) {

							// Loop sub groups
							a.forEach(c => b.forEach(d => {
								let combo = c.concat(d)
								if (_.uniq(combo).length === c.length + d.length && !combos_list[combo.concat().sort().join()]) {
									let total = comboTotal(combo)
									if (total <= target) {
										addCombo(total, combo)
										changes = true
									}
								}
							}))


						}
					}))
				} while (changes)

				let minContainers = Math.min.apply(null, combos[target].map(i => i.length))
				return combos[target].filter(a => a.length === minContainers).length
			}
		]
	},
	{
		// DAY 18
		parts: [input => 'Skipping...']
	}
]
