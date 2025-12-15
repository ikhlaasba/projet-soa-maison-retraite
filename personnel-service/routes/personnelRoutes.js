// ====================================================================
// FICHIER 7 : routes/personnelRoutes.js
// Où le créer : Dans le dossier routes/
// Description : Définition des routes de l'API
// ====================================================================

const express = require('express');
const router = express.Router();
const personnelController = require('../controllers/personnelController');
const authMiddleware = require('../middleware/auth');

// ============================================
// TOUTES LES ROUTES SONT PROTÉGÉES
// (nécessitent un token JWT valide)
// ============================================
router.use(authMiddleware);

// ============================================
// ROUTES CRUD
// ============================================

// GET /api/personnel - Lister tous les personnels
router.get('/', personnelController.getAllPersonnel);

// GET /api/personnel/:id - Récupérer un personnel par ID
router.get('/:id', personnelController.getPersonnelById);

// POST /api/personnel - Créer un nouveau personnel
router.post('/', personnelController.createPersonnel);

// PUT /api/personnel/:id - Modifier un personnel
router.put('/:id', personnelController.updatePersonnel);

// DELETE /api/personnel/:id - Supprimer un personnel
router.delete('/:id', personnelController.deletePersonnel);

// ============================================
// ROUTE SPÉCIALE - Calcul de salaire
// ============================================
// GET /api/personnel/:id/salaire?taux=20
router.get('/:id/salaire', personnelController.getSalaire);

module.exports = router;
