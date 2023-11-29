let facemesh;
let video;
let buffer;

// Predictions
let predictions = [];

function setup() {
  createCanvas(640, 480);
  buffer = createGraphics(width, height);
  buffer.noStroke();
  buffer.colorMode(HSL, 100);

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
  background(250);

  // Draw facial keypoints
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  image(buffer, 0, 0);

  for (let i = 0; i < predictions.length; i += 1) {
    let keypoints = predictions[i].scaledMesh;

    let [x1, y1] = keypoints[13];
    let [x2, y2] = keypoints[14];
    let [xc, yc] = [(x1 + x2) / 2, (y1 + y2) / 2];
    let d = dist(x1, y1, x2, y2);

    buffer.fill(frameCount%100, 100, 50);
    buffer.ellipse(xc, yc, d, d);

    // Draw facial keypoints
    for (let j = 0; j < keypoints.length; j += 1) {
      let [x, y] = keypoints[j];
      fill(0);
      ellipse(x, y, 1, 1);
    }
  }
}
