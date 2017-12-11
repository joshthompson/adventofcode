AdventOfCode.day08 = {

	part1: input => {
		let variables = {}
		let inc = (key, x) => variables[key] = variables[key] ? variables[key] + x : x
		let dec = (key, x) => inc(key, -x)
		let get = key => variables[key] ? variables[key] : 0
		input.split('\n').map(line => line.split(' ')).forEach(cmd => {
			eval(`get('${cmd[4]}') ${cmd[5]} ${cmd[6]} ? ${cmd[1]}('${cmd[0]}', ${cmd[2]}) : false`)
		})
		return Math.max.apply(null, Object.keys(variables).map((key) => get(key)))
	},
	part2: input => {
		let variables = {}
		let inc = (key, x) => variables[key] = variables[key] ? variables[key] + x : x
		let dec = (key, x) => inc(key, -x)
		let get = key => variables[key] ? variables[key] : 0
		let highest = 0
		input.split('\n').map(line => line.split(' ')).forEach(cmd => {
			if (eval(`get('${cmd[4]}') ${cmd[5]} ${cmd[6]}`)) {
				eval(`${cmd[1]}('${cmd[0]}', ${cmd[2]})`)
				highest = Math.max(highest, variables[cmd[0]])
			}
		})
		return highest
	}

}