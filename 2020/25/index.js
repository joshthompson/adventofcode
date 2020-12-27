const cardPub = 18499292
const doorPub = 8790390
const doorLoopSize = getLoopSize(doorPub)
console.log('Part 1:', getEncryptionKey(doorLoopSize, cardPub))

function getLoopSize(target) {
	let subjectNumber = 7
	let value = 1
	let loopSize = 0
	while (++loopSize) {
		value = (value * subjectNumber) % 20201227
		if (value === target) return loopSize
	}
}

function getEncryptionKey(loopSize, subjectNumber) {
	let value = 1
	for (let i = 0; i < loopSize; i++) {
		value = (value * subjectNumber) % 20201227
	}
	return value
}
