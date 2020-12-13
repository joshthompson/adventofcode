const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
    // data = 'F10\nN3\nF7\nR90\nF11'
    let instructions = data.toString().split('\n').filter(line => line.length).map(Instruction)
    console.log('Round answers if applicable due to accuracy lost in trig functions')
	console.log('Part 1', part1(instructions))
	console.log('Part 2', part2(instructions))
})

function part1(instructions) {
    let x = 0
    let y = 0
    let r = 0
    instructions.forEach(({ action, value }) => {
        switch (action) {
            case 'N': y += value; break
            case 'S': y -= value; break
            case 'E': x += value; break
            case 'W': x -= value; break
            case 'L': r += value; break
            case 'R': r -= value; break;
            case 'F':
                x += Math.cos(r * Math.PI / 180) * value
                y += Math.sin(r * Math.PI / 180) * value
                break;
        }
    })
	return Math.abs(x) + Math.abs(y)
}

function part2(instructions) {
    let sx = 0
    let sy = 0
    let wx = 10
    let wy = 1
    instructions.forEach(({ action, value }) => {
        switch (action) {
            case 'N': wy += value; break
            case 'S': wy -= value; break
            case 'E': wx += value; break
            case 'W': wx -= value; break
            case 'L':
            case 'R':
                const distance = Math.sqrt(wx**2 + wy**2)
                const rotate = (value * Math.PI / 180) * (action === 'L' ? 1 : -1)
                const angle = Math.atan2(wy, wx)
                wx = Math.cos(angle + rotate) * distance
                wy = Math.sin(angle + rotate) * distance
                break;
            case 'F':
                sx += wx * value
                sy += wy * value
                break;
        }
    })
	return Math.abs(sx) + Math.abs(sy)
}

function Instruction(input) {
    return {
        action: input[0],
        value: Number(input.substr(1))
    }
}