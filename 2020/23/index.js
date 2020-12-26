const cups = '364289715'.split('').map(Number)

console.log('Part 1', part1(cups))
console.log('Part 2', part2(cups))

function part1(cups) {
	cups = JSON.parse(JSON.stringify(cups))
	cups = run(cups, 9, 10)

	let str = ''
	let cup = cups.find(c => c.value === 1)	
	do {
		cup = cup.next
		str += '' + cup.value
	} while (cup.next.value !== 1)
	return str
}

function part2(cups) {
	cups = JSON.parse(JSON.stringify(cups))
	cups = run(cups, 1000000, 10000000)
	const one = cups.find(cup => cup.value === 1)
	return one.next.value * one.next.next.value
}

function run(cups, max = cups.length, cycles = 100) {

	cups = cups.map(cup => ({ value: cup, next: null }))
	const locations = []

	for (let i = 10; i <= max; i++) {
		cups.push({ value: i, next: null })
	}

	for (let i = 0; i < cups.length; i++) {
		cups[i].next = cups[(i + 1) % cups.length]
		locations[cups[i].value] = cups[i]
	}
	
	let cup = cups[0]
	for (let i = 0; i < cycles; i++) {

		let pickup = [cup.next, cup.next.next, cup.next.next.next]
		cup.next = pickup[2].next

		let target = cup.value - 1
		let destination = null
		while (!destination) {
			target = target || max
			destination = locations[target]
			if (pickup.includes(destination)) destination = null
			target--
		}

		pickup[2].next = destination.next
		destination.next = pickup[0]
		cup = cup.next
	}

	return cups
}
