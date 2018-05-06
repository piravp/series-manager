const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;        // Either use Heroku's dynamically allocated port, or default to 3000

// Serve up static files (image)
app.use(express.static(publicPath));

// Prevent manual refresh from resulting in 404
app.get('*', (request, response) => {
    // If user refresh any route (thus the asterix, '*', to match 
    // any route), serve up the index.html file
    response.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up and listening at localhost:3000...');
});