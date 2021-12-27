import { readFile } from 'fs';

type SnailFishNumber = number | [SnailFishNumber, SnailFishNumber]

readFile(`${__dirname}/input.txt`, (_e, data) => {
  const start = +new Date()
  const numbers: SnailFishNumber[] = data.toString().split('\n').map(eval)
  console.log('Part 1', part1(numbers))
  console.log('Part 2', part2(numbers))
  console.log('Time:', new Date().getTime() - start, 'ms')
})

function part1(numbers: SnailFishNumber[]) {
  return popPop(reduce(add(...numbers)))
}

function part2(numbers: SnailFishNumber[]) {
  let maxMagnitude = 0
  for (let a = 0; a < numbers.length; a++) {
    for (let b = 0; b < numbers.length; b++) {
      if (a !== b) {
        const sum = popPop(add(numbers[a], numbers[b]))
        if (sum > maxMagnitude) {
          maxMagnitude = sum
        }
      }
    }
  }
  return maxMagnitude
}

function add(...numbers: SnailFishNumber[]) {
  return numbers.reduce((a, b) => a ? reduce([a, b]) : b)
}

function reduce(number: SnailFishNumber) {
  while (true) {

    const explosion = explodeNumber(number)
    if (explosion) {
      number = explosion
      continue
    }
    
    const split = splitNumber(number)
    if (split) {
      number = split
      continue
    }
    
    return number
  }
}

function explodeNumber(number: SnailFishNumber): SnailFishNumber {
  let json = JSON.stringify(number)
  let level = 0
  for (let i = 0; i < json.length; i++) {
    if (json[i] === '[') {
      level++
    }
    if (json[i] === ']') {
      level--
    }
    if (level > 4 && json[i + 1] !== '[') {
      const left = parseInt(json.substring(i).split(',')[0].substring(1))
      const right = parseInt(json.substring(i).split(',')[1].split(']')[0])
      let leftJson = json.substring(0, i)
      let rightJson = json.substring(i).split(']').slice(1).join(']')

      // Replace left number
      const leftNums = leftJson.match(/\d\d*/g)
      if (leftNums) {
        const leftNum = leftNums.map(Number)[leftNums.length - 1]
        const pos = leftJson.lastIndexOf(''+leftNum)
        leftJson = leftJson.substring(0, pos)
          + (leftNum + left)
          + leftJson.substring(pos + leftNum.toString().length)
      }

      // Replace left number
      const rightNums = rightJson.match(/\d\d*/g)
      if (rightNums) {
        const rightNum = rightNums.map(Number)[0]
        const pos = rightJson.indexOf(''+rightNum)
        rightJson = rightJson.substring(0, pos)
          + (rightNum + right)
          + rightJson.substring(pos + rightNum.toString().length)
      }
      return JSON.parse(`${leftJson}0${rightJson}`)
    }
  }
  return null
}

function splitNumber(number: SnailFishNumber) {
  const json = JSON.stringify(number)
  const num = json.match(/\d\d*/g).map(Number).find(n => n > 9)
  if (num) {
    const pos = json.indexOf(''+num)
    return JSON.parse(
      json.substring(0, pos)
      + `[${Math.floor(num / 2)}, ${Math.ceil(num / 2)}]`
      + json.substring(pos + num.toString().length)
    )
  }
}

function popPop(number: SnailFishNumber): number { // Magnitude
  if (number instanceof Array) {
    return 3 * popPop(number[0]) + 2 * popPop(number[1])
  } else {
    return number
  }
}
