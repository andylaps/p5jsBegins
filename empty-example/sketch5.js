var varNum = 600; 

function setup(){
	createCanvas(windowWidth, windowHeight-100);
  background("#AAAAAA");
  angleMode(DEGREES);
	// move the origin to the pivot point
	translate(1800, 1000); 

	// then rotate the grid around the pivot point by a
	// number of degrees equal to the frame count of the sketch
	rotate(135);

	// and draw the square at the origin
	fill(0);
	triangle(0, 0, 500, 600, 600, 500);
}