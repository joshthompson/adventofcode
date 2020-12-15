const ADD = 1
const MULTIPLY = 2
const INPUT = 3
const OUTPUT = 4
const JUMP_IF_TRUE = 5
const JUMP_IF_FALSE = 6
const LESS_THAN = 7
const EQUALS = 8
const ADJUST_RELATIVE_BASE = 9
const EXIT = 99

function* parallel(program, input = []) {
	cmds = [...program]
	input = [...input]
	let pos = 0
	let relativeBase = 0
	const output = []
	while (pos < cmds.length) {
		const opcode = cmds[pos] % 100
		const pm = `${Math.floor(cmds[pos] / 100)}`.split('').reverse().map(Number)
		const params = getParams(cmds, pos, pm, relativeBase)
		const offsets = params.map((_p, i) => pm[i] === 2 ? relativeBase : 0)
		switch (opcode) {
			case ADD:
				cmds[cmds[pos + 3] + offsets[2]] = (params[0] || 0) + (params[1] || 0)
				pos += 4
				break
			case MULTIPLY:
				cmds[cmds[pos + 3] + offsets[2]] = (params[0] || 0) * (params[1] || 0)
				pos += 4
				break
            case INPUT:
				cmds[cmds[pos + 1] + offsets[0]] = input.shift()
				pos += 2
				break
			case OUTPUT:
				output.push(params[0])
				input.push(...yield params[0])
				pos += 2
				break
			case JUMP_IF_TRUE:
				pos = params[0] !== 0 ? params[1] : pos + 3
				break;
			case JUMP_IF_FALSE:
				pos = params[0] === 0 ? params[1] : pos + 3
				break;
			case LESS_THAN:
				cmds[cmds[pos + 3] + offsets[2]] = params[0] < params[1] ? 1 : 0
				pos += 4
				break;
			case EQUALS:
				cmds[cmds[pos + 3] + offsets[2]] = params[0] === params[1] ? 1 : 0
				pos += 4
				break;
			case ADJUST_RELATIVE_BASE:
				relativeBase += params[0]
				pos += 2
				break;
			case EXIT:
				return output
			default: // Error
				throw `Unknown code: ${opcode}`
		}
	}
}

function run(program, input = []) {
	cmds = [...program]
	input = [...input]
	let pos = 0
	let relativeBase = 0
	const output = []
	while (pos < cmds.length) {
		const opcode = cmds[pos] % 100
		const pm = `${Math.floor(cmds[pos] / 100)}`.split('').reverse().map(Number)
		const params = getParams(cmds, pos, pm, relativeBase)
		const offsets = params.map((_p, i) => pm[i] === 2 ? relativeBase : 0)
		switch (opcode) {
			case ADD:
				cmds[cmds[pos + 3] + offsets[2]] = (params[0] || 0) + (params[1] || 0)
				pos += 4
				break
			case MULTIPLY:
				cmds[cmds[pos + 3] + offsets[2]] = (params[0] || 0) * (params[1] || 0)
				pos += 4
				break
            case INPUT:
				cmds[cmds[pos + 1] + offsets[0]] = input.shift()
				pos += 2
				break
			case OUTPUT:
				output.push(params[0])
				pos += 2
				break
			case JUMP_IF_TRUE:
				pos = params[0] !== 0 ? params[1] : pos + 3
				break;
			case JUMP_IF_FALSE:
				pos = params[0] === 0 ? params[1] : pos + 3
				break;
			case LESS_THAN:
				cmds[cmds[pos + 3] + offsets[2]] = params[0] < params[1] ? 1 : 0
				pos += 4
				break;
			case EQUALS:
				cmds[cmds[pos + 3] + offsets[2]] = params[0] === params[1] ? 1 : 0
				pos += 4
				break;
			case ADJUST_RELATIVE_BASE:
				relativeBase += params[0]
				pos += 2
				break;
			case EXIT:
				return output
			default: // Error
				throw `Unknown code: ${opcode}`
		}
	}
}

function getParams(cmds, pos, pm, relativeBase) {
	return [0,1,2].map(i => m(cmds, pos + i + 1, pm[i], relativeBase))
}

function m(cmds, i, mode = 0, relativeBase = 0) {
	switch (mode) {
		case 0: return cmds[cmds[i]]				// Position mode
		case 1: return cmds[i]						// Immediate mode
		case 2: return cmds[cmds[i] + relativeBase]	// Relative mode
		default: throw `Unknown parameter mode: ${mode}`
	}
}

module.exports = {
	run,
	parallel
}
