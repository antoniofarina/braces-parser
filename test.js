// INLINE TEST 
const BracesParser require ('./index').BracesParser

let icu_strings = [];
let test = new BracesParser();
let string = "";

test
  .on("braceopen", () => {
    //console.log("brace open", test.opened_map);
    string = string + "{";
  })


  .on("ontext", (text) => {
    //console.log("text is :", text, test.opened_map);

    if (test.opened_map.length > 0) {
      string = string + text;        
    }
  })
  .on("braceclose", () => {
    //console.log("brace closed ", test.opened_map);
    string = string + "}";
    if (test.opened_map.length == 0) {
      icu_strings.push(string);
      string = "";
    }
  });
  
  test.parse("Trainers: <strong>{ trainersCount, number }</strong>!")
  test.parse("You  have <span>{numFiles} active {file, plural, \none {file}\nother {files}\n}</span>. Copy all to {copyTo, select,\mainhd {Primary Hard Disk}\nusb {Usb Stick}\n}.")

