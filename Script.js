const fs = require("fs");
const readLine = require("readline");
const lineInterface = readLine.createInterface({
  input: fs.createReadStream("avengersHelloProgram.txt", "utf8"),
});
const grammar = [",,", "::", "\"", "\'", ",,", ";;", "\`", "&&", "||", "&", "|", "{", "}", "(", ")", "==", "=", "--", "++"];
const replaceGrammar = [',', ':', "\'", "\"", ",", ";", ".", "&", "|", "&&", "||", "(", ")", "{", "}", "=", "==", "++", "--"];
const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const alphabets = ['z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let lineNo = 0, convertedLine;
let converted = [];
let bracketStack = [];
let topBracketStack = -1;
let result = true;
lineInterface.on("line", (line) => {
  convertedLine = convertLine(line, ++lineNo);
  if (convertedLine === -1) {
    result = false;
  }
  else {
    converted.push(convertedLine);
  }
});
lineInterface.on('close', () => {
  if (result) {
    for (let iter = 0; iter < converted.length; iter++) {
      console.log(converted[iter]);
    }
  }
});
function bracketStackSHandler(item) {
  if (item == "{" || item == "(") {
    bracketStack[++topBracketStack] = (item);
    return true;
  }
  else {
    if (topBracketStack >= 0) {
      if (item == ")" && bracketStack[topBracketStack] == "(") {
        topBracketStack--;
        return true;
      }
      else if (item == "}" && bracketStack[topBracketStack] == "{") {
        topBracketStack--;
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }
}
function checkSyntax(lineOfCode) {
  for (let iter = 0; iter < lineOfCode.length; iter++) {
    if (lineOfCode[iter] == "{" || lineOfCode[iter] == "}" || lineOfCode[iter] == "(" || lineOfCode[iter] == ")") {
      if (!bracketStackSHandler(lineOfCode[iter])) {
        return false;
      }
    }
    else {

    }
  }
  return true;
}
function convertLine(lineOfCode, line) {
  let tokens = lineOfCode.split(".");
  if (checkSyntax(tokens)) {
    for (let iter = 0; iter < tokens.length; iter++) {
      tokens[iter] = convertToken(tokens[iter]);
    }
    if (tokens[tokens.length - 1] != "{" && tokens[tokens.length - 1] != '}') {
      tokens.push(";");
    }
    tokens = tokens.join("");
    return tokens;
  }
  else {
    console.log(`Syntax Error in Line : ${lineNo}`);
    return -1;
  }
}
function convertToken(token) {
  let result = [];
  const inGrammar = (token) => {
    for (let iter = 0; iter < grammar.length; iter++) {
      if (grammar[iter] === token) {
        return true;
      }
    }
  }
  const strrev = (token) => {
    res = "";
    for (let iter = token.length - 1; iter > -1; iter--) {
      res = res + token[iter];
    }
    return res;
  }
  if (inGrammar(token)) {
    let index = grammar.indexOf(token);
    result.push(replaceGrammar[index]);
  }
  else {
    if (token[0] === "\'" || token[0] === "\"") {
      let tempResult = [];
      tempResult.push(replaceGrammar[grammar.indexOf(token[0])]);
      tempResult.push(token.split(token[0]).join(""));
      tempResult.push(replaceGrammar[grammar.indexOf(token[token.length - 1])]);
      result.push(tempResult.join(""));
    }
    else {
      for (let iter = 0; iter < token.length; iter++) {
        if (!isNaN(token[iter])) {
          let index = number.indexOf(token[iter]);
          if (index != -1)
            result.push(number[number.length - index]);
        }
        else if (token[iter] == token[iter].toLowerCase()) {
          let index = alphabets.indexOf(token[iter]);
          if (index != -1)
            result.push(alphabets[index - 1].toUpperCase());
        }
        else {
          let index = alphabets.indexOf(token[iter].toLowerCase());
          if (index != -1)
            result.push(alphabets[index - 1]);
        }
      }
      result = strrev(result);
    }
  }
  return result;
}