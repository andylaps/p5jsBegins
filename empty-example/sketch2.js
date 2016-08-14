var 	startThingsNo = 20;
var 	world = [];

function setup() {
	createCanvas(displayWidth, displayHeight);
	// populate the world with Things
	for (var i=0; i<startThingsNo; i++) {
		world.push(new Thing(i));
		world[i].report();

	}
}

function draw() {
	background(50, 89, 100);
	for (var i=0; i<world.length; i++) {
		world[i].move();
		world[i].display();
			}
}

// Thing class
function Thing(j) {
	this.x = random(width);
	this.y = random(height);
	this.diameter = random(10,30);
	this.xSpeed = 1;
	this.ySpeed = 1;
	this.name = "thing "+j;


	this.move = function() {
		this.x += random(-this.xSpeed, this.xSpeed);
		this.y += random(-this.ySpeed, this.ySpeed);
	};

	this.display = function() {
		ellipse(this.x, this.y, this.diameter, this.diameter);
	};

	this.report = function() {
		console.log("I am "+this.name+". My diameter is "+this.diameter);
	}
	}