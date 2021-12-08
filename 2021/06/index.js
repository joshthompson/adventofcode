const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const fish = data.toString().split(',').map(Number)
	console.log('Part 1', breed(fish, 80))
	console.log('Part 2', breed(fish, 256))
})

function breed(fish, days) {
  let state = [0,0,0,0,0,0,0,0,0]
  fish.forEach(f => state[f]++)
  for (let day = 0; day < days; day++) {
    state = [
      state[1],
      state[2],
      state[3],
      state[4],
      state[5],
      state[6],
      state[7] + state[0],
      state[8],
      state[0],
    ]
  }
  return state.reduce((a, b) => a + b, 0)
}
