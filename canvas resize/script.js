/* simple canvas drawing
var canvas = document.getElementById('resize');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

//rectangle
ctx.fillStyle = "#fa34a3";
ctx.fillRect(100, 100, 100, 100);

//line
ctx.beginPath();
ctx.moveTo(50,300);
ctx.lineTo(300, 100);
ctx.strokeStyle = "blue";
ctx.stroke();

//arc/ circle
ctx.beginPath();
ctx.arc(200, 200, 50, 0, Math.PI * 2, false);
ctx.strokeStyle = "red";
ctx.stroke();

//for loop circle

for (var i = 0; i < 1; i++){
  var x = Math.random() * window.innerWidth;
  var y = Math.random() * window.innerHeight;
  ctx.beginPath();
  ctx.arc(x, y, 50, 0, Math.PI * 2, false);
  ctx.stroke();
}
*/
var mouse = {
  x: undefined,
  y: undefined
};
window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
});

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

var canvas = document.getElementById('resize');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

var colorArray = ["rgba(2, 62, 140, 1)", "rgba(3, 119, 191, 1)", "rgba(3, 138, 191, 1)", "rgba(48, 206, 242, 1)","rgba(2, 62, 140, 0.3)", "rgba(3, 119, 191, 0.5)", "rgba(3, 138, 191, 0.4)", "rgba(48, 206, 242, 0.25)"];

function Circle(x, y, radius, dx, dy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];
    ctx.fill();
    ctx.stroke();
  }

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //interact
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < 40) {
        this.radius += 1;
      }
    } else if (this.radius > 2) {
      this.radius -= 1;
    }
    this.draw();
  }
}

var circleArray = [];

function init() {
  circleArray = [];
  for (var i = 0; i < 30; i++) {
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var dx = Math.random() * 10;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dy = Math.random() * 10;
    var radius = 30;
    circleArray.push(new Circle(x, y, radius, dx, dy));
  }
}

function animate() {
  //loop self
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();


