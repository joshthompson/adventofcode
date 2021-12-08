const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const entries = data.toString().split('\n').map(line => new Entry(line))
	console.log('Part 1', part1(entries))
	console.log('Part 2', part2(entries))
})

class Entry {
  constructor(line) {
    const [signals, digits] = line.split(' | ').map(s => s.split(' '))
    this.digits = digits.map(sortString)
    this.numbers = this.progcessSignals(signals.map(sortString))
  }

  progcessSignals(signals) {
    const numbers = []
    numbers[1] = signals.find(s => s.length === 2)
    numbers[4] = signals.find(s => s.length === 4)
    numbers[7] = signals.find(s => s.length === 3)
    numbers[8] = signals.find(s => s.length === 7)
    numbers[9] = signals.find(s =>
      s.length === 6 &&
      s.includes(numbers[4][0]) &&
      s.includes(numbers[4][1]) &&
      s.includes(numbers[4][2]) &&
      s.includes(numbers[4][3])
    )
    numbers[0] = signals.find(s =>
      s.length === 6 &&
      s !== numbers[9] &&
      s.includes(numbers[1][0]) &&
      s.includes(numbers[1][1])
    )
    numbers[6] = signals.find(s =>
      s.length === 6 &&
      s !== numbers[9] &&
      s !== numbers[0]
    )
    numbers[5] = signals.find(s =>
      s.length === 5 &&
      numbers[6].split('').map(n => s.includes(n) ? 1 : 0).reduce((a, b) => a + b) === 5
    )
    numbers[2] = signals.find(s =>
      s.length === 5 &&
      numbers[5].split('').map(n => s.includes(n) ? 1 : 0).reduce((a, b) => a + b) === 3 &&
      numbers[6].split('').map(n => s.includes(n) ? 1 : 0).reduce((a, b) => a + b) === 4
    )
    numbers[3] = signals.find(s =>
      s.length === 5 &&
      s !== numbers[5] &&
      s !== numbers[2]
    )
    return numbers
  }

  getFrequency(n) {
    return this.digits.filter(digit => this.numbers[n] === digit).length
  }

  getValue() {
    return this.digits.reverse().map((digit, i) => {
      return this.numbers.findIndex(n => n === digit) * 10 ** i
    }).reduce((a, b) => a + b, 0)
  }
}

function part1(entries) {
  return entries.map(e =>
    e.getFrequency(1) +
    e.getFrequency(4) +
    e.getFrequency(7) +
    e.getFrequency(8),
  ).reduce((a, b) => a + b, 0)
}

function part2(entries) {
  return entries.map(e => e.getValue()).reduce((a, b) => a + b, 0)
}

function sortString(str) {
  return str.split('').sort().join('')
}
