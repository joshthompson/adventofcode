AdventOfCode.day04 = {

	part1: input => {
		let passphrases = input.split('\n').map(line => line.split(' '))
		return AdventOfCode.day04.valid(passphrases)
	},

	part2: input => {
		let passphrases = input.split('\n').map(line => line.split(' ').map((word) => {
			return word.split('').sort((a,b)=>a>b).join('')
		}))
		return AdventOfCode.day04.valid(passphrases)
	},

	valid: (passphrases) => {
		let valid = 0
		passphrases.forEach((phrases) => {
			var phrasesValid = true
			phrases.forEach((word, i) => {
				if (phrases.indexOf(word) !== i) {
					return phrasesValid = false
				}
			})
			valid += phrasesValid ? 1 : 0
		})
		return valid
	}

}