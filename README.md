# braces-parser
parse a dtring char by char and emit events when meet open braces, closed braces, text


# a to-develop idea
/
//Parse and transform to html
let string_html = "";
let select_or_plural = false;
test
  .on("braceopen", () => {
    console.log("brace open", test.opened_map);
    string = string + "{";
  })


  .on("ontext", (text) => {
    console.log("text is :", text, test.opened_map);

    if (test.opened_map.length > 0) {
      string = string + text;
      let parts = text.split(",");
      console.log("parts ", parts, parts.length);
        if (parts.length > 1 &&
        ["plural", "select", "selectordinal"].includes(parts[1].trim())
      ) {
        console.log("-- plural or select");
          select_or_plural = true;
          string_html = string_html + '<ul name = "' + parts[0] + '" data-type="' + parts[1] + '" class="TRANSFORM ICU" data-base64="##BASE64PLACEHOLD##"> <li data-value="' + parts[2]+ '" data-source="'
      }
        
      if (parts.length > 1 &&
        [
          "date", "duration", "number", "ordinal",
          "spellout", "time",
        ].includes(parts[1].trim())
      ) {
          console.log("-- not plural or select");
          select_or_plural = false
          string_html += "<NOEDIT__>" + text 
      }
        
    if (parts.length > 1 &&
            ![
          "date", "duration","number", "ordinal", "plural",
          "select", "selectordinal", "spellout", "time",
        ].includes(parts[1].trim())
      ) {
        console.log("-- not in icu start tag");
        string_html += "<NOEDIT_!>" + text 
    }
        
    if (parts.length < 1) {
    console.log("-- not in icu start tag");
    if (select_or_plural) {
        string_html += text + '">' + text + "</li>"
    } else {
        string_html += "<NOEDIT>" + text 
    }
        
  }
        
    }
  })
  .on("braceclose", () => {
    console.log("brace closed ", test.opened_map);
    string = string + "}";
    if (test.opened_map.length == 0) {
        if (select_or_plural) {
            string_html += text + '"</ul>'
        } else {
            string_html += "<NOEDIT>" + text 
        }
      icu_strings.push([string, is_icu]);
      string = "";
      is_icu = false;
    }
  });



  

    

