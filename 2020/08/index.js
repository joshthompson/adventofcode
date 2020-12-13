const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const ins = data.toString().split('\n').filter(line => line.length).map(i => ({
        cmd: i.split(' ')[0],
        val: parseInt(i.split(' ')[1])
    }))
	console.log('Part 1', run(ins))
	console.log('Part 2', fix(ins))
})

function run(ins, returnOnLoop = true) {
    let acc = 0
    let pos = 0
    const insIds = []
    while (pos < ins.length) {
        if (insIds.includes(pos)) return returnOnLoop ? acc : null
        insIds.push(pos)
        acc += ins[pos].cmd === 'acc' ? ins[pos].val : 0
        pos += ins[pos].cmd === 'jmp' ? ins[pos].val : 1
    }
    return acc
}

function fix(ins) {
    for (let i = 0; i < ins.length; i++) {
        if (ins[i].cmd !== 'acc') {
            const copy = [...ins]
            copy[i] = {
                cmd: ins[i].cmd === 'noc' ? 'jmp' : 'noc',
                val: ins[i].val
            }
            const result = run(copy, false)
            if (result !== null) return result
        }
    }
}
