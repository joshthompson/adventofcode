const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const report = data.toString().split('\n')
	console.log('Part 1', part1(report))
	console.log('Part 2', part2(report))
})

function part1(report) {
  const length = report[0].length
  let gamma = ''
  let epsilon = ''
  for (let i = 0; i < length; i++) {
    const mostCommon = getMostCommon(report, i)
    gamma += mostCommon ? 1 : 0
    epsilon += mostCommon ? 0 : 1
  }
  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

function part2(report) {
  let oxygen = reduceReport(report, 0, true)
  let co2 = reduceReport(report, 0, false)
  return parseInt(oxygen, 2) * parseInt(co2, 2)
}

function reduceReport(report, bitPosition, isMostCommon) {
  if (report.length <= 1) return report[0]
  let targetBit = getMostCommon(report, bitPosition)
  if (isMostCommon) targetBit = 1 - targetBit
  const filteredReport = report.filter(bits => bits[bitPosition] === targetBit.toString())
  return reduceReport(filteredReport, bitPosition + 1, isMostCommon)
}

function getMostCommon(report, bitPosition) {
  let bits = report.map(b => b[bitPosition])
  let ones = bits.filter(b => b === '1')
  return ones.length >= bits.length / 2 ? 1 : 0
}
