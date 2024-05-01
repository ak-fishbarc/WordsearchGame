const generator = require("./wordsearch_generators");
const creator = require("./wordsearch_create_dom")

let game_grid = generator.generate_grid_of_letters(8, 8);
creator.create_DOM_elements_for_letters(game_grid);
