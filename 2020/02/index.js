const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const passwords = data.toString().split('\n')
        .filter(line => line.length)
		.map(pw => {
            const d = /^(\d+)-(\d+) (.): (.+)$/g.exec(pw.trim())
            return d ? {
                min: parseInt(d[1], 10),
                max: parseInt(d[2], 10),
                char: d[3],
                word: d[4]
            } : null
        })
    console.log('Part 1', numberOfValidPasswords1(passwords))
    console.log('Part 2', numberOfValidPasswords2(passwords))
})

function numberOfValidPasswords1(passwords) {
    let valid = 0
    passwords.forEach(p => {
        const chars = p.word.replace(new RegExp(`[^${p.char}]`, 'g'), '').length
        if (chars >= p.min && chars <= p.max) {
            valid++
        }
    })
    return valid
}

function numberOfValidPasswords2(passwords) {
    let valid = 0
    passwords.forEach(p => {
        const score1 = p.word[p.min - 1] === p.char ? 1 : 0
        const score2 = p.word[p.max - 1] === p.char ? 1 : 0
        if (score1 + score2 === 1) {
            valid++
        }
    })
    return valid
}
