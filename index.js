/*
 * Antonio Farina
 * ant.farina@gmail.com
 * Created on Mon Jun 29 2020 3:20:19 AM
 *
 *
 * The MIT License (MIT)
 * Copyright (c) 2020 Antonio Farina
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
 */

const EventEmitter = require("events").EventEmitter;
const { isString } = require("lodash");

class BracesParser extends EventEmitter {

  constructor() {
    super();
    this.opened_map = [];
  }

  async parse(text = "") {
    if (!isString(text)) {
      throw "text is not a string";
    }
    let _text = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] == "{") {
        // console.log ("op text ", _text)
        if (_text.length) {
          this.emit("ontext", _text);
          _text = "";
        }
        this.opened_map.push("{");
        this.emit("braceopen");
      }
      if (text[i] == "}") {
        // console.log ("cl text ", _text)
        if (_text.length) {
          this.emit("ontext", _text);
          _text = "";
        }
        this.opened_map.pop();
        this.emit("braceclose");
      }

      if (!["{", "}"].includes(text[i])) {
        // console.log ("t ", text[i])
        _text = _text + text[i];
        // console.log ("tt", _text)
      }
    }
    if (_text.length) {
      this.emit("ontext", _text);
      _text = "";
    }
  }
}
module.exports.BracesParser = BracesParser;



