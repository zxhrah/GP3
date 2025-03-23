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
  }
  
// Set up the game loop
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}
step(); 

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
var Scene1Floor;
var Scene2Floor;
var Scene3Floor;
var Scene4Floor;
var trees_x;
var treePos_y;
let cloudImage; // Variable to store the loaded cloud image
let clouds = [];  // Array to store cloud data
let transitionPositions = [1800, 4000, 6200]; // Starting x-positions for 3 transitions
let transitionWidth = 1024; // Width of each transition area
let transitioning = false; // boolean for transition state

//button variables
let buttonX = 8200;
let buttonY = 250;
let buttonWidth = 250; // Width of the button
let buttonHeight = 50; // Height of the button

//Rain
let drops = [];

function preload() {
    cloudImage = loadImage('assets/clouds.png'); // Load the cloud image
    Scene1Floor = loadImage('assets/dirt_floor.png'); // Load the flooring
    Scene2Floor = loadImage('assets/water_floor.png'); // Load the flooring
    Scene3Floor = loadImage('assets/water_floor.png'); // Load the flooring
    Scene4Floor = loadImage('assets/water_floor.png'); // Load the flooring
}

function setup() {
    createCanvas(1024, 450);
    floorPos_y = height * 3 / 4;
   right_direction = false;
   left_direction = false;
    // Tree positions
    trees_x = [-700, -300, -50, 110, 370, 900, 1200, 1400, 1600, 1770, 1930, 2200, 2800, 3000, 3300, 3770, 4540, 5540,5770, 6770, 7100, 7300, 7400 ];

   // Initialize clouds with positions far off-screen
   for (let i = 0; i < 250; i++) { // Generate 250 clouds
      clouds.push({
          x: i * 200, // Spread clouds at regular intervals far along the x-axis
          y: random(0, 100), // Fixed vertical range for clouds
          size: random(50, 200) // Random sizes within a range
      });
  }
    // Set tree's vertical position
    treePos_y = floorPos_y - 142; // Set to place trees on the ground level

    for (let i = 0; i < 1000; i++) {
      drops[i] = new rainDrop();
    }
}

function draw() {
    background(165, 183, 189); // Fill the sky blue
    noStroke();
    fill(168, 121, 91);
    push()
    translate(-x, 0);  // Adjust background scroll based on x position - makes it look like the camera is on the character
   //GROUND DRAWINGs
    //Scene 1 - damp ground
    image(Scene1Floor, 511, floorPos_y-80, width+300, height/2);
    image(Scene2Floor, 2820, floorPos_y-80, width+300, height/2);
    image(Scene3Floor, 5021, floorPos_y-80, width+300, height/2);
    image(Scene4Floor, 7221, floorPos_y-80, width+300, height/2);
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
   text('As I floated past half-submerged homes I wondered...', 7500 , floorPos_y - 30);
   
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
transitioning = false; 
for (let i = 0; i < transitionPositions.length; i++) {
    let transitionX = transitionPositions[i]; // Current transition's x-position

    // Draw the transition rectangle
    fill(0, 0, 0); 
    rect(transitionX, 0, transitionWidth, height);

    // Check if the character is within the current transition area
    if (x >= transitionX - 550 && x < transitionX + transitionWidth - 550) {
        transitioning = true;
    }
}
 //Raindrops
 for (let i = 0; i < drops.length; i++) {
   drops[i].display();
   drops[i].fall();
 }
// Hide character during transition
if (transitioning) {
   character.style.visibility = "hidden"; // Hide character
} else {
   character.style.visibility = "visible"; // Show character
}

   // Draw a button
   fill(0, 150, 255);
   rect(buttonX, buttonY, buttonWidth, buttonHeight,20);
   fill(255);
   textSize(20);
   text("How did it come to this?", buttonX+20 , buttonY+30);

    pop()
    // character speed
    if(left_direction){
      x -= 2;
  }else if(right_direction){
      x += 20;
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
      x = 7500; // Prevent the character from going past the ending point
  }

  
}

function mousePressed() {
   let relativeButtonX = buttonX - x;
   // Check if the mouse is within the button area
   if (
      mouseX > relativeButtonX &&
      mouseX < relativeButtonX + buttonWidth &&
      mouseY > buttonY &&
      mouseY < buttonY + buttonHeight
  ) {
      window.location.href = "start.html"; // Redirect to the quiz starting page
  }
  
}
function rainDrop() {
   //Declare the local variables that define the raindrops' starting points
  this.x = random(width+770);
  this.y = random(-500, -10);
  this.z = random(0, 20);
  this.size = map(this.z, 0, 20, 5, 20);
  this.speed = map(this.z, 0, 20, 3, 10);
  //Declare a gravity variable that obeys the z-axis rules above
  this.grav = map(this.z, 0, 20, 0.025, 0.2);
  //Create the motion of the raindrop
  this.fall = function() {
   this.y = this.y + this.speed;
   this.speed = this.speed + this.grav //speed increases slightly as it falls to mimick gravity

   // After the raindrop hits the bottom, it resets to its starting point and with its starting speed
   if (this.y > height) {
     this.y = random(-200, -10);
     this.speed = map(this.z, 0, 20, 4, 10);
   }

 }
 //Draw the raindrop in the sketch
 this.display = function() {
   stroke(151, 180, 255);
   strokeWeight(map(this.z, 0, 20, 1, 2));
   line(this.x, this.y, this.x, this.y + this.size);
 }
}
