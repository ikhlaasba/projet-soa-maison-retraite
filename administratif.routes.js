// src/routes/administratif.routes.js

const express = require('express');
const router = express.Router();
const administratifController = require('../controllers/administratif.controller');

router.get('/', administratifController.getAllAdministratifs.bind(administratifController));
router.get('/:id', administratifController.getAdministratifById.bind(administratifController));
router.post('/', administratifController.createAdministratif.bind(administratifController));
router.put('/:id', administratifController.updateAdministratif.bind(administratifController));
router.delete('/:id', administratifController.deleteAdministratif.bind(administratifController));
router.get('/search/responsabilite/:responsabilite', administratifController.searchByResponsabilite.bind(administratifController));
router.get('/search/bureau/:numeroBureau', administratifController.searchByBureau.bind(administratifController));

module.exports = router;