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

// p5.js setup and draw loop/////////////////////////////////////////////////////////////
// Variables
var floorPos_y;
var trees_x;
var treePos_y;
let cloudImage; // Variable to store the loaded cloud image
let clouds; // Array to store cloud data

function preload() {
    cloudImage = loadImage('assets/clouds.png'); // Load the cloud image
}

function setup() {
    createCanvas(1024, 450);
    floorPos_y = height * 3 / 4;

    // Tree positions
    trees_x = [-700, -300, -50, 110, 370, 900, 1200, 1400, 1600, 1770, 1930, 2200, 2800, 3000, 3300, 3770, 4540];

    // Cloud data
    clouds = [
        { x: -800, y: 100, size: 85 },
        { x: -500, y: 100, size: 65 },
        { x: -200, y: 130, size: 90 },
        { x: 85, y: 100, size: 85 },
        { x: 350, y: 150, size: 50 },
        { x: 650, y: 100, size: 90 },
        // Add more clouds as needed...
    ];

    // Set tree's vertical position
    treePos_y = floorPos_y - 142; // Set to place trees on the ground level
}

function draw() {
    background(100, 155, 255); // Fill the sky blue
    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height / 2); // Draw the ground
    
    push()
    translate(-x, 0)
    // Draw the trees
    for (var i = 0; i < trees_x.length; i++) {
        noStroke();
        fill(69, 55, 34);
        rect(trees_x[i], treePos_y, 40, 142); // Tree trunk
        // Leaves 1 - middle tree
        noStroke();
        fill(30, 61, 35);
        ellipse(trees_x[i] + 25, treePos_y + 20, 60, 70);
        noStroke();
        fill(36, 69, 34);
        ellipse(trees_x[i] - 20, treePos_y + 30, 100);
        ellipse(trees_x[i] + 50, treePos_y + 50, 75);
    }

    // Draw the clouds using the image
    for (let i = 0; i < clouds.length; i++) {
        let cloud = clouds[i];
        cloud.x -= 1; // Move the cloud leftward
        if (cloud.x < -200) {
            cloud.x = width + 100; // Reset position when off-screen
        }
        image(cloudImage, cloud.x, cloud.y, cloud.size * 2, cloud.size); // Draw cloud image
    }
    pop()
    // Optional: Example of a moving object, if you want to add movement (e.g., a character)
    if (x < 90) {
        x = 90; // Prevent the character from going past the starting point
        fill(255); // Display the message if the character tries to go left beyond the blocker
        stroke(255);
        strokeWeight(5);
        fill(196, 88, 99);
        textSize(75);
        noStroke();
        text('---->', x + 200, floorPos_y - 100);
    }
}
