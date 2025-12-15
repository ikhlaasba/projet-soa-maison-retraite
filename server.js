// server.js

require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3002;

const server = app.listen(PORT, () => {
    console.log('==================================================');
    console.log('SERVICE ADMINISTRATIF DEMARRE');
    console.log('==================================================');
    console.log('Port: ' + PORT);
    console.log('Environment: ' + (process.env.NODE_ENV || 'development'));
    console.log('Heure de demarrage: ' + new Date().toISOString());
    console.log('==================================================');
    console.log('\nRoutes disponibles:');
    console.log('   GET    http://localhost:' + PORT + '/health');
    console.log('   GET    http://localhost:' + PORT + '/api/administratifs');
    console.log('   GET    http://localhost:' + PORT + '/api/administratifs/:id');
    console.log('   POST   http://localhost:' + PORT + '/api/administratifs');
    console.log('   PUT    http://localhost:' + PORT + '/api/administratifs/:id');
    console.log('   DELETE http://localhost:' + PORT + '/api/administratifs/:id');
    console.log('==================================================');
});

process.on('SIGTERM', () => {
    console.log('\nSIGTERM recu. Arret du serveur...');
    server.close(() => {
        console.log('Serveur arrete proprement');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\nSIGINT recu. Arret du serveur...');
    server.close(() => {
        console.log('Serveur arrete proprement');
        process.exit(0);
    });
});