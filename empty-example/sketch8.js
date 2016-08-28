var 	x = 100,
		y = 100;

function setup() {
	createCanvas(500,300);
	background(255);
	pos = createVector(x,y),
	vel = createVector(1,3.3);
}

function draw() {
	background(255);
	pos.add(vel);

	if ((pos.x > width) || (pos.x < 0)) {
		vel.x = vel.x * -1;
	}
	if ((pos.y > height) || (pos.y < 0)) {
		vel.y = vel.y * -1;
	}

	stroke(0);
	fill(175);
	ellipse(pos.x,pos.y,16,16);
}