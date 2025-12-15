// src/app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const administratifRoutes = require('./routes/administratif.routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Service Administratif est opérationnel',
        timestamp: new Date().toISOString(),
        service: 'administratif-service',
        version: '1.0.0'
    });
});

app.use('/api/administratifs', administratifRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route non trouvée',
        requestedUrl: req.originalUrl
    });
});

app.use((error, req, res, next) => {
    console.error('Erreur serveur:', error);
    
    res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Erreur interne du serveur',
        error: process.env.NODE_ENV === 'development' ? error : {}
    });
});

module.exports = app;