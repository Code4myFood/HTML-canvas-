var canvas = document.getElementById('draw');
var ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var img = new Image();
img.src = "img/stardust.jpg";
img.onload = function(){
  ctx.drawImage(img, 0, 0);
}
