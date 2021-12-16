const fs = require('fs')

const start = +new Date()
fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
  const { polymerTemplate, pairInsertionRules } = processInput(data.toString())
  console.log('Part 1', run(polymerTemplate, pairInsertionRules, 10))
  console.log('Part 2', run(polymerTemplate, pairInsertionRules, 40))
  console.log('Time:', new Date() - start, 'ms')
})

function processInput(input) {
  const [polymerTemplate, rulesInput] = input.split('\n\n')
  const pairInsertionRules = new Map(rulesInput.split('\n').map(rule => rule.split(' -> ')))
  return { polymerTemplate, pairInsertionRules }
}

function run(polymerTemplate, pairInsertionRules, iterations) {
  const pairs = {}
  const chars = {}
  for (let p = 0; p < polymerTemplate.length; p++) {
    chars[polymerTemplate[p]] = (chars[polymerTemplate[p]] || 0) + 1
    if (polymerTemplate[p + 1]) {
      const pair = polymerTemplate[p] + polymerTemplate[p + 1]
      pairs[pair] = (pairs[pair] || 0) + 1
    }
  }
  for (let i = 0; i < iterations; i++) {
    const currentPairs = Object.entries(pairs)
    for (let p in pairs) {
      pairs[p] = 0
    }
    currentPairs.forEach(([pair, tally]) => {
      const rule = pairInsertionRules.get(pair)
      if (rule) {
        const pair1 = pair[0] + rule
        const pair2 = rule + pair[1]
        chars[rule] = (chars[rule] || 0) + tally
        pairs[pair1] = (pairs[pair1] || 0) + tally
        pairs[pair2] = (pairs[pair2] || 0) + tally
      }
    })
  }
  const values = Object.values(chars).sort((a, b) => a - b)
  return values[values.length - 1] - values[0]
}
