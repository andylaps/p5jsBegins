

var x = 0;


function setup() {
	createCanvas(displayWidth, displayHeight);
  background(100);  
}

function draw() {
  ellipse(x, height/2, 20, 20);
  x = x + 5;
}