var arrBase = 100, arrHeight = 250;
var aTemp, wSpeed, wDir;
 var x1,x2,x3,y1,y2,y3,xCtr,yCtr;
 var shape;
 var angle =1;

function setup() {
	createCanvas(windowWidth, windowHeight-100);
  background("#AAAAAA");
  console.log("canvas w="+width+" h="+height);

	x1=random(width);
	y1=random(height);
	x2=x1+arrBase/2;
	y2=y1-arrHeight;
	x3=x1+arrBase;
	y3=y1;
	xCtr=x2;
	yCtr=y2+arrHeight/2;
	fill(204, 101, 192, 255); 
	translate(xCtr,yCtr);
   console.log(shape);
}

function draw() {	

	angleMode(DEGREES);
	angle += 2;

 	rotate(angle); 
 	triangle(x1, y1, x2, y2, x3, y3);
 }

