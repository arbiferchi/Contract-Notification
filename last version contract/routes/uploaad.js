const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Other routes and middleware definitions
// ...

// Start the server
const PORT = 1122;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
