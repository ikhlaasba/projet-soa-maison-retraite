// src/config/database.js

const Administratif = require('../models/Administratif');

class Database {
    constructor() {
        this.administratifs = [];
        this.currentId = 1;
        this.initializeData();
    }

    initializeData() {
        this.administratifs.push(
            new Administratif(
                this.currentId++,
                'Dupont',
                'Marie',
                35,
                2500.00,
                'Directrice',
                101
            )
        );
        
        this.administratifs.push(
            new Administratif(
                this.currentId++,
                'Martin',
                'Pierre',
                40,
                2200.00,
                'Responsable RH',
                102
            )
        );
        
        this.administratifs.push(
            new Administratif(
                this.currentId++,
                'Bernard',
                'Sophie',
                38,
                2000.00,
                'Secrétaire',
                103
            )
        );
    }

    findAll() {
        return this.administratifs;
    }

    findById(id) {
        return this.administratifs.find(admin => admin.id === parseInt(id));
    }

    create(data) {
        const newAdmin = new Administratif(
            this.currentId++,
            data.nom,
            data.prenom,
            data.heuresTravail,
            data.salaire || 0,
            data.responsabilite,
            data.numeroBureau
        );
        
        this.administratifs.push(newAdmin);
        return newAdmin;
    }

    update(id, data) {
        const index = this.administratifs.findIndex(admin => admin.id === parseInt(id));
        
        if (index === -1) {
            return null;
        }

        if (data.nom) this.administratifs[index].nom = data.nom;
        if (data.prenom) this.administratifs[index].prenom = data.prenom;
        if (data.heuresTravail) this.administratifs[index].heuresTravail = data.heuresTravail;
        if (data.salaire !== undefined) this.administratifs[index].salaire = data.salaire;
        if (data.responsabilite) this.administratifs[index].responsabilite = data.responsabilite;
        if (data.numeroBureau) this.administratifs[index].numeroBureau = data.numeroBureau;

        return this.administratifs[index];
    }

    delete(id) {
        const index = this.administratifs.findIndex(admin => admin.id === parseInt(id));
        
        if (index === -1) {
            return false;
        }

        this.administratifs.splice(index, 1);
        return true;
    }

    findByResponsabilite(responsabilite) {
        return this.administratifs.filter(admin => 
            admin.responsabilite.toLowerCase().includes(responsabilite.toLowerCase())
        );
    }

    findByNumeroBureau(numeroBureau) {
        return this.administratifs.filter(admin => 
            admin.numeroBureau === parseInt(numeroBureau)
        );
    }
}

module.exports = new Database();