const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Endpoint to receive data
app.post('/endpoint', (req, res) => {
  console.log("📥 Received data:");
  console.log(JSON.stringify(req.body, null, 2));

  // Optionally save to a file
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  fs.writeFileSync(`data_${timestamp}.json`, JSON.stringify(req.body, null, 2));

  res.send('✅ Data received successfully!');
});

// Root route
app.get('/', (req, res) => {
  res.send('🌐 Webserver running! Send data to /endpoint');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
