let gridclick = false;
let gridlines = '1px';
let cols = 16;

/* EVENT LISTENERS START */

// grid event listeners
const grid = document.querySelector('#grid');
grid.addEventListener('mousedown',() => {gridclick = true;});
grid.addEventListener('mouseup',() => {gridclick = false;});
grid.addEventListener('mouseleave',() => {gridclick = false;});

// toggle lines button event listener
const toggle_lines = document.querySelector('#toggle-lines');
toggle_lines.addEventListener('click',() => {
    // there is either no gridlines (0px) or there are (1px)
    gridlines = (gridlines=='1px')?'0px':'1px';
    document.documentElement.style.setProperty('--border', gridlines);
});

// clear event button listener
const clear = document.querySelector('#clear');
clear.addEventListener('click',() => {
    //select all the elemtns that have the gridSquare class and then set their backgrounds to white
    let doc = document.getElementsByClassName('gridSquare');
    for(let i = 0; i < doc.length; i++){
        doc[i].style.background = "white";
    }
});

/* EVENT LISTENERS END */

// takes a number n and creates a n x n grid
function changeGridSize(n){
    cols = n;
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
            newSquare.addEventListener('mouseover', () => {(gridclick)?newSquare.style.background = "purple":null;});
        }   
    }
}

// default grid is 16 x 16
changeGridSize(16);