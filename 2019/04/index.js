// Puzzle input: 264360-746325
const min = 264360
const max = 746325
let total1 = 0
let total2 = 0

function check(i) {
    const pw = `${i}`.split('').map(Number)
    const sorted = [...pw].sort((a, b) => a - b)
    const rule1 = pw.find((c, i) => i > 0 && c === pw[i - 1])
    const rule2 = rule1 && pw.every((c, i) => c === sorted[i])
    const rule3 = rule1 && rule2 && pw.find((c, i) => c === pw[i - 1] && c !== pw[i - 2] && c !== pw[i + 1])
    return [ rule2, rule3 ]
}

for (let i = min; i <= max; i++) {
    const ch = check(i)
    total1 += ch[0] ? 1 : 0
    total2 += ch[1] ? 1 : 0
}

console.log('Part 1', total1)
console.log('Part 2', total2)
