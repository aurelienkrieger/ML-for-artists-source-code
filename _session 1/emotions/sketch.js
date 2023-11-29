// Global variable to store the classifier
let classifier;

// Model URL
let modelURL = '../../models/';

// Video
let video;

// Predictions
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'emotions/model.json');
}

function setup() {
  createCanvas(640, 480);

  // Create the video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(video, 0, 0);

  // Draw the label
  fill(0);
  rect(0, height - 20, width, height);
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
