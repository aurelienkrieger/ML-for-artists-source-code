// Global variable to store the classifier
let classifier;

// Predictions
let label = "";

// Teachable Machine model URL:
//let modelURL = '../../models/';
let modelURL = 'http://127.0.0.1:5500/models/';


function preload() {
  // Load the model
  classifier = ml5.soundClassifier(modelURL + 'rougevert/model.json');
}

function setup() {
  createCanvas(640, 480);
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
}

function draw() {
  background(0);
  textSize(100);
  textAlign(CENTER);

  if(label === "rouge") {
    fill(255, 0, 0);
    text("rouge", width/2, height/2)
  }
  else if(label === "vert"){
    fill(0, 255, 0);
    text("vert", width/2, height/2);
  }
  else {
    fill(255);
    text("???", width/2, height/2);
  }
}


// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
}
