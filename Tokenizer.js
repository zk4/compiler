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
    if (!Number.isNaN(Number(string[0]))) {
      let number = '';
      while (!Number.isNaN(Number(string[this._cursor]))) {
        number += string[this._cursor++];
      }
      return {
        type: 'NUMBER',
        value: number
      }
    }
    if(string[0]==='"'){
      let s = "";
      do{
        s+=string[this._cursor++];
      }while(string[this._cursor]!=='"' && !this.isEOF())
      // skip "
      s+=string[this._cursor++];
      return {
        type: 'STRING',
        value: s
      }
    }

    return {
      type: 'UNSUPPORTED',
    };
  }
}

module.exports = {
  Tokenizer
}
