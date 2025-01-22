let galleryScene; // Variable to hold the gallery image
let buttonX = 462; // Button X position
let buttonY = 120; // Button Y position
let buttonWidth = 85; // Width of the button
let buttonHeight = 90; // Height of the button

// State variables
let intro = false; // To show storytelling text
let showSureButton = false; // To display the "Sure!" button
let showHmmButton = false; // To display the "Hmm..." button
let showSecondText = false; // To show follow-up text after "Hmm..."
let characterVisible = false; // Character visibility

// DOM elements
let character = document.querySelector(".Character");
let characterFace = document.querySelector(".Character img");

function preload() {
  galleryScene = loadImage('assets/galleryImage.jpg'); // Load the gallery image
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
    fill(0);
    textSize(20);
    text(
      "Hi, I'm Anwara and this painting is about my story.\nWant to know more?",
      200,
      250
    );

    // Character points during this stage
    if (characterVisible) {
      character.style.visibility = "visible";
      characterFace.classList.remove("standing");
      characterFace.classList.add("pointing");
    }

    // Display the "Sure!" button
    if (showSureButton) {
      fill(0, 200, 0);
      rect(300, 300, 100, 50, 20);
      fill(255);
      text("Sure!", 330, 330);
    }

    // Display the "Hmm..." button
    if (showHmmButton) {
      fill(200, 100, 0);
      rect(450, 300, 100, 50, 20);
      fill(255);
      text("Hmm...", 470, 330);
    }
  }

  // Manage follow-up text and buttons
  if (showSecondText) {
    fill(0);
    textSize(20);
    text(
      "Oh, you can just sit back and enjoy.\nLet me know if you change your mind!",
      200,
      250
    );

    // Character stands during this stage
    if (characterVisible) {
      characterFace.classList.remove("pointing");
      characterFace.classList.add("standing");
    }

    // Draw "I changed my mind" button
    fill(0, 150, 255);
    rect(280, 300, 200, 50, 20);
    fill(255);
    text("I changed my mind", 295, 330);
  }

  // Hide the character if it's not supposed to be visible
  if (!characterVisible) {
    character.style.visibility = "hidden";
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
    showSureButton = true;
    showHmmButton = true;
    characterVisible = true; // Show character
  }

  // Check if the "Sure!" button is clicked
  if (
    showSureButton &&
    mouseX > 300 &&
    mouseX < 400 &&
    mouseY > 300 &&
    mouseY < 350
  ) {
    window.location.href = "index.html"; // Navigate to index.html
  }

  // Check if the "Hmm..." button is clicked
  if (
    showHmmButton &&
    mouseX > 450 &&
    mouseX < 550 &&
    mouseY > 300 &&
    mouseY < 350
  ) {
    showSecondText = true;
    intro = false;
    showSureButton = false;
    showHmmButton = false;
  }

  // Check if the "I changed my mind" button is clicked
  if (
    showSecondText &&
    mouseX > 280 &&
    mouseX < 480 &&
    mouseY > 300 &&
    mouseY < 350
  ) {
    window.location.href = "index.html"; // Navigate to index.html
  }
}
