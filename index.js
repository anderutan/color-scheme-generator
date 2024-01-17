const form = document.querySelector('#color-form');
const colorPicker = document.querySelector('#color-picker');
const colorDropDownMenu = document.querySelector('#color-drop-down-menu');
const divColorColumnWrap = document.querySelector('.color-column-wrap');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const divColorContainer = document.querySelector('.color-container');
  if (divColorContainer) {
    divColorContainer.remove();
  }
  const color = colorPicker.value.slice(1);
  const mode = colorDropDownMenu.value;
  fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`)
    .then((res) => res.json())
    .then((data) => {
      colorsArray = data.colors;
      renderColor(colorsArray);
    });
});

/* Boilerplate
<div class="color-container">
        <div class="color-column-wrap">
          <div class="color-column"></div>
          <p class="color-code">Color 1</p>
        </div>
        <div class="color-column-wrap">
          <div class="color-column"></div>
          <p class="color-code">Color 2</p>
        </div>
        <div class="color-column-wrap">
          <div class="color-column"></div>
          <p class="color-code">Color 3</p>
        </div>
        <div class="color-column-wrap">
          <div class="color-column"></div>
          <p class="color-code">Color 4</p>
        </div>
        <div class="color-column-wrap">
          <div class="color-column"></div>
          <p class="color-code">Color 5</p>
        </div>
      </div>
*/
function renderColor(colorsArray) {
  const divColorContainer = document.createElement('div');
  divColorContainer.classList.add('color-container');

  for (let color of colorsArray) {
    createColorColumn(divColorContainer, color.hex.value);
  }

  document.querySelector('main').appendChild(divColorContainer);
}

function createColorColumn(container, color) {
  const divColorColumnWrap = document.createElement('div');
  divColorColumnWrap.classList.add('color-column-wrap');
  divColorColumnWrap.setAttribute('id', `${color}`);

  const divColorColumn = document.createElement('div');
  divColorColumn.classList.add(`color-column`);
  divColorColumn.style.backgroundColor = color;

  const para = document.createElement('p');
  para.classList.add('color-code');
  para.textContent = color;

  divColorColumnWrap.appendChild(divColorColumn);
  divColorColumnWrap.appendChild(para);

  container.appendChild(divColorColumnWrap);

  clickToCopy(divColorColumnWrap);
}

// click on divColorColumnWrap and copy the div id
function clickToCopy(div) {
  div.addEventListener('click', (e) => {
    colorSelect = e.target.parentElement.id;
    navigator.clipboard.writeText(colorSelect);
    alert('You copied the color code: ' + colorSelect);
  });
}
