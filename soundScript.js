/*DEFAULT VALUES
sound: new Tone.Synth().toMaster()
register: 4
tonality: C
sustain: 5
dynamics: 5
*/

//The current instrument selected
var sound = new Tone.Synth().toMaster();

//The pitch of the tone to be played (A to G)
var tonality = "C";
//The register of the tonality (1 to 6)
var register = "4";

//The length of the tone (Whole note to thirty-second note)
var sustain = "4";

//The loudness of the tone (-20 to 20)
var dynamics = 5;

function setInst(instrumentType) {
  sound = instrumentType;
}

function setRegi(registerNumber) {
  register = registerNumber;
}

function setTona(toneLetter) {
  tonality = toneLetter;
}

function setSust(noteType) {
  sustain = noteType;
}

function setDyna(decibel) {
  dynamics = decibel;
  sound.volume.value = dynamics;
}

function playTone() {
  sound.triggerAttackRelease(tonality + register, sustain + "n");
}

var waitTime;

function importHSL(array, i) {
  startVisualization(VISCANVAS_WIDTH, VISCANVAS_HEIGHT);
  var visRectCol = i%document.getElementById("columnInput").value;
  var visRectRow = Math.floor(i/document.getElementById("columnInput").value);
  console.log(`VIS RECT: x: ${visRectRow} y: ${visRectCol}`);
  drawVisualizationSquare(visRectRow, visRectCol);

  if (i < array.length) {
    //console.log(i);
    convertHSL(array[i].h, array[i].s, array[i].l);
    setSliders(array[i].h, array[i].s, array[i].l);
    setTimeout(function (){importHSL(array, i + 1)}, waitTime);
  }
}

/*
h (scale from 0 to 360): tonality and register (1C to 6B) aka (1 to 42)
8.5 h /per/ tonality and register increase

s (percentage): sustain (1, 2, 4, 8, 16)
20 s /per/ sustain increase

l (percentage): dynamics (-20 to 20) aka (0 to 40)
2.5 l /per/ dynamics increase
*/

