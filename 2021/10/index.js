const fs = require('fs')

fs.readFile(`${__dirname}/test.txt`, (_e, data) => {
  const lines = data.toString().split('\n')
  console.log('Part 1', part1(lines))
  console.log('Part 2', part2(lines))
})

function part1(lines) {
  return lines
    .map(line => processLine(line))
    .filter(line => line.error)
    .map(line => line.error.score)
    .reduce((a, b) => a + b, 0)
}

function part2(lines) {
  const scores = lines
    .map(line => processLine(line))
    .filter(line => !line.error)
    .map(line => {
      let score = 0
      line.state.split('').reverse().forEach(char => {
        score *= 5
        score += chars.find(c => c.open === char).score
      })
      return score
    })
    .sort((a, b) => a - b)
  return scores[Math.floor(scores.length / 2)]
}

function processLine(line) {
  let state = ''
  let error = null
  for (let pos = 0; pos < line.length; pos++) {
    const char = line[pos]
    const open = chars.find(c => c.open === char)
    const close = chars.find(c => c.close === char)
    if (open) {
      state += char
    } else if (close && state.slice(-1) === close.open) {
      state = state.slice(0, -1)
    } else {
      error = { char, pos, score: close.error }
      break
    }
  }
  return { line, error, state }
}

const chars = [
  { open: '(', close: ')', error: 3, score: 1 },
  { open: '[', close: ']', error: 57, score: 2 },
  { open: '{', close: '}', error: 1197, score: 3 },
  { open: '<', close: '>', error: 25137, score: 4 },
]
