const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
  const game = new BingoGame(data.toString())
  const results = game.run()
	console.log('Part 1', results[0].score)
	console.log('Part 2', results[results.length - 1].score)
})

class BingoGame {
  constructor(input) {
    const split = input.split('\n\n')
    this.numbers = split[0].split(',').map(Number)
    this.boards = split.slice(1).map(board => new BingoGameBoard(board))
  }

  run() {
    const results = []
    let boards = [...this.boards]
    for (let number of this.numbers) {
      boards.forEach(board => board.mark(number))
      boards.filter(board => board.isComplete()).forEach(board => {
        results.push({ number, board, score: board.score(number) })
      })
      boards = this.boards.filter(board => !board.isComplete())
      if (boards.length === 0) break
    }
    return results
  }
}

class BingoGameBoard {
  constructor(input) {
    this.rows = input.split('\n').map(
      row => row.trim().split(/\s+/g).map(
        value => ({ value: parseInt(value), marked: false })
      )
    )
  }

  mark(value) {
    this.rows.forEach(
      row => row.filter(
        cell => cell.value === value
      ).forEach(
        cell => cell.marked = true
      )
    )
  }

  isComplete() {
    const rotated = this.rows.map((_, index) => this.rows.map(row => row[index]).reverse())
    const rowComplete = this.rows.some(row => row.every(cell => cell.marked))
    const colComplete = rotated.some(row => row.every(cell => cell.marked))
    return rowComplete || colComplete
  }

  valueOfUnmarked() {
    let value = 0
    this.rows.forEach(row => row.forEach(cell => cell.marked ? null : value += cell.value))
    return value
  }

  score(number) {
    return number * this.valueOfUnmarked()
  }
}
