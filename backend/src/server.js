const express = require('express');
require('dotenv').config();
const path = require('path');
const app = require('./app');

const connectDB = require('./config/db');
connectDB();


// Serve Angular static files (dist/stage-blog-portfolio/browser)
const distPath = path.join(__dirname, '../dist/stage-blog-portfolio/browser');
app.use(express.static(distPath));

// Fallback voor alle niet-API routes (Express 5 compatible)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
