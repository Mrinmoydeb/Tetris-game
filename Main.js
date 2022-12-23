let grid= document.querySelector("#grid");
let squares = Array.from(document.querySelectorAll("#grid div"));
let score = document.getElementById('score');
let playPauseBtn = document.getElementById("strt-btn");
let lefBtn = document.getElementById("left")
let downBtn = document.getElementById("down")
let rightBtn = document.getElementById("right")
let rotateBtn = document.getElementById("rotate")
  
 let count = 0;
 let width = 10;

// for(i =0; i<200; i++){
//     squares[i].textContent = count
//     count++
// }
 
// shapes

//colors
const colorS =[

    'cyan',
    'yellow',
    ' purple',
    'green',
    'red'
    
]

const lshape = [
    [1, width+1, width*2+1, width*2+2],
    [0, 1, 2, width+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
]

const zshape = [
    [1, 2, width+3  , width+2],
    [0, width, width+1, width*2+1],
    [1, 2, width, width+1],
    [0, width, width+1, width*2+1],
]

const tshape = [ 
    [1, width,width+1,width+2],
    [1, width+1, width+2, width*2+1],
    [0, 1, 2,width+1 ],
    [1, width, width+1, width*2+1]
]

const oshape = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],    
    [0, 1, width, width+1],
    [0, 1, width, width+1]
]

const ishape = [
    [1, width+1, width*2+1, width*3+1],
    [0, 1, 2, 3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
]

const theShapes = [lshape, zshape, oshape, tshape, ishape]
let currentPosssition = 4;
let currentRotation = 0;
// let randomRotation = Math.floor(Math.random()*currentRotation)
let random = Math.floor(Math.random()*theShapes.length)
let currentShapes = theShapes[random][currentRotation]


// draw shapes 
function draw(){
    currentShapes.forEach((index)=>{
        squares[index+currentPosssition].style.background = colorS[random]
    })
}
draw()
//erase the shape
function erase(){
    currentShapes.forEach((index)=>{
        squares[index+currentPosssition].style.background = ''
    })
}
 //movedown 
function moveDown(){
    erase()
    currentPosssition += width
    draw()
    stop()
   
}
// stop the shapes
function stop(){
    if(currentShapes.some(index => squares[index + currentPosssition + width].classList.contains('freeze'))){currentShapes.forEach(index => squares[currentPosssition +index].classList.add('freeze'))

    // start a new shape falling 
    
random = Math.floor(Math.random()*theShapes.length)
currentPosssition =4
currentRotation = 0
// randomRotation = Math.floor(Math.random()*currentRotation)
currentShapes = theShapes[random][currentRotation]
draw()
gameOver()
addScore()
}

};
//control the game 
 
//control left 
function control(e){
if(e.keyCode === 37 ){
    moveLeft()
} else if (e.keyCode === 39){
    moveRight()
}else if(e.keyCode ===40  ){
    moveDown()
} else if(e.keyCode === 32 ){
    rotate()
}
}
window.addEventListener("keydown",control)

//control arrows & rotatet btn
lefBtn.addEventListener('click',moveLeft)
rightBtn.addEventListener('click',moveRight)
downBtn.addEventListener('click',moveDown)
downBtn.addEventListener('click',moveDown)   
rotateBtn.addEventListener('click',rotate)   

//move left
function moveLeft(){
    erase()

    let leftBlockage = currentShapes.some(index => (currentPosssition + index ) % width  === 0);
    let blockage = currentShapes.some(index => squares[currentPosssition + index -1].classList.contains("freeze"))
    if(!leftBlockage &&!blockage ){
        currentPosssition--;
    }
   
    draw()
}   

//move right
function moveRight(){
    erase()

    let RightBlockage = currentShapes.some(index => (currentPosssition + index ) % width  === width-1);  
    let blockage = currentShapes.some(index => squares[currentPosssition + index +1].classList.contains("freeze"))
    if(!RightBlockage &&!blockage ){
        currentPosssition++;
    }
   
    draw()
}


// rotate the shapes
function rotate(){
erase()
currentRotation++
if(currentRotation === 4){
    currentRotation=0
}
currentShapes = theShapes[random][currentRotation]

draw() 
}

// add play pause btn

function pause(){
if(timer){
    clearInterval(timer)
timer = null;
playPauseBtn.innerText = "Play";
}else {
    draw()
    timer = setInterval(moveDown,1000)
    playPauseBtn.innerText = "Pause"
}

}
// game onver function
function gameOver(){
if(currentShapes.some(index => squares[index+currentPosssition].classList.contains('freeze'))){
    score.innerHTML = "Game Over";
    clearInterval(timer)
          
}
}
  
function addScore(){
    for(i =0; i<199; i+=width){
        const row = [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9];
        if(row.every(index => squares[index].classList.contains("freeze"))){
count+=10
score.textContent =`Score${count}`
row.forEach((index) => {squares[index].classList.remove("freeze");
squares[index].style.background=""
        })
        let removeSquares = squares.splice(i,width);
        squares=removeSquares.concat(squares);
        squares.forEach(index => grid.appendChild(index))
       
        }
    }
}

// console.log(squares)

playPauseBtn.addEventListener("click",pause )
let timer = setInterval(moveDown, 1000)
