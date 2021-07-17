'use strict';

const COLORS = [ 'white', 'black', 'green',
                 'blue', 'magenta', 'yellow',
                 'red', 'teal', 'grey', ]

const btnEdit = getSel('.btn-edit');
const btnStyle = getSel('.btn-style');
const btnSave = getSel('.btn-save');
const btnAdd = getSel('.btn-add');
const btnCreateTable = getSel('.btn-create-table');
const btnCreateList = getSel('.btn-create-list');
const btnsBack = document.body.querySelectorAll('.btn-back');
const btnBlock = getSel('.btns-functions');

const fieldEdit = getSel('.field-edit');
const fieldStyle = getSel('.field-style');
const fieldAdd = getSel('.field-add');
const result = getSel('.field-result-text');
const colorPicker = getSel('.picker-color');
const colorGrid = getSel('.color-container');
const fzPicker = getSel('.picker-font-size .radios');
const ffPicker = getSel('#ffSelect');
const fsPicker = getSel('.picker-style .checkboxes');

class Button {
    constructor(btn) {
        this.btn = btn;
        // Make sure this refers to the Button class by
        // calling the bind method on the onClick
        btn.onclick = this.onClick.bind(this);
    }
    edit(){
        fieldEdit.classList.remove('d-none');
        fieldStyle.classList.add('d-none');
        let html = getSel('.field-result-text').innerHTML;
        html = trimHTML(html);
        fieldEdit.querySelector('textarea').value = html;
    }

    style(){
        fieldEdit.classList.add('d-none');
        fieldStyle.classList.remove('d-none');
    }

    save() {
        let text = fieldEdit.querySelector('textarea').value;
        result.innerHTML = text;
    }

    add() {
        // result.closest('.container').classList.add('d-none');
        btnBlock.classList.add('d-none');
        fieldEdit.classList.add('d-none');
        fieldAdd.classList.remove('d-none');
    }

    back() {
        let fields = document.body.querySelectorAll('.field');
        btnBlock.classList.toggle('d-none');
        for(const field of fields){
            if(!field.classList.contains('field-result')){
                field.classList.toggle('d-none');
            }
        }
    }

    createTable() {
        let f = document.forms.tableGenerator;
        if(!f.countTR 
            || !f.countTD.value
            || !f.widthTD.value
            || !f.heightTD.value
            || !f.borderWidth.value
            || !f.borderStyle.value
            || !f.borderColor.value){
            return;
        }
        let table = document.createElement('table');
        table.style.cssText = `border: ${f.borderWidth.value}px ${f.borderStyle.value} ${f.borderColor.value};`;
        console.log(table.style.cssText);
        for(let row=0; row<f.countTR.value; row++){
            let row = document.createElement('tr');
            for(let cell=0; cell<f.countTD.value; cell++){
                let cell = document.createElement('td');
                cell.style.border = `${f.borderWidth.value}px ${f.borderStyle.value} ${f.borderColor.value}`;
                cell.style.width = f.widthTD.value + 'px';
                cell.style.height = f.heightTD.value + 'px';
                cell.textContent = 'TD';
                row.append(cell);
            }
            table.append(row);
        }
        let html = getSel('.field-result-text').innerHTML;
        html = trimHTML(html);
        fieldEdit.querySelector('textarea').value = html;
        fieldEdit.querySelector('textarea').value += table.outerHTML;
        this.back();
    }

    createList() {
        let f = document.forms.listGenerator;
        if(!f.countLI.value || !f.listMark.value){
            return;
        }
        let ul = document.createElement('ul');
        ul.style.listStyleType = f.listMark.value;
        for(let i=1; i<=f.countLI.value; i++){
            let li = document.createElement('li');
            li.textContent = `Item ${i}`;
            ul.append(li);
        }
        let html = getSel('.field-result-text').innerHTML;
        html = trimHTML(html);
        fieldEdit.querySelector('textarea').value = html;
        fieldEdit.querySelector('textarea').value += ul.outerHTML;
        this.back();
    }
    
    
    onClick(event) {
        let action = event.target.dataset.function;
        if(action){
            this[action]();
        }
    }
}

new Button(btnEdit);
new Button(btnStyle);
new Button(btnSave);
new Button(btnAdd);
new Button(btnCreateTable);
new Button(btnCreateList);
for(const btnBack of btnsBack) new Button(btnBack);




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

document.forms.fieldAddRadios.addEventListener('click', function(event){
    if(event.target.value === 'table'){
        document.forms.tableGenerator.classList.remove('d-none');
        document.forms.listGenerator.classList.add('d-none');
    } else if(event.target.value = 'list'){
        document.forms.listGenerator.classList.remove('d-none');
        document.forms.tableGenerator.classList.add('d-none');
    } else {
        return;
    }
});

colorPicker.addEventListener('click', function(event){
    if(event.target.matches('input[name="textColor"]')){
        showColorGrid('color');
    } else if(event.target.matches('input[name="backgroundColor"]')){
        showColorGrid('backgroundColor');
    }
});

colorGrid.addEventListener('click', function(event){
    let prop = colorGrid.dataset.property;
    result.closest('.container').style[prop] = event.target.dataset.color;
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
