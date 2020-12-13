AdventOfCode.day14 = {

	part1: input => {
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

	part2: input => {
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

}
