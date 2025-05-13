const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001; // Using port 3001 to avoid conflict with sun server

// Initialize with a random number between -50 and 0
let currentNumber = Math.floor(Math.random() * 51) * -1; // Generate between -50 and 0
let targetNumber = Math.floor(Math.random() * 51) * -1;  // Generate between -50 and 0
const updateInterval = 60000; // 1 minute in milliseconds
const stepInterval = 1000; // Update every second for smooth transition

// Function to generate a new target number
function generateNewTarget() {
  targetNumber = Math.floor(Math.random() * 51) * -1; // Generate between -50 and 0
  console.log(`New target number: ${targetNumber}`);
}

// Function to update the current number gradually toward the target
function updateCurrentNumber() {
  // Calculate the step size for smooth transition
  // We want to reach the target in 60 steps (1 minute with 1-second intervals)
  const stepSize = (targetNumber - currentNumber) / 60;
  
  // Update the current number
  currentNumber += stepSize;
  
  // Ensure the number stays within bounds and is rounded for display
  currentNumber = Math.max(-50, Math.min(0, currentNumber));
  
  console.log(`Current number: ${currentNumber.toFixed(2)}`);
}

// Set up the interval to generate a new target number every minute
setInterval(generateNewTarget, updateInterval);

// Set up the interval to update the current number every second
setInterval(updateCurrentNumber, stepInterval);

// Generate initial target
generateNewTarget();

// API endpoint to get the current number
app.get('/', (req, res) => {
  res.json({
    number: parseFloat(currentNumber.toFixed(2)),
    target: targetNumber,
    message: 'This number changes naturally over time, updating every minute'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access http://localhost:${PORT} to see the current number`);
});