"use strict";

var canvas;
var ctx;
var img;

var visCanvas;
var vtx;

const VISCANVAS_WIDTH = 500;
const VISCANVAS_HEIGHT = 500;

// var canvas = document.createElement("canvas");
window.onload = function () {
//canvas = document.getElementById("mainCanvas");
canvas = document.createElement("canvas");
canvas.width = 3000;
canvas.height = 3000;
ctx = canvas.getContext("2d");

visCanvas = document.getElementById("displayCanvas");
vtx = visCanvas.getContext("2d");
}

//from colorsys.js

const RGB_MAX = 255
const HUE_MAX = 360
const SV_MAX = 100

function rgb2Hsl(r, g, b) {
  if (typeof r === 'object') {
    const args = r
    r = args.r; g = args.g; b = args.b;
  }
  // It converts [0,255] format, to [0,1]
  r = (r === RGB_MAX) ? 1 : (r % RGB_MAX / parseFloat(RGB_MAX))
  g = (g === RGB_MAX) ? 1 : (g % RGB_MAX / parseFloat(RGB_MAX))
  b = (b === RGB_MAX) ? 1 : (b % RGB_MAX / parseFloat(RGB_MAX))

  var max = Math.max(r, g, b)
  var min = Math.min(r, g, b)
  var h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    var d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: Math.floor(h * HUE_MAX),
    s: Math.floor(s * SV_MAX),
    l: Math.floor(l * SV_MAX)
  }
}

var loadFile = function(event) {

  img = new Image;
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
  //canvas.width = img.width;
//  canvas.height = img.height;
 }
  img.src = URL.createObjectURL(event.target.files[0]);
}

function getImageDataSection(image, widthSector, heightSector, totalHeightSectors, totalWidthSectors)
{
  var widthSectorPercentage = 1/totalWidthSectors;
  var heightSectorPercentage = 1/totalHeightSectors;
  var x1 = Math.floor(image.width*(widthSector/totalWidthSectors));
  var y1 = Math.floor(image.height*(heightSector/totalHeightSectors));
  var sectorWidth = Math.floor(image.width*((1)/totalWidthSectors))
  var sectorHeight = Math.floor(image.height*((1)/totalHeightSectors));
  if (x1 === Infinity)
  {
    x1 = 0;
  }
  if (y1 === Infinity)
  {
    y1 = 0;
  }

  var imageData = ctx.getImageData(x1, y1, sectorWidth, sectorHeight);


  return imageData;

}

function getImageSectionValues(img, widthSections, heightSections)
{
  var averages = [];

  for (var y = 0; y < heightSections; y++)
  {
    for (var x = 0; x < widthSections; x++)
    {
      var imageData = getImageDataSection(img, x, y, widthSections, heightSections);
      averages.push(getImageDataHSLAverages(imageData.data));
    }
  }
  //console.log(averages);
  return averages
}

function getImageDataHSLAverages(imageData)
{
  var colorValues = [];
  var hTotal = 0;
  var sTotal = 0;
  var lTotal = 0;

  var pixelCount = imageData.length/4;
  for (var i = 3; i < imageData.length; i+=4)
  {
    var colorObj = rgb2Hsl(imageData[i-3], imageData[i-2], imageData[i-1]);
    hTotal += colorObj.h;
    sTotal += colorObj.s;
    lTotal += colorObj.l;
  }

  return {h: hTotal/pixelCount, s: sTotal/pixelCount, l: lTotal/pixelCount};
}

function drawVisualizationGrid(rows, columns)
{
  for (var x = 0; x < rows; x++)
  {
    vtx.beginPath();
    vtx.moveTo(0, (x/rows)*visCanvas.height);
    vtx.lineTo(visCanvas.width, (x/rows)*visCanvas.height);
    vtx.stroke();
  }
  for (var y = 0; y < columns; y++)
  {
    vtx.beginPath();
    vtx.moveTo((y/columns)*visCanvas.width, 0);
    vtx.lineTo((y/columns)*visCanvas.width, visCanvas.height);
    vtx.stroke();
  }
}

function drawVisualizationSquare(row, column)
{
  var maxRow = document.getElementById("rowInput").value;
  var maxColumn = document.getElementById("columnInput").value;

  var rectWidth = visCanvas.width/maxRow;
  var rectHeight = visCanvas.height/maxColumn;

  vtx.fillStyle='#ffffff77';
  vtx.fillRect(row*rectWidth, column*rectHeight, rectWidth, rectHeight);
}

function startVisualization(baseWidth, baseHeight)
{
  console.log("?")

  visCanvas.width = baseWidth;
  visCanvas.height = baseHeight;

  var scaleFactor = 0;

  if (img.width > img.height && visCanvas.width > img.width)
  {
    scaleFactor = img.height/visCanvas.height;
  }
  else if (img.height > img.width && visCanvas.height > img.height)
  {
    scaleFactor = img.width/visCanvas.width;
  }
  else if (img.width > img.height && visCanvas.width <= img.width)
  {
    scaleFactor = img.width/visCanvas.width;
  }
  else if (img.height > img.width && visCanvas.height <= img.height)
  {
    scaleFactor = img.height/visCanvas.height;
  }
  else
  {
    scaleFactor = img.height/visCanvas.height;
  }

  visCanvas.width = img.width/scaleFactor;
  visCanvas.height = img.height/scaleFactor;


  vtx.drawImage(img, 0, 0, img.width/scaleFactor, img.height/scaleFactor);


  drawVisualizationGrid(document.getElementById("rowInput").value, document.getElementById("columnInput").value)
}
