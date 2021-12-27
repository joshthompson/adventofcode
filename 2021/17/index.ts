import { readFile } from 'fs';

readFile(`${__dirname}/input.txt`, (_e, data) => {
  const start = +new Date()
  const target = new Target(data.toString())
  console.log('Part 1', part1(target))
  console.log('Part 2', part2(target))
  console.log('Time:', new Date().getTime() - start, 'ms')
})

interface Vector {
  x: number
  y: number
}

class Target {
  public min: Vector
  public max: Vector
  constructor(input: string) {
    const values = input.substring(15).split(', y=').map(s => s.split('..'))
    this.min = {
      x: parseInt(values[0][0]),
      y: parseInt(values[1][0]),
    }
    this.max = {
      x: parseInt(values[0][1]),
      y: parseInt(values[1][1]),
    }
  }
}

function part1(target: Target) {
  return triangularNumber(-target.min.y - 1)
}

function part2(target: Target) {
  const min: Vector = {
    x: Math.ceil(reverseTriangularNumber(target.min.x)),
    y: target.min.y,
  }
  const max: Vector = {
    x: target.max.x,
    y: -target.min.y,
  }
  let hits = 0
  for (let y = min.y; y <= max.y; y++) {
    for (let x = min.x; x <= max.x; x++) {
      hits += hitTarget({ x, y }, target)
    }
  }
  return hits
}

function reverseTriangularNumber(x: number) {
  return (-1 + Math.sqrt(1 + 8 * x)) / 2
}

function triangularNumber(n: number) {
  return n * (n + 1) / 2
}

function hitTarget(velocity: Vector, target: Target) {
  const pos: Vector = { x: 0, y: 0 }
  while (pos.x <= target.max.x && pos.y >= target.min.y) {
    pos.x += velocity.x
    pos.y += velocity.y
    velocity.y--
    if (velocity.x > 0) velocity.x--
    if (velocity.x < 0) velocity.x++

    const xCheck = pos.x >= target.min.x && pos.x <= target.max.x
    const yCheck = pos.y >= target.min.y && pos.y <= target.max.y
    if (xCheck && yCheck) {
      return 1
    }
  }
  return 0
}
