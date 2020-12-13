function* g() {
    let i = 0
    while (i < 100) {
        console.log('...')
        i += yield i * 2
    }
    return 'AABABDASD'
}

const a = g()

console.log(a.next(1))
console.log(a.next(0))
console.log(a.next(1))