var character = document.querySelector(".Character"); // Updated class name
var characterFace = document.querySelector(".Character img"); // Targeting the img tag

// Starting position of the character
var x = 90;
var y = 34;
var held_directions = []; // State of which arrow keys we are holding down
var speed = 1; // How fast the character moves in pixels per frame

const placeCharacter = () => {
   var pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );
   
   const held_direction = held_directions[0];
    // Handle movement and sprite animation for right and left directions
    if (held_direction) {
        if (held_direction === directions.right) {
           x += speed; // Move the character to the right
           characterFace.classList.remove('walk-left'); // Remove walk-left if moving right
           characterFace.classList.add('walk-right');  // Add walk-right when moving right
        } else if (held_direction === directions.left) {
           x -= speed; // Move the character to the left
           characterFace.classList.remove('walk-right'); // Remove walk-right if moving left
           characterFace.classList.add('walk-left');  // Add walk-left when moving left
        }
     } else {
        // No direction, character is standing
        characterFace.classList.remove('walk-right', 'walk-left');
        characterFace.classList.add('standing'); // Add standing class if no key is pressed
     }
  
     // Update character position on screen to move left and right
     character.style.transform = `translate3d(${x * pixelSize}px, ${y * pixelSize}px, 0)`;
  }
  

// Set up the game loop
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}
step(); // kick off the first step!

/* Direction key state */
const directions = {
   up: "up",
   down: "down",
   left: "left",  // Left arrow key
   right: "right", // Right arrow key
}

const keys = {
   38: directions.up,
   37: directions.left,  // Left arrow key
   39: directions.right, // Right arrow key
   40: directions.down,
}

document.addEventListener("keydown", (e) => {
   var dir = keys[e.which];
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir); // Add direction to array if it's not already there
   }
})

document.addEventListener("keyup", (e) => {
   var dir = keys[e.which];
   var index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1); // Remove direction from array when key is released
   }
});


var floorPos_y;
// p5.js setup and draw loop
function setup() {
    createCanvas(1024, 450); 
    floorPos_y = height * 3/4;
 }
 
 function draw() {
    background(100,155,255); //fill the sky blue
    noStroke();
    fill(0,155,0);
    rect(0, floorPos_y, width, height/2); //draw some green ground
    
    if (x < 90){

    }
 }
 