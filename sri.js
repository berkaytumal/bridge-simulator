const fs = require('fs');
const crypto = require('crypto');

function generateSRI(filePath) {
    const fileData = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha256').update(fileData).digest('base64');
    return `sha256-${hash}`;
}

// Specify the path to your bridgemock.js file
const filePath = "dist/bridgemock.js"

// Generate the SRI hash
const integrityValue = generateSRI(filePath);

// Log the integrity value
console.log(integrityValue);
try {
    fs.writeFileSync('dist/sri', integrityValue);
    console.log('SRI hash has been saved to sri.txt');
  } catch (err) {
    console.error('Error writing SRI hash to file:', err);
  }