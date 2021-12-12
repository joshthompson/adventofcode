const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
  const start = +new Date()
  const map = new HeightMap(data.toString().split('\n').map(line => line.split('').map(Number)))
  map.renderBasins()
  console.log('Part 1', part1(map))
  console.log('Part 2', part2(map))
  console.log('Time:', new Date() - start, 'ms')
})

class HeightMap {
  constructor(data) {
    this.rows = data
  }

  get(x, y) {
    return this.rows[y] !== undefined ? this.rows[y][x] : undefined
  }

  isLowPoint(x, y) {
    const points = [
      this.get(x, y),
      this.get(x + 1, y),
      this.get(x, y + 1),
      this.get(x - 1, y),
      this.get(x, y - 1),
    ].filter(n => n !== undefined)
    const min = Math.min(...points)
    const max = Math.max(...points)
    return max !== min && this.get(x, y) === min
  }

  getLowPoints() {
    const points = []
    for (let y = 0; y < this.rows.length; y++) {
      for (let x = 0; x < this.rows[y].length; x++) {
        if (this.isLowPoint(x, y)) {
          points.push({ x, y, value: this.get(x, y) })
        }
      }
    }
    return points
  }

  getBasins() {
    const basins = this.getLowPoints().map(point => ({
      lowPoint: point,
      points: [point],
    }))

    basins.forEach(basin => {
      let expanded
      do {
        expanded = false
        basin.points.forEach(point => {
          const adjacentPoints = [
            { x: point.x + 1, y: point.y },
            { x: point.x, y: point.y + 1 },
            { x: point.x - 1, y: point.y },
            { x: point.x, y: point.y - 1 },
          ].filter(aP => !basin.points.find(p => p.x === aP.x && p.y === aP.y))

          adjacentPoints.forEach(({ x, y }) => {
            const value = this.get(x, y)
            if (value >= point.value && value < 9) {
              basin.points.push({ x, y, value: this.get(x, y) })
              expanded = true
            }
          })
        })
      } while (expanded)
    })
    return basins
  }

  renderBasins() {
    const basins = this.getBasins()

    const defaultColor = '\x1b[0m'
    const colours = [
      '\x1b[31m', // red
      '\x1b[32m', // green
      '\x1b[33m', // yellow
      '\x1b[34m', // blue
      '\x1b[35m', // magenta
      '\x1b[36m', // cyan
    ]

    const renderPoints = this.rows.map(row => row.map(n => ({ char: n, colour: defaultColor })))
    basins.forEach((basin, i) => {
      basin.points.forEach(point => {
        renderPoints[point.y][point.x].colour = colours[i % colours.length]
      })
    })

    let output = ''
    for (let y = 0; y < renderPoints.length; y++) {
      for (let x = 0; x < renderPoints[y].length; x++) {
        output += `${renderPoints[y][x].colour}${renderPoints[y][x].char}${defaultColor}`
      }
      output += '\n'
    }
    console.log(output)
  }
}

function part1(map) {
  return map.getLowPoints().map(p => p.value + 1).reduce((a, b) => a + b, 0)
}

function part2(map) {
  const sorted = map.getBasins().sort((a, b) => b.points.length - a.points.length)
  return sorted[0].points.length
       * sorted[1].points.length
       * sorted[2].points.length
}

