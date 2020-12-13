AdventOfCode.day17 = {

	slowWarning: true,

	part1: input => {
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

	part2: input => {
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

}
