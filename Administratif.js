// src/models/Administratif.js

class Administratif {
    constructor(id, nom, prenom, heuresTravail, salaire, responsabilite, numeroBureau) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.heuresTravail = heuresTravail;
        this.salaire = salaire;
        this.responsabilite = responsabilite;
        this.numeroBureau = numeroBureau;
    }

    static validate(data) {
        const errors = [];
        
        if (!data.nom || data.nom.trim() === '') {
            errors.push('Le nom est obligatoire');
        }
        
        if (!data.prenom || data.prenom.trim() === '') {
            errors.push('Le prénom est obligatoire');
        }
        
        if (!data.heuresTravail || data.heuresTravail <= 0) {
            errors.push('Les heures de travail doivent être positives');
        }
        
        if (!data.responsabilite || data.responsabilite.trim() === '') {
            errors.push('La responsabilité est obligatoire');
        }
        
        if (!data.numeroBureau || data.numeroBureau <= 0) {
            errors.push('Le numéro de bureau est obligatoire');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    toJSON() {
        return {
            id: this.id,
            nom: this.nom,
            prenom: this.prenom,
            heuresTravail: this.heuresTravail,
            salaire: this.salaire,
            responsabilite: this.responsabilite,
            numeroBureau: this.numeroBureau
        };
    }

    toString() {
        return `Administratif: ${this.nom} ${this.prenom} - Responsabilité: ${this.responsabilite} - Bureau: ${this.numeroBureau}`;
    }
}

module.exports = Administratif;