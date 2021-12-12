const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
  const start = +new Date()
	const lines = data.toString().split('\n').map(line => new Line(line))
	console.log('Part 1', part1(lines))
	console.log('Part 2', part2(lines))
  console.log('Time:', new Date() - start, 'ms')
})

class Line {
  constructor(line) {
    const [[x1, y1], [x2, y2]] = line.split(' -> ').map(s => s.split(',').map(Number))
    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }
}

function part1(lines) {
  let grid = generateGrid(lines)
  lines.forEach(line => {
    if (line.x1 === line.x2 || line.y1 === line.y2) {
      grid = addLine(grid, line)
    }
  })
  return grid.flat().filter(x => x > 1).length
}

function part2(lines) {
  let grid = generateGrid(lines)
  lines.forEach(line => grid = addLine(grid, line))
  return grid.flat().filter(x => x > 1).length
}

function addLine(grid, {x1, x2, y1, y2}) {
  let [x, y] = [x1, y1]
  grid[x][y]++
  while (x !== x2 || y !== y2) {
    x = x < x2 ? x + 1 : (x > x2 ? x - 1 : x)
    y = y < y2 ? y + 1 : (y > y2 ? y - 1 : y)
    grid[x][y]++
  }
  return grid
}

function generateGrid(lines) {
  const xPoints = lines.map(line => [line.x1, line.x2]).flat()
  const yPoints = lines.map(line => [line.y1, line.y2]).flat()
  const xMax = Math.max(...xPoints)
  const yMax = Math.max(...yPoints)
  return Array.from({ length: yMax+1 }, () => new Array(xMax+1).fill(0));
}
