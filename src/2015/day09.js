AdventOfCode.day09 = {

	part1: input => {
		let distances = {}
		input.split('\n').forEach(text => {
			let data = text.match(/([a-zA-Z]*) to ([a-zA-Z]*) = ([0-9]*)/i)
			distances[data[1]] = distances[data[1]] ? distances[data[1]] : {}
			distances[data[2]] = distances[data[2]] ? distances[data[2]] : {}
			distances[data[1]][data[2]] = distances[data[2]][data[1]] = parseInt(data[3])
		})
		console.log(distances)

		_.forEach(distances, () => {
			
		})
	},

	part2: input => {}

}
