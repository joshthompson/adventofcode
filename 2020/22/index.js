const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const players = data.toString().split('\n\n').filter(piece => piece.length).map(p => new Player(p))
	console.log('Part 1', runBasicGame(players[0], players[1]))
	console.log('Part 2', runRecursiveGame(players[0], players[1]).score)
})

class Player {
	constructor(string) {
		this.name = string.split('\n')[0].replace(':', '')
		this.deck = string.split('\n').slice(1).filter(piece => piece.length).map(Number)
		this.history = []
	}

	card() {
		return this.deck.shift()
	}

	recordState() {
		this.history.push({
			score: this.score,
			deck: [...this.deck]
		})
	}

	findDuplicateState() {
		return this.history.find(state => {
			return this.score === state.score
				&& this.deck.join('') === state.deck.join('')
		})
	}

	addCards(...cards) {
		this.deck.push(...cards)
	}

	sub(number) {
		const sub = new Player(this.toString())
		sub.deck = sub.deck.slice(0, number)
		return sub
	}

	get score() {
		return this.deck.map((card, i) => card * (this.deck.length - i)).reduce((a, b) => a + b, 0)
	}

	toString() {
		return this.name + ':\n' + this.deck.join('\n')
	}
}

function runBasicGame(p1, p2) {
	p1 = new Player(p1.toString())
	p2 = new Player(p2.toString())
	while (true) {
		const c1 = p1.card()
		const c2 = p2.card()
		const winner = c1 > c2 ? p1 : p2
		winner.addCards(Math.max(c1, c2), Math.min(c1, c2))
		if (p1.deck.length === 0) return p2.score
		if (p2.deck.length === 0) return p1.score
	}
}

// let game = 0

function runRecursiveGame(p1, p2) {
	// let thisGame = ++game
	// let round = 0
	// console.log(`=== Game ${thisGame} ===`)
	p1 = new Player(p1.toString())
	p2 = new Player(p2.toString())
	while (true) {

		// round++
		// console.log(`\n-- Round ${round} (Game ${thisGame}) --`)
		// console.log(`${p1.name}'s deck: ${p1.deck.join(', ')}`)
		// console.log(`${p2.name}'s deck: ${p2.deck.join(', ')}`)

		// Check and record state - if equal to previous round - Player 1 wins by default
		if (p1.findDuplicateState() || p2.findDuplicateState()) return p1
		p1.recordState()
		p2.recordState()

		// Draw cards
		const c1 = p1.card()
		const c2 = p2.card()

		// console.log(`${p1.name} plays: ${c1}`)
		// console.log(`${p2.name} plays: ${c2}`)
	
		let winner = null
		if (c1 <= p1.deck.length && c2 <= p2.deck.length) {
			// console.log('Playing a sub-game to determine the winner...\n')
			winner = runRecursiveGame(p1.sub(c1), p2.sub(c2))
			winner = p1.name === winner.name ? p1 : p2
			// console.log(`...anyway, back to game ${thisGame}.`)
			// console.log(`${winner.name} wins round ${round} of game ${thisGame}!\n`)
		} else {
			winner = c1 > c2 ? p1 : p2
			// console.log(`${winner.name} wins round ${round} of game ${thisGame}!`)
		}

		winner.addCards(p1 === winner ? c1 : c2, p1 === winner ? c2 : c1)

		if (p1.deck.length === 0) return p2
		if (p2.deck.length === 0) return p1
	}
}
