var 	wSpeed = 10, 
		wSrcGeoDeg = 19 //degrees
		
var	arrowShape = [
		0,0,
		0,-200,
		-20,-200,
		10,-250,
		40,-200,
		20,-200,
		20,0
		];

var	test;
var   m=1,n=1,lineX=1,lineY=1;
var 	myVector;
var 	dX, dY;

		

function setup() {
	wSrcRad = radians(wSrcGeoDeg);
	wDestP5 = wSrcRad+PI; 
	arrowTravAngle = wDestP5-HALF_PI;
	myVector = p5.Vector.fromAngle(arrowTravAngle-HALF_PI);
	dX=myVector.x;
	dY=myVector.y;
	println(myVector.x+" "+myVector.y);
	println(myVector);
	println("Wind source geo deg "+ wSrcGeoDeg);
	println("Wind destination P5 rad" + wDestP5);
	println("arrow pointing deg "+degrees(wDestP5));
	println("line heading deg "+degrees(myVector.heading()));
	println("arrow pointing deg "+degrees(wDestP5));

	createCanvas(800,	600);
	background("#AbbAAA");
	
 }//setup


function draw() {
	displayArrow();	
}


function displayArrow() {
	// println("displayArrow starts");	
	// n=n+1;
	translate(width/2,height/2);
	stroke("green")
	line(-width,0,width,0);
	stroke("red");
	line(400*dX,400*dY,-400*dX,-400*dY);

	// m=m+7;
	rotate(wDestP5);
	noStroke();
	beginShape();
	for (var i = 0; i<arrowShape.length; i+=2) {
		vertex(arrowShape[i], arrowShape[i+1]);
	};
	endShape(CLOSE);
	// println("displayArrow ends")
} // displayArrow




