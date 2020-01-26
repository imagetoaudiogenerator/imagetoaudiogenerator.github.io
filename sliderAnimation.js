var tonalitySlider;
var sustainSlider;
var dynamicsSlider;

function setSliders(h, s, l) {
  tonalitySlider = (h * (400/360));
  document.getElementById("tona").style.marginTop = tonalitySlider + "px";
  sustainSlider = (s * (400/100));
  document.getElementById("sust").style.marginTop = sustainSlider + "px";
  dynamicsSlider = (l * (400/100));
  document.getElementById("dyna").style.marginTop = dynamicsSlider + "px";
}
