let gridclick = false; // is the user currently clicking on the grid area
let gridlines = '1px'; // size of the grid lines
let rainbow = false; // is rainbow mode on or off
let prevcolour = "#FF0000";
let colour = "#FF0000"; // default paint colour is red
// when rainbow mode is on colours are selected from this list. Check the read me for the source of these colours
let palette = ['#ff9ff3','#f368e0', '#feca57', '#ff9f43', '#ff6b6b', '#ee5253','#48dbfb','#0abde3','#1dd1a1','#10ac84',
                '#00d2d3','#01a3a4','#54a0ff','#2e86de','#5f27cd','#341f97','#c8d6e5','#8395a7','#576574','#222f3e'];

/* EVENT LISTENERS START */

// grid event listeners
const grid = document.querySelector('#grid');
grid.addEventListener('mousedown',() => {gridclick = true;});   // clicked down, start drawing
grid.addEventListener('mouseup',() => {gridclick = false;});    // let go of left click, stop drawing
grid.addEventListener('mouseleave',() => {gridclick = false;}); // mouse left the grid area, stop drawing

// toggle lines button event listener
const toggle_lines = document.querySelector('#toggle-lines');
toggle_lines.addEventListener('click',() => {
    // there is either no gridlines (0px) or there are (1px)
    gridlines = (gridlines=='1px')?'0px':'1px';
    document.documentElement.style.setProperty('--border', gridlines);
});

// clear event button event listener
const clear = document.querySelector('#clear');
clear.addEventListener('click',() => {clearGrid()});

// rainbow button event listener
const rainbow_button = document.querySelector('#rainbow');
rainbow_button.addEventListener('click',() => {rainbow = rainbow?false:true;});

// color picker event listener
const colour_picker = document.querySelector('#colour-picker')
colour_picker.addEventListener('input',()=>{
    rainbow=false;
    colour = colour_picker.value;
});

// slider and output event listener
const slider = document.querySelector('#slider');
const output = document.querySelector('#output');
slider.addEventListener('input',()=>{
    resetGrid(slider.value);
    output.innerHTML = (slider.value + ' x ' + slider.value);
});

// eraser button event listener
const eraser = document.querySelector('#eraser');
eraser.addEventListener('click', ()=>{
    rainbow=false;
    prevcolour = colour;
    colour = '#FFFFFF';
});

// colour button event listener
const colour_button = document.querySelector('#colour-button');
colour_button.addEventListener('click', ()=>{
    rainbow=false;
    colour = prevcolour;
});

/* EVENT LISTENERS END */

/* FUNCTIONS START*/

function pickRandom(){
    return palette[Math.floor(Math.random() * palette.length)];
}

// takes a number n and creates a n x n grid
function changeGridSize(n){
    // update the css variable that stores number of columns
    document.documentElement.style.setProperty('--cols', n);   
    //create n x n grid
    for(let i =0; i < n; i++){  
        for(let j =0; j < n; j++){
            // create a div with the gridSquare class assigned to it
            const newSquare = document.createElement('div');
            newSquare.classList.add('gridSquare')
            // add it to the grid and assign an event listener to it for painting
            grid.appendChild(newSquare);
            newSquare.addEventListener('click', () => {
                if(rainbow){
                    newSquare.style.background = pickRandom();
                }else{
                    newSquare.style.background = colour;
                }
            });
            newSquare.addEventListener('mouseover', () => {
                if(gridclick){
                    if(rainbow){
                        newSquare.style.background = pickRandom();
                    }else{
                        newSquare.style.background = colour;
                    }
                }
            });
        }   
    }
}

// sets the background colour of all squares to white
function clearGrid(){
   //select all the elements that have the gridSquare class and then set their backgrounds to white
   let doc = document.getElementsByClassName('gridSquare');
   for(let i = 0; i < doc.length; i++){
       doc[i].style.background = "white";
   } 
}

// deletes all the squares and creates a new n x n grid
function resetGrid(n){
    grid.innerHTML='';
    changeGridSize(n);
}

/* FUNCTIONS END*/

// default grid is 16 x 16
changeGridSize(16);