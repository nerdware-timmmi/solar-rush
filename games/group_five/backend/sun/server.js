const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize with a random number between 0-50
let currentNumber = Math.floor(Math.random() * 51);
let targetNumber = Math.floor(Math.random() * 51);
const updateInterval = 60000; // 1 minute in milliseconds
const stepInterval = 1000; // Update every second for smooth transition

// Function to generate a new target number
function generateNewTarget() {
  targetNumber = Math.floor(Math.random() * 51);
  console.log(`New target number: ${targetNumber}`);
}

// Function to determine the status based on the current number
function getStatus(number) {
  if (number < 5) {
    return "night";
  } else if (number < 30) {
    return "cloudy";
  } else {
    return "sunny";
  }
}

// Function to update the current number gradually toward the target
function updateCurrentNumber() {
  // Calculate the step size for smooth transition
  // We want to reach the target in 60 steps (1 minute with 1-second intervals)
  const stepSize = (targetNumber - currentNumber) / 60;
  
  // Update the current number
  currentNumber += stepSize;
  
  // Ensure the number stays within bounds and is rounded for display
  currentNumber = Math.max(0, Math.min(50, currentNumber));
  
  const status = getStatus(currentNumber);
  console.log(`Current number: ${currentNumber.toFixed(2)}, Status: ${status}`);
}

// Set up the interval to generate a new target number every minute
setInterval(generateNewTarget, updateInterval);

// Set up the interval to update the current number every second
setInterval(updateCurrentNumber, stepInterval);

// Generate initial target
generateNewTarget();

// API endpoint to get the current number
app.get('/', (req, res) => {
  const number = parseFloat(currentNumber.toFixed(2));
  const status = getStatus(number);
  
  res.json({
    number: number,
    status: status,
    target: targetNumber,
    message: 'This number changes naturally over time, updating every minute'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Access http://localhost:3000 to see the current number');
});