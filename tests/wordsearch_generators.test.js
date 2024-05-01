const generator = require("../public/scripts/wordsearch_generators");


// It should generate an array with code 65 to 90.
test('Test if function returns an array with UTF-16 code.', function ()
{
  utf_code = generator.generate_capital_letters_UTF16_code();
  expect(utf_code).toStrictEqual([65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
  75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
  90]);
});

test('Test if function returns capital letters alphabet, A-Z from array of UTF-16 code', function()
{
  utf_code = generator.generate_capital_letters_UTF16_code();
  alphabet = generator.generate_alphabet(utf_code);
  expect(alphabet).toStrictEqual(["A", "B", "C", "D", "E", "F", "G", "H", "I",
  "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y",
  "Z"]);
});
