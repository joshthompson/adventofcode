const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const seats = data.toString().split('\n').filter(line => line.length).map(row => row.split(''))
	console.log('Part 1', countOccupied(simulate(seats, 4, false)))
	console.log('Part 2', countOccupied(simulate(seats, 5, true)))
})

function simulate(seats, tollerance, lineOfSight) {
	let changes = 0
	do {
		changes = 0
		let newSeats = []
		for (let i = 0; i < seats.length; i++) {
			newSeats[i] = []
			for (let j = 0; j < seats[i].length; j++) {
				const oc = lineOfSight ? occupiedLineOfSight(seats, i, j) : occupiedAdjacent(seats, i, j)
				if (seats[i][j] === 'L' && oc === 0) {
					newSeats[i][j] = '#'
					changes++
				} else if (seats[i][j] === '#' && oc >= tollerance) {
					newSeats[i][j] = 'L'
					changes++
				} else {
					newSeats[i][j] = seats[i][j]
				}
			}
		}
		seats = [...newSeats]
	} while (changes > 0)
	return seats
}

function occupiedAdjacent(seats, i, j) {
	let occupied = 0;
	for (let k = i - 1; k <= i + 1; k++) {
		if (k < 0 || k >= seats.length) continue
		for (let l = j - 1; l <= j + 1; l++) {
			if (k === i && j === l || l < 0 || l >= seats[k].length) continue
			occupied += seats[k][l] === '#' ? 1 : 0
		}
	}
	return occupied
}

function occupiedLineOfSight(seats, i, j) {
	return 0
		+ occupiedLineOfSightLine(seats, i, j, -1, -1)
		+ occupiedLineOfSightLine(seats, i, j, -1, +0)
		+ occupiedLineOfSightLine(seats, i, j, -1, +1)
		+ occupiedLineOfSightLine(seats, i, j, +0, -1)
		+ occupiedLineOfSightLine(seats, i, j, +0, +1)
		+ occupiedLineOfSightLine(seats, i, j, +1, -1)
		+ occupiedLineOfSightLine(seats, i, j, +1, +0)
		+ occupiedLineOfSightLine(seats, i, j, +1, +1)
}

function occupiedLineOfSightLine(seats, i, j, ii, jj) {
	let n = 1
	while (true) {
		const seat = seats[i + n * ii] ? seats[i + n * ii][j + n * jj] : undefined
		switch (seat) {
			case '#': return 1
			case 'L': return 0
			case undefined: return 0
			case '.': n++
		}
	}
}

function countOccupied(seats) {
	return seats.map(r => r.join('')).join('').replace(/\.|L/g, '').length
}