AdventOfCode.day15 = {

	slowWarning: true,

	doIt: gen => gen.value = (gen.value * gen.factor) % 2147483647,

	part1: input => {
		let genA = {value: parseInt(input.split('\n')[0].substr(24)), factor: 16807}
		let genB = {value: parseInt(input.split('\n')[1].substr(24)), factor: 48271}
		let pairs = 0
		for (let i = 0; i < 40*10**6; i++) {
			if (AdventOfCode.day15.doIt(genA).toString(2).substr(-16) === AdventOfCode.day15.doIt(genB).toString(2).substr(-16)) pairs++
		}
		return pairs
	},

	part2: input => {
		let genA = {value: parseInt(input.split('\n')[0].substr(24)), factor: 16807}
		let genB = {value: parseInt(input.split('\n')[1].substr(24)), factor: 48271}
		let pairs = 0
		let listA = []
		let listB = []
		let listSize = 5*10**6
		while (listA.length < listSize) if (!(AdventOfCode.day15.doIt(genA) % 4)) listA.push(genA.value.toString(2).substr(-16))
		while (listB.length < listSize) if (!(AdventOfCode.day15.doIt(genB) % 8)) listB.push(genB.value.toString(2).substr(-16))
		for (let i = 0; i < listSize; i++) if (listA[i] === listB[i]) pairs++
		return pairs
	}
	
}
