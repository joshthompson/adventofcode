import { readFile } from 'fs';

readFile(`${__dirname}/input.txt`, (_e, data) => {
  const start = +new Date()
  const grid = data.toString().split('\n').map(line => line.split('').map(Number))
  console.log('Part 1', part1(grid))
  console.log('Next part is very suboptimal - takes ~10 minutes')
  console.log('Part 2', part2(grid))
  console.log('Time:', new Date().getTime() - start, 'ms')
})

interface Cell {
  x: number
  y: number
  value: number
  score: number
  to: Cell
}

function part1(grid: number[][]) {
  return dijkstra(generateMap(grid))
}

function part2(grid: number[][]) {
  const size = grid.length
  grid.forEach(row => {
    row.push(
      ...row.map(number => increaseRisk(number, 1)),
      ...row.map(number => increaseRisk(number, 2)),
      ...row.map(number => increaseRisk(number, 3)),
      ...row.map(number => increaseRisk(number, 4)),
    )
  })
  for (let n = 1; n < 5; n++) {
    for (let i = 0; i < size; i++) {
      grid[i + size * n] = grid[i].map(number => increaseRisk(number, n))
    }
  }
  return dijkstra(generateMap(grid))
}

function increaseRisk(number: number, n: number) {
  return (number + n - 1) % 9 + 1
}

function generateMap(grid: number[][]) {
  return grid.map(
    (row, y) => row.map(
      (value, x) => makeCell(x, y, value),
    ),
  )
}

function makeCell(x: number, y: number, value: number) {
  return {
    x,
    y,
    value,
    score: Number.MAX_SAFE_INTEGER,
    to: null,
  } as Cell
}

function dijkstra(map: Cell[][]) {
  const size = map.length
  const start = map[0][0]
  const end = map[size - 1][size - 1]

  let unvisted = map.flatMap(row => row)
  start.score = 0

  while (true) {
    unvisted.sort((a, b) => a.score - b.score)
    const current = unvisted.shift()
    const neighbours = unvisted.filter(cell =>
      cell.x === current.x - 1 && cell.y === current.y ||
      cell.x === current.x + 1 && cell.y === current.y ||
      cell.x === current.x && cell.y - 1 === current.y ||
      cell.x === current.x && cell.y + 1=== current.y
    )
    neighbours.forEach(neighbour => {
      const newScore = current.score + neighbour.value
      if (newScore < neighbour.score) {
        neighbour.score = newScore
        neighbour.to = current
      }
    })
    if (current === end) {
      return end.score
    }
  }
}
