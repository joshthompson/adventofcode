const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
  const start = +new Date()
  const { dots, folds } = processInput(data.toString())
  console.log('Part 1', part1(dots, folds))
  console.log('Part 2', part2(dots, folds))
  console.log('Time:', new Date() - start, 'ms')
})

function part1(dots, folds) {
  dots = foldPaper(dots, folds[0])
  return dots.map(row => row.filter(Boolean).length).reduce((a, b) => a + b, 0)
}

function part2(dots, folds) {
  folds.forEach(fold => dots = foldPaper(dots, fold))
  return render(dots)
}

function processInput(input) {
  const [dotsInput, foldsInput] = input.split('\n\n')

  let dots = []
  dotsInput.split('\n').forEach(line => {
    const [x, y] = line.split(',').map(Number)
    dots[y] = dots[y] || []
    dots[y][x] = true
  })
  dots = fill(dots)

  const folds = foldsInput.split('\n').map(line => {
    const [axis, position] = line.substr(11).split('=')
    return { axis, position: Number(position) }
  })
  return { dots, folds }
}

function render(dots) {
  return '\n' + dots.map(row => row.map(dot => dot ? '#' : '.').join('')).join('\n')
}

function fill(dots) {
  const maxY = dots.length - 1
  const maxX = Math.max(...dots.map(row => row.length - 1).filter(Boolean))
  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      dots[y] = dots[y] || []
      dots[y][x] = dots[y][x] || false
    }
  }
  return dots
}

function foldPaper(dots, { axis, position }) {
  const newDots = []

  for (let y = 0; y < dots.length; y++) {
    for (let x = 0; x < dots[y].length; x++) {
      if (dots[y][x]) {
        const newX = axis === 'x' && x > position ? 2 * position - x : x
        const newY = axis === 'y' && y > position ? 2 * position - y : y
        newDots[newY] = newDots[newY] || []
        newDots[newY][newX] = true
      }
    }
  }
  return fill(newDots)
}