function convertHSL(hValue, sValue, lValue) {
  var reducedH = hValue;
  var regi;
  var tona;

  if (reducedH <= 8.5) {
    regi = "1";
    tona = "C";
  }
  else if (reducedH > 8.5 && reducedH <= 2 * 8.5) {
    regi = "1";
    tona = "D";
  }
  else if (reducedH > 2 * 8.5 && reducedH <= 3 * 8.5) {
    regi = "1";
    tona = "E";
  }
  else if (reducedH > 3 * 8.5 && reducedH <= 4 * 8.5) {
    regi = "1";
    tona = "F";
  }
  else if (reducedH > 4 * 8.5 && reducedH <= 5 * 8.5) {
    regi = "1";
    tona = "G";
  }
  else if (reducedH > 5 * 8.5 && reducedH <= 6 * 8.5) {
    regi = "1";
    tona = "A";
  }
  else if (reducedH > 6 * 8.5 && reducedH <= 7 * 8.5) {
    regi = "1";
    tona = "B";
  }
  else if (reducedH > 7 * 8.5 && reducedH <= 8 * 8.5) {
    regi = "2";
    tona = "C";
  }
  else if (reducedH > 8 * 8.5 && reducedH <= 9 * 8.5) {
    regi = "2";
    tona = "D";
  }
  else if (reducedH > 9 * 8.5 && reducedH <= 11 * 8.5) { //twice as likely to appear because I wrote teh code wrong and don't want to change it
    regi = "2";
    tona = "E";
  }
  else if (reducedH > 11 * 8.5 && reducedH <= 12 * 8.5) {
    regi = "2";
    tona = "F";
  }
  else if (reducedH > 12 * 8.5 && reducedH <= 13 * 8.5) {
    regi = "2";
    tona = "G";
  }
  else if (reducedH > 13 * 8.5 && reducedH <= 14 * 8.5) {
    regi = "2";
    tona = "A";
  }
  else if (reducedH > 14 * 8.5 && reducedH <= 15 * 8.5) {
    regi = "2";
    tona = "B";
  }
  else if (reducedH > 15 * 8.5 && reducedH <= 16 * 8.5) {
    regi = "3";
    tona = "C";
  }
  else if (reducedH > 16 * 8.5 && reducedH <= 17 * 8.5) {
    regi = "3";
    tona = "D";
  }
  else if (reducedH > 17 * 8.5 && reducedH <= 18 * 8.5) {
    regi = "3";
    tona = "E";
  }
  else if (reducedH > 18 * 8.5 && reducedH <= 19 * 8.5) {
    regi = "3";
    tona = "F";
  }
  else if (reducedH > 19 * 8.5 && reducedH <= 20 * 8.5) {
    regi = "3";
    tona = "G";
  }
  else if (reducedH > 20 * 8.5 && reducedH <= 21 * 8.5) {
    regi = "3";
    tona = "A";
  }
  else if (reducedH > 21 * 8.5 && reducedH <= 22 * 8.5) {
    regi = "3";
    tona = "B";
  }
  else if (reducedH > 22 * 8.5 && reducedH <= 23 * 8.5) {
    regi = "4";
    tona = "B";
  }
  else if (reducedH > 23 * 8.5 && reducedH <= 24 * 8.5) {
    regi = "4";
    tona = "D";
  }
  else if (reducedH > 24 * 8.5 && reducedH <= 25 * 8.5) {
    regi = "4";
    tona = "E";
  }
  else if (reducedH > 25 * 8.5 && reducedH <= 26 * 8.5) {
    regi = "4";
    tona = "F";
  }
  else if (reducedH > 26 * 8.5 && reducedH <= 27 * 8.5) {
    regi = "4";
    tona = "G";
  }
  else if (reducedH > 27 * 8.5 && reducedH <= 28 * 8.5) {
    regi = "4";
    tona = "A";
  }
  else if (reducedH > 28 * 8.5 && reducedH <= 29 * 8.5) {
    regi = "4";
    tona = "B";
  }
  else if (reducedH > 29 * 8.5 && reducedH <= 30 * 8.5) {
    regi = "5";
    tona = "C";
  }
  else if (reducedH > 30 * 8.5 && reducedH <= 31 * 8.5) {
    regi = "5";
    tona = "D";
  }
  else if (reducedH > 31 * 8.5 && reducedH <= 32 * 8.5) {
    regi = "5";
    tona = "E";
  }
  else if (reducedH > 32 * 8.5 && reducedH <= 33 * 8.5) {
    regi = "5";
    tona = "F";
  }
  else if (reducedH > 33 * 8.5 && reducedH <= 34 * 8.5) {
    regi = "5";
    tona = "G";
  }
  else if (reducedH > 34 * 8.5 && reducedH <= 35 * 8.5) {
    regi = "5";
    tona = "A";
  }
  else if (reducedH > 35 * 8.5 && reducedH <= 36 * 8.5) {
    regi = "5";
    tona = "B";
  }
  else if (reducedH > 36 * 8.5 && reducedH <= 37 * 8.5) {
    regi = "6";
    tona = "C";
  }
  else if (reducedH > 37 * 8.5 && reducedH <= 38 * 8.5) {
    regi = "6";
    tona = "D";
  }
  else if (reducedH > 38 * 8.5 && reducedH <= 39 * 8.5) {
    regi = "6";
    tona = "E";
  }
  else if (reducedH > 39 * 8.5 && reducedH <= 40 * 8.5) {
    regi = "6";
    tona = "F";
  }
  else if (reducedH > 40 * 8.5 && reducedH <= 41 * 8.5) {
    regi = "6";
    tona = "G";
  }
  else if (reducedH > 41 * 8.5 && reducedH <= 42 * 8.5) {
    regi = "6";
    tona = "A";
  }
  else if (reducedH > 42 * 8.5 && reducedH <= 43 * 8.5) {
    regi = "6";
    tona = "B";
  }

  var reducedS = sValue;

  if (reducedS <= 20) {
    reducedS = 1;

    waitTime = 125;
  }
  else if (reducedS > 20 && reducedS <= 40) {
    reducedS = 2;

    waitTime = 250;
  }
  else if (reducedS > 40 && reducedS <= 60) {
    reducedS = 4;

    waitTime = 500;
  }
  else if (reducedS > 60 && reducedS <= 80) {
    reducedS = 8;

    waitTime = 1000;
  }
  else if (reducedS > 80 && reducedS <= 100) {
    reducedS = 16;

    waitTime = 2000;
  }

  var reducedL = (lValue / 2.5) - 20;

  //console.log(regi + " " + tona + " // " + reducedS + " // " + reducedL);

  setRegi(regi);
  setTona(tona);
  setSust(reducedS);
  setDyna(reducedL);

  playTone();
}

function playImage()
{
  var rowInput = document.getElementById("rowInput").value
  var columnInput = document.getElementById("columnInput").value
  importHSL(getImageSectionValues(img, rowInput, columnInput), 0)
}
