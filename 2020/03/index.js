const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const forest = data.toString().split('\n')
        .filter(line => line.length)
		.map(row => row.split(''))
    console.log('Part 1', numberOfTrees(forest, 3, 1))
    console.log('Part 2',
        numberOfTrees(forest, 1, 1) *
        numberOfTrees(forest, 3, 1) *
        numberOfTrees(forest, 5, 1) *
        numberOfTrees(forest, 7, 1) *
        numberOfTrees(forest, 1, 2)
    )
})

function numberOfTrees(forest, right, down) {
    let x = 0;
    let trees = 0;
    for (let y = 0; y < forest.length; y += down) {
        const row = forest[y]
        trees += row[x % row.length] === '#' ? 1 : 0
        x += right
    }
    return trees;
}
