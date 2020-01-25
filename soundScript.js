// TESTING ZONE

//The current instrument selected
var sound = new Tone.Synth().toMaster();
//The pitch of the tone to be played (A through G)
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

function setTone(toneLetter) {
  tonality = toneLetter;
}

function setRegi(registerNumber) {
  register = registerNumber;
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

//
