(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const generator = require("./wordsearch_generators");
const creator = require("./wordsearch_create_dom")

let game_grid = generator.generate_grid_of_letters(8, 8);
creator.create_DOM_elements_for_letters(game_grid);

},{"./wordsearch_create_dom":2,"./wordsearch_generators":3}],2:[function(require,module,exports){

/* GLOBAL VARIABLES: */
let start_x = 0;
let start_y = 0;
let last_node;
let head_node;

/* Nodes to keep data about elements and their position relative to:
  start_x and start_y
  this.angle - stores data about the angle between this element and
  start_x and start_y. This is to ensure that all the elements clicked are
  aligned in a horizontal, vertical or diagonal line. */
class LetterNode
{
  constructor(angle, letter, ele)
  {
    this.angle = angle;
    this.letter = letter
    this.element = ele;
    this.prev_node;
  }

  set_prev_node(node_)
  {
    this.prev_node = node_;
  }

  get_prev_node()
  {
    return this.prev_node;
  }

}


function create_DOM_elements_for_letters(letter_grid)
{
  // Create a div in the center of the window.
  let letter_box = document.createElement("div");
  letter_box.style.display = "flex";
  letter_box.style.position = "absolute";
  letter_box.style.top = "50%";
  letter_box.style.left = "50%";
  letter_box.style.transform = "translate(-50%, -50%)"
  letter_box.style.padding = "10px";
  document.body.appendChild(letter_box);

  // Start with a grey box and an information to start the game.
  letter_box.style.backgroundColor = "grey";
  letter_box.innerHTML = "Click here to start the game"

  // On click create a grid of letters.
  letter_box.addEventListener("click", function (e) {
        this.innerHTML = "";
        this.style.backgroundColor = "white";

        // Create a gird of letters.
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
            letter_container.style.border = "1px solid black";
            letter_container.innerHTML = letter_grid[row][letter];
          }
          letter_box.appendChild(letter_row);
        }


        for(let i = 0; i < letter_box.childNodes.length; i++)
        {
          for(let z = 0; z < letter_box.childNodes[i].childNodes.length; z++)
          {

            letter_box.childNodes[i].childNodes[z].addEventListener("click", function(e)
            {
              e.stopPropagation();
              // Get coordinates of the clicked element.
              let coordinates = letter_box.childNodes[i].childNodes[z].getBoundingClientRect();
              // Check color; If it's white keep it, if it's grey it means
              // it was clicked already so reject it.
              let check_color = window.getComputedStyle(this).getPropertyValue("background-color")

              // Get the angle between the clicked element and start_x and start_y
              // For the first clicked element the angle is 0.
              angle = Math.floor(Math.atan2(coordinates.y - start_y, coordinates.x - start_x) * 180/Math.PI);
              // Set start_x and start_y at the position of the first clicked element.
              if (start_x == 0 && start_y == 0)
              {
                start_x = coordinates.x;
                start_y = coordinates.y;
              }

              node = new LetterNode(angle, this.innerHTML, this)

              /* Check if the last clicked element was clicked again or if
                 any of the previously clicked elements were clicked again.
                 If one of those is equal to true then change the color of
                 all the clicked elements to white. */
              if (last_node && node.element == last_node.element ||
                check_color == "rgb(128, 128, 128)")
              {
                while (last_node != head_node)
                {
                  last_node.element.style.backgroundColor = "white";
                  last_node = last_node.prev_node;
                }
                if (last_node == head_node)
                {
                  last_node.element.style.backgroundColor = "white";
                  last_node = undefined;
                  head_node = undefined;
                  start_x = 0;
                  start_y = 0;
                  return;
                }
              }
              /* When element is clicked set up a head_node if there isn't one.
               Else add next node with head_node as the prev_node.
               Else add next_node depending on the angle between the second
               node and the head_node. Because when the head_node is set, the
               angle is equal to 0, second node is set to define angle.
               If the angle between the first node(first clicked element) and
               the second node(second clicked element) is e.g. 45 deg then only
               elements aligned with this angle are clickable. */
              else if (!head_node)
              {
                head_node = node;
                this.style.backgroundColor = "grey";
              }
              else if (node != head_node && !last_node)
              {
                node.set_prev_node(head_node)
                last_node = node
                this.style.backgroundColor = "grey";
              }
              // +/-4 deg of error.
              else if ((last_node.angle - 4) < angle && angle < (last_node.angle + 4))
              {
                node.set_prev_node(last_node)
                last_node = node
                this.style.backgroundColor = "grey";
              }
            });
          }
        }
  });
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
