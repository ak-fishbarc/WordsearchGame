

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
