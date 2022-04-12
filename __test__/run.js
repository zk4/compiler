const {Parser} = require('../Parser')


const parser = new Parser();
const Program = "42";
const ast = parser.parser(Program)

console.log(JSON.stringify(ast))
