// ====================================================================
// FICHIER 4 : models/Personnel.js
// Où le créer : Dans le dossier models/
// Description : Modèle de données pour MongoDB
// ====================================================================

const mongoose = require('mongoose');

// Définition du schéma (structure) d'un personnel
const personnelSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,  // Obligatoire
        unique: true     // Pas de doublon
    },
    nom: {
        type: String,
        required: true,
        trim: true  // Enlève les espaces avant/après
    },
    prenom: {
        type: String,
        required: true,
        trim: true
    },
    salaire: {
        type: Number,
        default: 0  // Valeur par défaut
    },
    heuresTravail: {
        type: Number,
        required: true,
        min: 0,  // Minimum 0 heure
        max: 168 // Maximum 168 heures (7 jours x 24h)
    },
    type: {
        type: String,
        enum: ['GENERAL', 'SANTE', 'ADMINISTRATIF', 'MENAGE'],
        default: 'GENERAL'
    }
}, {
    timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

// ============================================
// MÉTHODE POUR CALCULER LE SALAIRE
// ============================================
personnelSchema.methods.calculerSalaire = function(tauxHoraire = 15) {
    // 'this' fait référence au personnel actuel
    this.salaire = this.heuresTravail * tauxHoraire;
    return this.salaire;
};

// Exporter le modèle
module.exports = mongoose.model('Personnel', personnelSchema);
