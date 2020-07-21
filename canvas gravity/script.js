var canvas = document.getElementById('gravity');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var circleArray = [];
var colorArray = ["#0540F2", "#F2E205", "#02732A", "#F24130", "#3D6AF2"];

var mouse = {
  x: innerWidth/2,
  y: innerHeight/2
};

var gravity = 0.3;
var friction = 0.98;

addEventListener('mousemove', function(event){
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', function(){
  init();
});

function Cicle(x, y, radius, dx, dy, color){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2,false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  };

   this.update = function(){
    if(this.y + this.radius + this.dy > canvas.height){
      this.dy = -this.dy;
      this.dy = this.dy * friction;
      this.dx = this.dx * friction;
    }else{
      this.dy += gravity;
    }
    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
			this.dx = -this.dx * friction;
		}
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
  }
}

function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function init(){
  circleArray = [];
  for(var i = 0; i < 30; i++){
    var radius = randomIntFromRange(8, 20);
		var x = randomIntFromRange(radius, canvas.width - radius);
		var y = randomIntFromRange(0, canvas.height - radius);
		var dx = randomIntFromRange(-3, 3)
		var dy = randomIntFromRange(-2, 2)
    circleArray.push(new Cicle(x, y, radius, dx, dy, colorArray[Math.floor(Math.random() * colorArray.length)]));
  }
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}

init();
animate();
