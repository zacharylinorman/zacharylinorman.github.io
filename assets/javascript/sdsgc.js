var minMax = {
  "bracelet" : [390, 520],
  "necklace" : [195, 260],
  "belt" : [3900, 5200],
  "ring" : [210, 280],
  "earrings" : [105, 140],
  "orb" : [2100, 2800]
};

function calc(num, min, max){
  return (100 * ((num - min) / (max - min))).toFixed(2);
}

function calcGear(numID, percentID, gear){
  var num = parseInt(document.getElementById(numID).value);
  document.getElementById(percentID).innerHTML = "" + calc(num, minMax[gear][0], minMax[gear][1]) + "%";
}

function calcBracelet(){
  calcGear('braceletNum', 'bracelet%', 'bracelet');
}

function calcNecklace(){
  calcGear('necklaceNum', 'necklace%', 'necklace');
}

function calcBelt(){
  calcGear('beltNum', 'belt%', 'belt');
}

function calcRing(){
  calcGear('ringNum', 'ring%', 'ring');
}

function calcEarrings(){
  calcGear('earringsNum', 'earrings%', 'earrings');
}

function calcOrb(){
  calcGear('orbNum', 'orb%', 'orb');
}
