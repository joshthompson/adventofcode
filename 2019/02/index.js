const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
    const cmds = data.toString().split(',').filter(v => v.trim().length).map(Number)
	console.log('Part 1', run(cmds, 12, 02))
	console.log('Part 2', findInput(cmds, 19690720))
})

function run(cmds, noun, verb) {
    cmds = [...cmds]
    cmds[1] = noun
    cmds[2] = verb
    let pos = 0
    while (true) {
        switch (cmds[pos]) {
            case 1: cmds[cmds[pos + 3]] = cmds[cmds[pos + 1]] + cmds[cmds[pos + 2]]; break
            case 2: cmds[cmds[pos + 3]] = cmds[cmds[pos + 1]] * cmds[cmds[pos + 2]]; break
            case 99: return cmds[0]
            default: throw `Unknown code: ${cmds[pos]}`
        }
        pos += 4
    }
}

function findInput(cmds, value) {
    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb <= 99; verb++) {
            if (run(cmds, noun, verb) === value) {
                return 100 * noun + verb
            }
        }
    }
}