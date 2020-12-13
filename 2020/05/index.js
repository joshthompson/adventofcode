const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const seats = data.toString().split('\n')
		.filter(line => line.length)
		.map(seat => processSeat(seat))
	// console.log(seats)
	console.log('Part 1', highestSeatID(seats))
	console.log('Part 2', findMySeatID(seats))
})

function processSeat(seat) {
	const rowBin = seat.substr(0, 7)
	const colBin = seat.substr(7, 3)
	const row = parseInt(rowBin.replace(/F/g, '0').replace(/B/g, '1'), 2)
	const col = parseInt(colBin.replace(/L/g, '0').replace(/R/g, '1'), 2)
	const id = row * 8 + col
	return { row, col, id };
}

function highestSeatID(seats) {
	seats.sort((a, b) => b.id - a.id)
	return seats[0].id
}

function findMySeatID(seats) {
	seats = seats.filter(seat => seat.row > 0 && seat.row < 127) // Filter front and back rows

	const rows = new Array(127).fill(0)
	const cols = new Array(8).fill(0)
	seats.forEach(seat => rows[seat.row]++)
	seats.forEach(seat => cols[seat.col]++)


	const mySeat = {
		row: rows.findIndex(r => r === 7),
		col: cols.findIndex(c => c === 100)
	}
	mySeat.id = mySeat.row * 8 + mySeat.col
	return mySeat.id
}
