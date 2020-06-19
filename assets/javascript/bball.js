var canvas = document.getElementById('canvas');
var c = canvas.getContext("2d");
var WIDTH = canvas.width, HEIGHT = canvas.height;
var BASKETBALL_INITIAL_X = 50, BASKETBALL_INITIAL_Y = 650;
var CAN_SCORE_LINE = 270;
var GRAVITY = 0.5;
var POWER = 0.12;
var mousePos = {
  x: 0,
  y: 0
}

var canScore = false;
var launched = false;


canvas.addEventListener('mousemove', function(e){
  var canvasRect = canvas.getBoundingClientRect();
  mousePos.x = e.clientX - canvasRect.left - 0.5;
  mousePos.y = e.clientY - canvasRect.top;
}, false);

canvas.addEventListener('click', function(e){
  //if(!launched){
    basketball.velocity.x = (mousePos.x - arrow.x) * POWER;
    basketball.velocity.y = (mousePos.y - arrow.y) * POWER;
    launched = true;
  //}
}, false);

window.addEventListener('keydown', function(e){
  if(e.keyCode == 32){
    reset();
  }
}, false);

//Objects
function vector(x, y) {
  this.x = x;
  this.y = y;
  this.add = function(vector){
    this.x += vector.x;
    this.y += vector.y;
  }
}

var arrow = {
  coords : new vector(0, 0),

  get x(){
    return this.coords.x;
  },

  get y(){
    return this.coords.y;
  },

  set x(x){
    this.coords.x = x;
  },

  set y(y){
    this.coords.y = y;
  }
}

var basketball = {
  coords: new vector(BASKETBALL_INITIAL_X, BASKETBALL_INITIAL_Y),
  velocity: new vector(0, 0),
  acceleration: new vector(0, GRAVITY),
  r: 40,

  get x(){
    return this.coords.x;
  },

  get y(){
    return this.coords.y;
  },

  set x(x){
    this.coords.x = x;
  },

  set y(y){
    this.coords.y = y;
  }
};

var backboard = {
  x: 1270,
  y: 150,
  width: 10,
  height: 120
}

var hoopRect = {
  x: 1117.5,
  y: 267.5,
  width: 5,
  height: 5
}


function update(){
  // Basketball Logic
  basketball.coords.add(basketball.velocity);
  basketball.velocity.add(basketball.acceleration);

  // Collisions
  if(basketball.y + basketball.r >= HEIGHT){
    basketball.y = HEIGHT - basketball.r;
    basketball.velocity.y /= -1.4;
    if(basketball.velocity.y > -2.5){
      basketball.velocity.y = 0;
      basketball.acceleration.y = 0;
    }
  }else{
    basketball.acceleration.y = GRAVITY;
  }
    // Backboard collision
  if(basketball.x + basketball.r >= backboard.x
    && basketball.x - basketball.r <= backboard.x + backboard.width
    && basketball.y + basketball.r >= backboard.y
    && basketball.y - basketball.r <= backboard.y + backboard.height){
    basketball.x = backboard.x - basketball.r;
    basketball.velocity.x /= -1.8;
  }
  ///////////////////////////////////////////////////
    /********WORK IN PROGRESS**********************/
    // Rim Collision

  if(basketball.x + basketball.r >= hoopRect.x
    && basketball.x - basketball.r <= hoopRect.x + hoopRect.width
    && basketball.y + basketball.r >= hoopRect.y
    && basketball.y - basketball.r <= hoopRect.y + hoopRect.height){
    if(basketball.velocity.x > 0 && basketball.x < hoopRect.x + hoopRect.width){
      basketball.x = hoopRect.x - basketball.r;
    }else {
      basketball.x = hoopRect.x + hoopRect.width + basketball.r;
    }
    basketball.velocity.x /= -1.8;
    basketball.velocity.y /= -1.8;
  }
/////////////////////////////////////////////////////

  if(canScore){
    if(basketball.x + basketball.r <= backboard.x
      && basketball.x - basketball.r >= 1120
      && basketball.y - basketball.r >= CAN_SCORE_LINE){
        console.log("Scored!");
        canScore = false;
      }
  }

  if(basketball.y - basketball.r <= CAN_SCORE_LINE){
    canScore = true;
  }else{
    canScore = false;
  }



  arrow.x = basketball.x;
  arrow.y = basketball.y;
}

function render(){
  c.clearRect(0, 0, WIDTH, HEIGHT);

  // Drawing the top part of the hoop
  c.save();
  c.scale(1, 0.3);
  c.beginPath();
  c.arc(1200, 900, 80, Math.PI, 2*Math.PI);
  c.stroke();
  c.restore();

  // Drawing the basketball
  c.save();
  c.beginPath();
  c.arc(basketball.x, basketball.y, basketball.r, 0, 2*Math.PI);
  c.fillStyle = "orange";
  c.fill();
  c.stroke();
  c.restore();

  // Drawing the arrow
  if(!launched){
    c.beginPath();
    c.moveTo(arrow.x, arrow.y);
    c.lineTo(mousePos.x, mousePos.y);
    c.stroke();
  }

  // Drawing the bottom part of the hoop
  c.save();
  c.scale(1, 0.3);
  c.beginPath();
  c.arc(1200, 900, 80, 0, Math.PI);
  c.stroke();
  c.restore();

  // Draw the backboard
  c.fillRect(backboard.x, backboard.y, backboard.width, backboard.height);

  /*
  c.beginPath();
  c.moveTo(0, CAN_SCORE_LINE);
  c.lineTo(WIDTH, CAN_SCORE_LINE);
  c.stroke();
  */
  //c.fillRect(hoopRect.x, hoopRect.y, hoopRect.width, hoopRect.height);
}

function reset(){
  basketball.x = BASKETBALL_INITIAL_X;
  basketball.y = BASKETBALL_INITIAL_Y;
  basketball.velocity.x = 0;
  basketball.velocity.y = 0;
  basketball.acceleration.x = 0;
  basketball.acceleration.y = 0;
  launched = false;
}


function loop(){
  update();
  render();
}

window.onload = function(){
  update();
  render();
  setInterval(loop, 1000/60);
}
