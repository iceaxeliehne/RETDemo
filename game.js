

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//https://iceaxeliehne.github.io/RETDemo/spinningBall.png

var spriteSheet = new Image();
spriteSheet.src = "https://iceaxeliehne.github.io/RETDemo/spinningBall.png";

spriteSheet.onload = function() {
  var imgWidth = spriteSheet.width;
  var imgHeight = spriteSheet.height;
  var numberOfRows = 2;
  var numberOfColumns = 2;
  //first frame goes from 0,0
  
  // frame width = image width / columns
  // frame height = image height / rows
  var sx = 0;
  var sy = 0;
  var frameWidth = imgWidth / numberOfColumns;
  var frameHeight = imgHeight / numberOfRows;
  
  console.log(imgWidth);

  ctx.drawImage(spriteSheet, sx, sy, frameWidth, frameHeight, 50, 50, 100, 100);

}
