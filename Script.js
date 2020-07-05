const fs = require("fs");
const readLine = require("readline");
const lineInterface = readLine.createInterface({
  input: fs.createReadStream("givenprog.txt", "utf8"),
});
const converted = [];
const bracketStack = [];
const grammar = [",,", "::", "\"", "\'", ",,", ";;", "\`", "&&", "||", "&", "|", "{", "}", "(", ")", "==", "=", "--", "++", "<", ">", "+", "-", "/", "*"];
const replaceGrammar = [',', ':', "\'", "\"", ",", ";", ".", "&", "|", "&&", "||", "(", ")", "{", "}", "=", "==", "++", "--", "[", "]", "-", "+", "*", "/"];
const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const alphabets = ['z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const keyWords = ["UDBSUTCB", "TUOFNVHSB", "OBFMPPC", "LBFSC", "FUZC", "FTBD", "IDUBD", "SBID", "UTOPD", "FVOJUOPD", "SFHHVCFE", "UMVBGFE", "FUFMFE", "PE", "FMCVPE", "FTMF", "MBWF", "FTMBG", "MBOJG", "ZMMBOJG", "UBPMG", "SPG", "OPJUDOVG", "PUPH", "GJ", "TUOFNFMQNJ", "OJ", "GPFDOBUTOJ", "UOJ", "FDBGSFUOJ", "UFM", "HOPM", "FWJUBO", "XFO", "MMVO", "FHBLDBQ", "FUBWJSQ", "EFUDFUPSQ", "DJMCVQ", "OSVUFS", "USPIT", "DJUBUT", "IDUJXT", "EFAJOPSIDOZT", "TJIU", "XPSIU", "TXPSIU", "UOFJTOBSU", "FVSU", "ZSU", "GPFQZU", "SBW", "EJPW", "FMJUBMPW", "FMJIX", "IUJX", "EMFJZ"];
let lineNo = 0, convertedLine;
let topBracketStack = -1;
let result = true;
lineInterface.on("line", (line) => {
  if (result)
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
    if (lineOfCode[iter] === "{" || lineOfCode[iter] === "}" || lineOfCode[iter] === "(" || lineOfCode[iter] === ")") {
      if (!bracketStackSHandler(lineOfCode[iter])) {
        return false;
      }
    }
    else {
      if (keyWords.find(item => { return item === lineOfCode[iter] })) {
        switch (lineOfCode[iter]) {
          case 'GJ':
          case 'FMJIX':
          case 'SPG':
          case 'IDUJXT': if (lineOfCode[iter + 1] != "{") {
            return false;
          }
            break;
          case 'OPJUDOVG':
          case 'FTBD':
          case 'OSVUFS':
            if ((lineOfCode[iter + 1] != "\'") &&
              (lineOfCode[iter + 1] != '\"') &&
              (lineOfCode[iter + 1] != '{') &&
              (keyWords.find(item => { return (lineOfCode[iter + 1] === item) }))) {
              return false;
            }
            break;
        }
      }
    }
  }
  return true;
}
function convertLine(lineOfCode, line) {
  let tokens = lineOfCode.split(".");
  if (checkSyntax(tokens)) {
    tokens = tokens.map(item => { return convertToken(item) });
    if (tokens[tokens.length - 1] != "{" && tokens[tokens.length - 1] != '}' && tokens[tokens.length - 1] != ';' && tokens[tokens.length - 1] != ":") {
      tokens.push(";");
    }
    tokens = tokens.join("");
    return tokens;
  }
  else {
    console.log(`Syntax Error in Line : ${line}`);
    return -1;
  }
}
function convertToken(token) {
  let result = [];
  let space = false;
  if (grammar.find(item => { return (token === item) })) {
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
      if (keyWords.find(item => { return item === token })) {
        space = true;
      }
      for (let iter = 0; iter < token.length; iter++) {
        if (!isNaN(token[iter])) {
          let index = number.indexOf(token[iter]);
          if (index != -1)
            result.push(number[number.length - index - 1]);
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
      result = result.reverse().join("");
    }
  }
  if (space) {
    result = result + " ";
  }
  return result;
}