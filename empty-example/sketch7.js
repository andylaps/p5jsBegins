var 	wSpeed = 10, 
		wSrcGeoDeg = 63; //degrees
		
var	aTailHt = 125,
		aHeadHt = 75,
		aTailWd = 20,
		aHeadWd = 60,
		aTotalHt = aTailHt+aHeadHt;
// abstract coordinates to draw arrow around ctr of rotation (ctrRot)
arrowShape = [
		-aTailWd/2, aTotalHt/2,
		-aTailWd/2, -aTotalHt/2+(aHeadHt),
		-aHeadWd/2, -aTotalHt/2+(aHeadHt),
		0, -aTotalHt/2,
		aHeadWd/2, -aTotalHt/2+(aHeadHt),
		aTailWd/2, -aTotalHt/2+(aHeadHt),
		aTailWd/2, aTotalHt/2
		];	

function setup() { 
	createCanvas(800,	600);
	translate(width/2,height/2);
// draw some lines for reference purposes	
	background("grey");
	stroke("green");
	line(-width/2,0,width,0);
	stroke("red");
	line(0,-height/2,0,height/2);
	stroke("green");
	line(-width/2,100,width,100);
	noStroke();
// spawn arrows proportional to wind speed (wSpeed)	
	myArrow = new Arrow;
	myArrow.show();




} // setup


function draw() {

} // draw


function Arrow() { // arrow constructor 

	this.vel = wSpeed;
	this.show = function() {
	beginShape();
		for (var i = 0; i<arrowShape.length; i+=2) {
		vertex(arrowShape[i], arrowShape[i+1]);
		};
		endShape(CLOSE);
		pop();
	}
} // Arrow