AdventOfCode.day09 = {

	process: input => {
		let network = {}
		input.split('\n').forEach(text => {
			let d = text.match(/([a-zA-Z]*) to ([a-zA-Z]*) = ([0-9]*)/i)
			network[d[1]] = network[d[1]] ? network[d[1]] : {}
			network[d[2]] = network[d[2]] ? network[d[2]] : {}
			network[d[1]][d[2]] = network[d[2]][d[1]] = parseInt(d[3])
		})
		console.log(network)
		return network
	},

	findShortestRoute: (map) => {
		_.forEach(distances, distance => {
			let route = [city]
			routes.push(route)
		})
	},

	part1: input => {
		let map = AdventOfCode.day09.process(input)
		let routes = {}
		let shortest = false
		_.forEach(map, (distances, city) => {
			AdventOfCode.day09.findShortestRoute(map)
		})
	},

	part2: input => {}

}
