const fs = require('fs')
const _ = require('lodash')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const foods = data.toString().split('\n').filter(food => food.length).map(({
		ingredients: food.split(' (')[0].split(' '),
		allergens: /^contains (.*[, ]?)\)$/g.exec(food.split(' (')[1])[1].split(', ')
	}))
	run(foods)
})
function run(foods) {
	const allAllergens = []
	const allIngredients = new Set()
	foods.forEach(food => {
		food.allergens.forEach(allergen => {
			let found = allAllergens.find(a => a.name === allergen)
			if (!found) {
				allAllergens.push({
					name: allergen,
					foods: [],
					possible: [],
					ingredient: null
				})
				found = allAllergens[allAllergens.length - 1]
			}
			found.foods.push(food)
		})
		food.ingredients.forEach(ingredient => allIngredients.add(ingredient))
	})

	allAllergens.forEach(allergen => {
		allergen.possible = _.intersection(...allergen.foods.map(food => food.ingredients))
	})
	
	let filtered = allAllergens.filter(allergen => !allergen.ingredient)
	while (filtered.length) {
		const sorted = filtered.sort((a, b) => a.possible.length - b.possible.length)
		sorted[0].ingredient = sorted[0].possible[0]
		allAllergens.forEach(allergen => {
			allergen.possible = allergen.possible.filter(i => i !== sorted[0].ingredient)
		})
		filtered = allAllergens.filter(allergen => !allergen.ingredient)
	}

	let doNotAppear = [...allIngredients]
	allAllergens.forEach(allergen => {
		doNotAppear = doNotAppear.filter(dna => dna !== allergen.ingredient)
	})

	let count = 0
	foods.forEach(food => food.ingredients.forEach(i => {
		if (doNotAppear.includes(i)) count++
	}))

	console.log('Part 1:', count)
	console.log('Part 2:', allAllergens.sort((a, b) => a.name > b.name ? 1 : -1).map(a => a.ingredient).join(','))
}
