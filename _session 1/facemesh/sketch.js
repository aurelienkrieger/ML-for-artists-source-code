let facemesh;
let video;

// Predictions
let predictions = [];

function setup() {
  createCanvas(640, 480);

  // Create the video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0);

  // Draw facial keypoints
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    let keypoints = predictions[i].scaledMesh;

    // Draw facial keypoints
    for (let j = 0; j < keypoints.length; j += 1) {
      let [x, y] = keypoints[j];

      fill(0, 255, 0);
      ellipse(x, y, 5, 5);
    }
  }
}
