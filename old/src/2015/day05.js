AdventOfCode.day05 = {

	part1: input => {
		return input.split('\n').map(s => {
			return (s.match(/[aeiou]/g) ? s.match(/[aeiou]/g).length >= 3 : false)
				&& s.match(/(.)\1/)
				&& !s.match(/ab|cd|pq|xy/g) ? 1 : 0
		}).reduce((a, b) => a + b)
	},

	part2: input => {
		return input.split('\n').map(s => {
			return s.match(/((.){2})(.)*\1/g) && s.match(/(.)(.)\1/g) ? 1 : 0
		}).reduce((a, b) => a + b)
	}

}
