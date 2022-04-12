const {Parser} = require('../Parser')
const tests = [require('./literal-test')]
const assert = require('assert')


const parser = new Parser();
function exec()
{
  const Program = `  

  // comment
  /* 
   *  multi line
   */
  42  

  `;
  const ast = parser.parse(Program)

  console.log(JSON.stringify(ast,null,2))
}


function test(program,expected){
  const ast = parser.parse(program)
  assert.deepEqual(ast,expected)
}


tests.forEach(testRun => testRun(test))
console.log("All assertions passed!")
