AdventOfCode.day07 = {

	part1: input => {
		let programs = {}
		input.split('\n').forEach(line => {
			line = line.split(' ')
			let name = line[0]
			programs[name] = programs[name] ? programs[name] : {name: name, count: 0}
			line.splice(3).forEach(child => {
				child = child.replace(',', '')
				programs[child] = programs[child] ? programs[child] : {name: child, count: 0}
				programs[child].count++
			})
		})
		return _.filter(programs, program => !program.count)[0].name
	},

	part2: input => { // Want to simplify
		let registry = {}
		input.split('\n').forEach(line => {
			line = line.split(' ')
			registry[line[0]] = {
				parent: null,
				name: line[0],
				weight: parseInt(line[1].substr(1)),
				children: line.splice(3)
			}
		})
		let badProgram = null
		let processChildren = program => {
			program.childrensWeights = []
			program.children.forEach((child, i) => {
				program.children[i] = registry[child.replace(',', '')]
				program.children[i].parent = program.name
				let weight = processChildren(program.children[i])
				program.childrensWeights.push(weight)
			})
			program.balanced = _.uniq(program.childrensWeights).length <= 1
			if (!program.balanced && _.filter(program.children, child => !child.balanced).length === 0) {
				badProgram = program
			}
			return program.childrensWeights.reduce((a, b) => a + b, 0) + program.weight
		} 


		let bottomProgram = AdventOfCode.day07.part1(input)
		let tree = registry[bottomProgram]
		processChildren(tree) // And set badProgram

		let weightCount = {}
		badProgram.childrensWeights.forEach(w => {
			weightCount[w] = weightCount[w] ? weightCount[w] : {weight: w, count: 0}
			weightCount[w].count++
		})

		let badWeight = _.filter(weightCount, w => w.count === 1)[0].weight
		let goodWeight = _.filter(weightCount, w => w.count !== 1)[0].weight
		let badChild = badProgram.children[badProgram.childrensWeights.indexOf(badWeight)]
		return badChild.weight + goodWeight - badWeight
	}

}