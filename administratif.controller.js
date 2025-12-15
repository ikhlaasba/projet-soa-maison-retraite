// src/controllers/administratif.controller.js

const database = require('../config/database');
const Administratif = require('../models/Administratif');

class AdministratifController {
    
    getAllAdministratifs(req, res) {
        try {
            const administratifs = database.findAll();
            
            res.status(200).json({
                success: true,
                count: administratifs.length,
                data: administratifs
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des administratifs',
                error: error.message
            });
        }
    }

    getAdministratifById(req, res) {
        try {
            const { id } = req.params;
            const administratif = database.findById(id);

            if (!administratif) {
                return res.status(404).json({
                    success: false,
                    message: `Administratif avec l'ID ${id} non trouvé`
                });
            }

            res.status(200).json({
                success: true,
                data: administratif
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération de l\'administratif',
                error: error.message
            });
        }
    }

    createAdministratif(req, res) {
        try {
            const { nom, prenom, heuresTravail, salaire, responsabilite, numeroBureau } = req.body;

            const validation = Administratif.validate(req.body);
            
            if (!validation.isValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Données invalides',
                    errors: validation.errors
                });
            }

            const newAdministratif = database.create({
                nom,
                prenom,
                heuresTravail,
                salaire,
                responsabilite,
                numeroBureau
            });

            res.status(201).json({
                success: true,
                message: 'Administratif créé avec succès',
                data: newAdministratif
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la création de l\'administratif',
                error: error.message
            });
        }
    }

    updateAdministratif(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const existingAdmin = database.findById(id);
            if (!existingAdmin) {
                return res.status(404).json({
                    success: false,
                    message: `Administratif avec l'ID ${id} non trouvé`
                });
            }

            const updatedAdministratif = database.update(id, updateData);

            res.status(200).json({
                success: true,
                message: 'Administratif mis à jour avec succès',
                data: updatedAdministratif
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la mise à jour de l\'administratif',
                error: error.message
            });
        }
    }

    deleteAdministratif(req, res) {
        try {
            const { id } = req.params;

            const existingAdmin = database.findById(id);
            if (!existingAdmin) {
                return res.status(404).json({
                    success: false,
                    message: `Administratif avec l'ID ${id} non trouvé`
                });
            }

            const deleted = database.delete(id);

            if (deleted) {
                res.status(200).json({
                    success: true,
                    message: 'Administratif supprimé avec succès'
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la suppression de l\'administratif',
                error: error.message
            });
        }
    }

    searchByResponsabilite(req, res) {
        try {
            const { responsabilite } = req.params;
            const administratifs = database.findByResponsabilite(responsabilite);

            res.status(200).json({
                success: true,
                count: administratifs.length,
                data: administratifs
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la recherche',
                error: error.message
            });
        }
    }

    searchByBureau(req, res) {
        try {
            const { numeroBureau } = req.params;
            const administratifs = database.findByNumeroBureau(numeroBureau);

            res.status(200).json({
                success: true,
                count: administratifs.length,
                data: administratifs
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la recherche',
                error: error.message
            });
        }
    }
}

module.exports = new AdministratifController();