const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const planetInfo = require('../data/planetInfo.json');

// Function to plot radial coordinates with labels
function plotPolar(coordinates, labels) {
  // Set canvas dimensions
  const canvasWidth = 400;
  const canvasHeight = 400;

  // Create a canvas
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  // Set background color
  ctx.fillStyle = '#ffffff'; // White color
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Set the center of the canvas
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Set radius scale (adjust as needed)
  const radiusScale = 0.9;

  // Set point color and size
  const pointColor = '#007bff';
  const pointSize = 2;

  // Draw coordinate frame
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, canvasHeight);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(canvasWidth, centerY);
  ctx.stroke();

  // Draw each point on the canvas with labels
  coordinates.forEach((coordinate, index) => {
    const [angle, radius] = coordinate;

    // Convert polar coordinates to Cartesian coordinates
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    // Draw the point on the canvas
    ctx.fillStyle = pointColor;
    ctx.beginPath();
    ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
    ctx.fill();

    // Draw label within the dot
    ctx.fillStyle = '#000000'; // Black color for labels
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(labels[index], x, y + 3); // Adjust the label position as needed
  });

  // Draw origin point
  ctx.fillStyle = '#ff0000'; // Red color for the origin point
  ctx.beginPath();
  ctx.arc(centerX, centerY, pointSize, 0, 2 * Math.PI);
  ctx.fill();

  // Save the canvas as an image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('polar_coordinates_plot_with_labels.png', buffer);

  console.log('Plot saved as radial_coordinates_plot_with_labels.png');
}

function plotRect(coordinates, labels) {
    const canvasWidth = 1000;
    const canvasHeight = 1000;
  
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');
  
    // Set background color
    ctx.fillStyle = '#ffffff'; // White color
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
    // Set the center of the canvas
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
  
    // Set radius scale (adjust as needed)
    const radiusScale = 0.9;
  
    // Set point color and size
    const pointColor = '#007bff';
    const pointSize = 5;
  
    // Draw coordinate frame
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvasHeight);
    ctx.stroke();
  
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvasWidth, centerY);
    ctx.stroke();
  
    // Draw origin point
    ctx.fillStyle = '#ff0000'; // Red color for the origin point
    ctx.beginPath();
    ctx.arc(centerX, centerY, pointSize, 0, 2 * Math.PI);
    ctx.fill();
  
    // Draw each point on the canvas with labels
    coordinates.forEach((coord, index) => {
      const [x, y] = coord;
  
      // Draw the point on the canvas
      ctx.fillStyle = pointColor;
      ctx.beginPath();
      ctx.arc(centerX + x * radiusScale, centerY - y * radiusScale, pointSize, 0, 2 * Math.PI);
      ctx.fill();
  
      // Draw label within the dot
      ctx.fillStyle = '#000000'; // Black color for labels
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(labels[index], centerX + x * radiusScale, centerY - y * radiusScale + 3); // Adjust the label position as needed
    });
  
    // Save the canvas as an image
    const outputPath = 'rect_coordinates_plot_with_labels.png';
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
  
    console.log(`Plot with labels and frame saved as ${outputPath}`);
}

// Isolate coordinates from planetInfo
let coordinates = [];
let indices = [];
for (i=0; i<planetInfo.length; i++) {
    const coordinate = [planetInfo[i].position.x * 400, planetInfo[i].position.y * 400];
    coordinates.push(coordinate);
    indices.push(`${planetInfo[i].sector} ${planetInfo[i].index}`);
};

// Plot the coordinates with labels
plotPolar(coordinates, indices);
plotRect(coordinates, indices);