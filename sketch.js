var character = document.querySelector(".Character"); // Updated class name
var characterFace = document.querySelector(".Character img"); // Targeting the img tag

// Starting position of the character
var x = 512;
var y = 34;
var held_directions = []; // State of which arrow keys we are holding down
var right_direction;
var left_direction;

const placeCharacter = () => {
   var pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );
   
   const held_direction = held_directions[0];
    // Handle movement and sprite animation for right and left directions
    if (held_direction) {
        if (held_direction === directions.right) {
            right_direction = true;
            left_direction = false;
           characterFace.classList.remove('walk-left'); // Remove walk-left if moving right
           characterFace.classList.add('walk-right');  // Add walk-right when moving right
        } else if (held_direction === directions.left) {
         right_direction = false;
            left_direction = true;
           characterFace.classList.remove('walk-right'); // Remove walk-right if moving left

           characterFace.classList.add('walk-left');  // Add walk-left when moving left
        }
     } else {
        // No direction, character is standing
        right_direction = false;
        left_direction = false;
        characterFace.classList.remove('walk-right', 'walk-left');
        characterFace.classList.add('standing'); // Add standing class if no key is pressed
     }
  
     // Update character position on screen to move left and right
     //character.style.transform = `translate3d(${x * pixelSize}px, ${y * pixelSize}px, 0)`; //turned off to test - REMOVE LATER
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
let clouds = [];  // Array to store cloud data
let transitionPositions = [1800, 4000, 6200]; // Starting x-positions for 3 transitions
let transitionWidth = 1024; // Width of each transition area
let transitioning = false; // Flag for transition state


function preload() {
    cloudImage = loadImage('assets/clouds.png'); // Load the cloud image
}

function setup() {
    createCanvas(1024, 450);
    floorPos_y = height * 3 / 4;
   right_direction = false;
   left_direction = false;
    // Tree positions
    trees_x = [-700, -300, -50, 110, 370, 900, 1200, 1400, 1600, 1770, 1930, 2200, 2800, 3000, 3300, 3770, 4540, 5540,5770, 6770, 7100, 7300, 7400 ];

   // Initialize clouds with positions far off-screen
   for (let i = 0; i < 250; i++) { // Generate 15 clouds
      clouds.push({
          x: i * 200, // Spread clouds at regular intervals far along the x-axis
          y: random(0, 100), // Fixed vertical range for clouds
          size: random(50, 200) // Random sizes within a range
      });
  }

    // Set tree's vertical position
    treePos_y = floorPos_y - 142; // Set to place trees on the ground level
}

function draw() {
    background(100, 155, 255); // Fill the sky blue
    noStroke();
    fill(168, 121, 91);
    rect(0, floorPos_y, width, height / 2); // Draw the ground
    
    push()
    translate(-x, 0);  // Adjust background scroll based on x position
   // Narration Texts
   //Scene 1
   fill(255);
   textSize(12);
   noStroke();
   text('The story begins in Moulvibazar, Bangladesh.', 522 , floorPos_y - 90);
   text('The village experiences a heavy downpour, more than usual,', 522 , floorPos_y - 60);
   text('that turned familiar dirt paths into streams of water', 522 , floorPos_y - 30);

   //Scene 2
   fill(255);
   textSize(12);
   noStroke();
   text('The fishing ponds overflowed and flooded the roads.', 3400 , floorPos_y - 90);
   text('The fish had now claimed our streets,', 3400 , floorPos_y - 60);
   text('so residents cast nets everywhere to catch them.', 3400 , floorPos_y - 30);
   //Scene 3
   fill(255);
   textSize(12);
   noStroke();
   text('The floods reached the fields.', 5100 , floorPos_y - 90);
   text('Crops were swallowed by the water,', 5100 , floorPos_y - 60);
   text('while the cattle wandered in it knee deep.', 5100 , floorPos_y - 30);
   //Scene 4
   fill(255);
   textSize(12);
   noStroke();
   text('The roads eventually disappeared and the water was surrounding us.', 7500 , floorPos_y - 90);
   text('Boats became our only means of travel forcing us to reshape our lives.', 7500 , floorPos_y - 60);
   text('As I floated past half-submerged homes I wondered ', 7500 , floorPos_y - 30);
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
      if (cloud.x < -cloud.size * 2) { // Check if the cloud is completely off-screen
          cloud.x += width + 8000; // Reset far off to the right, ensuring consistent flow
      }
      image(cloudImage, cloud.x, cloud.y, cloud.size * 2, cloud.size); // Draw cloud image
  }

// Draw and handle multiple transitions
transitioning = false; // Reset transition flag for each frame
for (let i = 0; i < transitionPositions.length; i++) {
    let transitionX = transitionPositions[i]; // Current transition's x-position

    // Draw the transition rectangle
    fill(0, 0, 0); // Semi-transparent black for the transition effect
    rect(transitionX, 0, transitionWidth, height);

    // Check if the character is within the current transition area
    if (x >= transitionX - 550 && x < transitionX + transitionWidth - 550) {
        transitioning = true;
    }
}

// Hide character during transition
if (transitioning) {
   character.style.visibility = "hidden"; // Hide character
} else {
   character.style.visibility = "visible"; // Show character
}

    pop()
    if(left_direction){
      x -= 2;
  }else if(right_direction){
      x += 12;
  }
    // stops character moving past certain points
    if (x < 512) {
        x = 512; // Prevent the character from going past the starting point
        fill(196, 88, 99);
        textSize(75);
        noStroke();
        text('---->', x , floorPos_y - 100);
    }

    if (x > 7500) {
      x = 7500; // Prevent the character from going past the starting point
  }
}
