const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Function to generate a random color with controlled brightness
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  // Optionally adjust the brightness here if needed
  return color;
};

// Function to add a semi-transparent overlay to darken the gradient
const addOverlay = (ctx, width, height) => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Adjust opacity as needed
  ctx.fillRect(0, 0, width, height);
};

// Updated function to generate gradient backgrounds
const generateRandomGradientBackgrounds = (numImages) => {
  const width = 1920;
  const height = 1080;
  const outputDir = './images';

  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
  }

  for (let i = 0; i < numImages; i++) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, width, height);

    // Use two random colors for the gradient
    gradient.addColorStop(0, getRandomColor());
    gradient.addColorStop(1, getRandomColor());

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add a semi-transparent overlay to darken the gradient
    addOverlay(ctx, width, height);

    // Construct the file name and save the image
    const outputFile = path.join(outputDir, `gradient_background_${i + 1}.png`);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputFile, buffer);
  }

  console.log(`${numImages} gradient background images with better contrast for white text have been generated in ${outputDir}`);
};

// Example usage: Generate 5 random gradient images with improved contrast for white text
generateRandomGradientBackgrounds(50);
