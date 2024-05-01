(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const generator = require("./wordsearch_generators");
const creator = require("./wordsearch_create_dom")

let game_grid = generator.generate_grid_of_letters(8, 8);
creator.create_DOM_elements_for_letters(game_grid);

},{"./wordsearch_create_dom":2,"./wordsearch_generators":3}],2:[function(require,module,exports){


function create_DOM_elements_for_letters(letter_grid)
{
  let letter_box = document.createElement("div");
  letter_box.style.display = "flex";
  letter_box.style.position = "absolute";
  letter_box.style.top = "50%";
  letter_box.style.left = "50%";
  letter_box.style.transform = "translate(-50%, -50%)"
  letter_box.style.padding = "10px";
  document.body.appendChild(letter_box);

  for (row in letter_grid)
  {
    let letter_row = document.createElement("div");
    letter_row.style.margin = "auto";
    for (letter in letter_grid[row])
    {
      let letter_container = document.createElement("div");
      letter_row.appendChild(letter_container);
      letter_container.style.textAlign = "center";
      letter_container.style.width = "50px";
      letter_container.style.height = "50px";
      letter_container.innerHTML = letter_grid[row][letter];
      letter_container.addEventListener("click", function () {
        console.log("Test");
      });
    }
    letter_box.appendChild(letter_row);
  }
}

module.exports = { create_DOM_elements_for_letters }

},{}],3:[function(require,module,exports){


function generate_capital_letters_UTF16_code()
{
  let numbers = [];
  // "A" = 65, "Z" = 90
  for (let i = 65; i < 91; i++)
  {
    numbers.push(i);
  }
  return numbers;
}

function generate_alphabet(number_code)
{
  let alphabet = [];

  for (charcode in number_code)
  {
    alphabet.push(String.fromCharCode(number_code[charcode]));
  }

  return alphabet;
}

function generate_grid_of_letters(columns, rows)
{
  const code = generate_capital_letters_UTF16_code();
  const alphabet = generate_alphabet(code);

  let letter_grid = [];
  let random_num = Math.floor(Math.random() * 25);

  for(let i = 0; i < columns; i++)
  {
    letter_grid[i] = new Array();
    for (let z = 0; z < rows; z++)
    {
      letter_grid[i][z] = alphabet[random_num];
      random_num = Math.floor(Math.random() * 25);
    }
  }
  return letter_grid;
}

module.exports =
{
  generate_capital_letters_UTF16_code,
  generate_alphabet,
  generate_grid_of_letters
}

},{}]},{},[1]);
