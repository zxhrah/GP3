let galleryScene; // Variable to hold the gallery image
let buttonX = 462; // Button X position
let buttonY = 120; // Button Y position
let buttonWidth = 85; // Width of the button
let buttonHeight = 90; // Height of the button

// State variables
let intro = false; // To show the storytelling text
let showSecondText = false; // To show follow-up text after "Hmm..."
let characterVisible = false; // Character visibility

// DOM elements
let character = document.querySelector(".Character");
let characterFace = document.querySelector(".Character img");
let startButton = document.getElementById("one"); // Select the new HTML button
let hmmButton = document.getElementById("two"); // Select the new HTML button
let lastButton = document.getElementById("three"); // Select the new HTML button

 // Hide buttons initially
 startButton.style.visibility = "hidden";
 hmmButton.style.visibility = "hidden";
 lastButton.style.visibility = "hidden";

 // Event listener for the new HTML button
 hmmButton.addEventListener("click", () => {
  showSecondText = true;
  intro = false;
});

function preload() {
  galleryScene = loadImage('assets/galleryImage.png'); // Load the gallery image
  bubble1 = loadImage('assets/introBubble.gif'); // Load the gallery image
  bubble2 = loadImage('assets/secondBubble.gif'); // Load the gallery image
}

function setup() {
  createCanvas(1024, 450);
}

function draw() {
  background(galleryScene);

  // Draw the initial button
  fill(0, 150, 255);
  noStroke();
  rect(buttonX, buttonY, buttonWidth, buttonHeight);
  fill(255);
  textSize(20);
  text("Artwork", buttonX + 10, buttonY + 50);

  // Manage storytelling text and buttons
  if (intro && !showSecondText) {
    image(bubble1, 180, 230, 688.5/2, 117/2);
    startButton.style.visibility = "visible";
    hmmButton.style.visibility = "visible";
    lastButton.style.visibility = "hidden";
    // Character points during this stage
    if (characterVisible) {
      character.style.visibility = "visible";
      characterFace.classList.remove("standing");
      characterFace.classList.add("pointing");
    }
    
  }

  // Manage follow-up text and buttons
  if (showSecondText) {
    image(bubble2, 180, 230, 589.5/2, 117/2);
    startButton.style.visibility = "hidden";
    hmmButton.style.visibility = "hidden";
    lastButton.style.visibility = "visible";
    // Character stands during this stage
    if (characterVisible) {
      characterFace.classList.remove("pointing");
      characterFace.classList.add("standing");
    }
  }

  // Hide the character if it's not supposed to be visible
  if (!characterVisible) {
    character.style.visibility = "hidden";
    startButton.style.visibility = "hidden";
    hmmButton.style.visibility = "hidden";
    lastButton.style.visibility = "hidden";
  }
}

function mousePressed() {
  // Check if the "Artwork" button is clicked
  if (
    mouseX > buttonX &&
    mouseX < buttonX + buttonWidth &&
    mouseY > buttonY &&
    mouseY < buttonY + buttonHeight
  ) {
    intro = true;
    characterVisible = true; // Show character
  }

}
