

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
