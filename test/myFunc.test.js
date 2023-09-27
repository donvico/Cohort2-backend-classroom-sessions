const sum = require("../myFunc");

test('Function return the sum of two numbers', ()=>{
    expect(sum(2, 3)).toBe(5)
})

test('Expects the sum to be 5 not 4', ()=>{
    expect(sum(2, 3)).not.toBe(4)
})