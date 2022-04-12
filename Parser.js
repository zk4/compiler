const {Tokenizer} =require('./Tokenizer')

class Parser {
  constructor(){
    this._tokenizer = new Tokenizer();
  }
  parser(string){
    this._string =string;
    this._tokenizer.init(string);

    this._lookhead = this._tokenizer.getNextToken();

    return this.Program();

  }
  /**
   * Main entry point 
   * Program:
   *  :NumericLiteral 
   */
  Program(){
    return this.NumericLiteral();

  }
  NumericLiteral(){
    const token = this._eat('NUMBER')
    return {
      type: 'NumericLiteral',
      value: Number(token.value)
    }
  }
  _eat(tokenType){
    const token = this._lookhead;
    if(token == null){
      throw new SyntaxError(`Unexpected end of input, expected ${tokenType}`)
    }
    if(token.type !== tokenType){
      throw new SyntaxError(`Unexpected token: ${token.value} expected ${tokenType}`)
    }

    this._lookhead = this._tokenizer.getNextToken();

    return token;
  }
}
module.exports={
  Parser
} 
