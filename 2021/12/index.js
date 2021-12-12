const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
  const start = +new Date()
  const nodes = makeNodes(data.toString().split('\n'))
  console.log('Part 1', part1(nodes))
  console.log('Part 2', part2(nodes))
  console.log('Time:', new Date() - start, 'ms')
})

function part1(nodes) {
  const paths = findPaths(nodes, nodes.get('start'), nodes.get('end'), [], true)
  return paths.filter(path => path.some(node => !node.big && !node.special)).length
}

function part2(nodes) {
  return findPaths(nodes, nodes.get('start'), nodes.get('end'), [], false).length
}

function makeNodes(lines) {
  const nodes = new Map()
  lines.forEach(line => {
    const [to, from] = line.split('-')
    const toNode = nodes.get(to) || newNode(to)
    const fromNode = nodes.get(from) || newNode(from)
    toNode.children.push(fromNode)
    fromNode.children.push(toNode)
    nodes.set(to, toNode)
    nodes.set(from, fromNode)
  })
  return nodes
}

function newNode(name) {
  return {
    name,
    big: name.toUpperCase() === name,
    special: name === 'start' || name === 'end',
    children: []
  }
}

function findPaths(nodes, current, end, path, blockDoubleSmall) {
  if (current === end) {
    return [[...path, end]]
  }
  return current.children
    .filter(child => child.big || !path.includes(child) || (!blockDoubleSmall && !child.special))
    .map(child => {
      const newDouble = !blockDoubleSmall && !child.big && !child.special && path.includes(child)
      return findPaths(nodes, child, end, [...path, current], newDouble || blockDoubleSmall)
    }).flat()
}
