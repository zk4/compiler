const Spec =[
  // whitespace:
  [/^\s+/,null],

  // skip single-line comments:
  [/^\/\/.*/,null],

  // skip multi-line comments:
  // /* xxx */
  [/^\/\*[\s\S]*?\*\//,null],

  // Numbers:
  [/^\d+/,'NUMBER'],

  // Strings:
  [/^"[^"]*"/,'STRING'],
  [/^'[^']*'/,'STRING']
]
class Tokenizer {

  init(string) {
    this._string = string;
    this._cursor = 0;
  }
  isEOF(){
    return this._cursor === this._string.length;
  }
  hasMoreToken() {
    return this._cursor < this._string.length;
  }
  getNextToken() {
    if (!this.hasMoreToken()) {
      return null;
    }
    const string = this._string.slice(this._cursor);


    for(const [regexp,tokenType] of Spec){
      const tokenValue = this._match(regexp,string);

      if(tokenValue == null){
        continue;
      }
      if(tokenType == null){
        // should skip token, e.g. whitespace
        return this.getNextToken();
      }

      return {
        type: tokenType,
        value: tokenValue
      }
    }
    throw new SyntaxError(`Unexpected token: "${string[0]}"`)
  }

  _match(regexp,string){
    const matched = regexp.exec(string);
    if(matched == null){
      return null;
    }
    this._cursor += matched[0].length;
    return matched[0];
  }
}

module.exports = {
  Tokenizer
}
