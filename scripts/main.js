'use strict';

const COLORS = [ 'white', 'black', 'green',
               'blue', 'violet', 'yellow',
               'red', 'teal', 'grey',
                ]

const btnEdit = getSel('input[type="button"][name="edit"]');
const btnStyle = getSel('input[type="button"][name="style"]');
const btnSave = getSel('input[type="button"][name="save"]');
const btnAdd = getSel('input[type="button"][name="add"]');

const fieldEdit = getSel('.field-edit textarea');
const fieldStyle = getSel('.field-style');
const result = getSel('.result .text');
const colorPicker = getSel('.picker-color');
const colorGrid = getSel('.color-container');
const fzPicker = getSel('.picker-font-size .radios');
const ffPicker = getSel('#ffSelect');
const fsPicker = getSel('.picker-style .checkboxes');


btnEdit.addEventListener('click', function(){
    fieldEdit.parentElement.classList.remove('d-none');
    fieldStyle.classList.add('d-none');
    let html = getSel('.text').innerHTML;
    html = trimHTML(html);
    fieldEdit.value = html;
});

btnStyle.addEventListener('click', function(event){
    fieldEdit.parentElement.classList.add('d-none');
    fieldStyle.classList.remove('d-none');
});

btnSave.addEventListener('click', function(){
    let text = fieldEdit.value;
    result.innerHTML = text;
});

fzPicker.addEventListener('click', function(event){
    result.style.fontSize = event.target.value;
})

ffSelect.addEventListener('change', function(){
    let isChosen = this.value !== 'Choose option';
    result.style.fontFamily = isChosen ? this.value : '';
});

fsPicker.addEventListener('click', function(event){
    let checked = event.target.checked;
    if(event.target.value === 'bold'){
        result.style.fontWeight = checked ? 'bold' : '';
    } else if(event.target.value === 'italic'){
        result.style.fontStyle = checked ? 'italic' : '';
    }
})

colorPicker.addEventListener('click', function(event){
    if(event.target.matches('input[name="textColor"]')){
        showColorGrid('color');
    } else if(event.target.matches('input[name="backgroundColor"]')){
        showColorGrid('backgroundColor');
    }
});

colorGrid.addEventListener('click', function(event){
    let prop = colorGrid.dataset.property;
    result.style[prop] = event.target.dataset.color;
    console.log(prop);
});

document.body.addEventListener('click', function(event){
    if((!event.target.matches('input[name="textColor"]')
        && !event.target.matches('input[name="backgroundColor"]'))){
        getSel('.color-container').classList.add('d-none');
    }
});

function getSel(sel){
    return document.body.querySelector(sel);
}

function trimHTML(html){
    let lines = html.split('\n');
    for(const line of lines){
        let ind = lines.indexOf(line);
        lines[ind] = line.trim();
    }
    html = lines.join('\n').trim();
    return html;
}

function showColorGrid(what='color'){
    let grid = createGrid();
    grid.setAttribute('data-property', what);
    COLORS.forEach((color, ind) => {
        let prop = 'backgroundColor';
        let tile = grid.children[ind];
        tile.style[prop] = color;
        tile.setAttribute('data-color', color);
    });
    grid.classList.remove('d-none');
}


function createGrid(){
    let container = document.querySelector('.color-container');
    if(container.innerHTML){
        container.innerHTML = '';
    }
    for(let i=0; i<9; i++){
        let box;
        box = document.createElement('div');
        box.classList.add('box');
        container.append(box);
    }
    return container;
}
