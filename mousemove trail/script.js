var canvas = document.getElementById("test");
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener("mousemove", function(event){
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  console.log(mouse);
  init();
});

const colorArray = ["red", "blue", "black"];
var circleArray = [];

function Circle(x, y, radius, dx, color){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.color = color;

  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    ctx.stokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  };

  this.update = function(){
    this.dx += 1;
    this.x -= dx;
    this.draw();
  }
}

function init(){
  for(var i = 0; i < 1; i++){
    var radius = 10;
		var x = mouse.x;
		var y = mouse.y;
		var dx = 3
    circleArray.push(new Circle(x, y, radius, dx, colorArray[Math.floor(Math.random() * colorArray.length)]));
  }
  console.log(circleArray);
}
function animate(){
  requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}
animate();
