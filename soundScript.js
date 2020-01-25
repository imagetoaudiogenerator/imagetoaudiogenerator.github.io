// TESTING ZONE

//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster();

//The pitch of the tone to be played
var tonality = "C";
//The length of the tone
var sustain = "4";
//The loudness of the tone
var dynamics = 0;

function setTone(toneLetter) {
  tonality = toneLetter;
}

function setSust(noteType) {
  sustain = noteType;
}

function setDyna(decibel) {
  dynamics = decibel;
}

function playTone() {
  //play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease(tonality + "4", sustain + "n");
}

//TypeError: Argument 1 of AudioParam.setValueAtTime is not a finite floating-point value.

//
