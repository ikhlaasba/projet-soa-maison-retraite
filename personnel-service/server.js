// ====================================================================
// FICHIER 3 : server.js
// Où le créer : À la RACINE du dossier personnel-service
// Description : Point d'entrée de l'application
// ====================================================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ============================================
// MIDDLEWARE (pour traiter les requêtes)
// ============================================
app.use(cors()); // Permet les requêtes de n'importe où
app.use(express.json()); // Permet de lire le JSON dans les requêtes

// ============================================
// CONNEXION À MONGODB
// ============================================
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connecté avec succès !');
        console.log('Base de données : personnel_db');
    })
    .catch(err => {
        console.error('Erreur de connexion MongoDB:', err.message);
        console.log('Assurez-vous que MongoDB tourne avec : docker ps');
    });
    // ============================================
// ROUTES
// ============================================
// Toutes les routes /api/personnel vont vers personnelRoutes.js
app.use('/api/personnel', require('./routes/personnelRoutes'));

// ============================================
// ROUTE DE TEST (pour vérifier que ça marche)
// ============================================
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'Service Personnel',
        port: process.env.PORT || 8082,
        date: new Date().toLocaleString()
    });
});

// Route d'accueil
app.get('/', (req, res) => {
    res.json({
        message: ' Service Personnel API',
        endpoints: {
            health: '/health',
            personnel: '/api/personnel'
        }
    });
});

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log('\n================================');
    console.log('   SERVICE PERSONNEL DÉMARRÉ !');
    console.log('================================');
    console.log(` Port : ${PORT}`);
    console.log(` URL : http://localhost:${PORT}`);
    console.log(` Health : http://localhost:${PORT}/health`);
    console.log('================================\n');
});