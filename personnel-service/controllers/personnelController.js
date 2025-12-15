// ====================================================================
// FICHIER 6 : controllers/personnelController.js
// Où le créer : Dans le dossier controllers/
// Description : Logique métier (CRUD)
// ====================================================================

const Personnel = require('../models/Personnel');

// ============================================
// GET tous les personnels
// ============================================
exports.getAllPersonnel = async (req, res) => {
    try {
        console.log('Récupération de tous les personnels...');
        
        const personnels = await Personnel.find();
        
        res.json({
            success: true,
            count: personnels.length,
            data: personnels
        });
        
        console.log(`${personnels.length} personnel(s) récupéré(s)`);
    } catch (error) {
        console.error('Erreur getAllPersonnel:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur',
            error: error.message 
        });
    }
};

// ============================================
// GET un personnel par ID
// ============================================
exports.getPersonnelById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        console.log(`Recherche du personnel ID: ${id}`);
        
        const personnel = await Personnel.findOne({ id: id });
        
        if (!personnel) {
            return res.status(404).json({ 
                success: false, 
                message: `Personnel avec ID ${id} non trouvé` 
            });
        }
        
        res.json({ success: true, data: personnel });
        console.log(`Personnel ${id} trouvé`);
    } catch (error) {
        console.error('Erreur getPersonnelById:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// ============================================
// POST créer un nouveau personnel
// ============================================
exports.createPersonnel = async (req, res) => {
    try {
        const { id, nom, prenom, heuresTravail, type } = req.body;
        
        console.log('Création d\'un nouveau personnel...');
        console.log('Données reçues:', { id, nom, prenom, heuresTravail, type });
        
        // Vérifier si l'ID existe déjà
        const existant = await Personnel.findOne({ id });
        if (existant) {
            return res.status(400).json({ 
                success: false, 
                message: `Un personnel avec l'ID ${id} existe déjà` 
            });
        }

        // Créer le nouveau personnel
        const personnel = new Personnel({
            id,
            nom,
            prenom,
            heuresTravail,
            type: type || 'GENERAL'
        });

        // Calculer le salaire (15€/heure par défaut)
        personnel.calculerSalaire();

        // Sauvegarder en base de données
        await personnel.save();
        
        res.status(201).json({ 
            success: true, 
            message: 'Personnel créé avec succès',
            data: personnel 
        });
        
        console.log(`Personnel ${id} créé - Salaire: ${personnel.salaire}€`);
    } catch (error) {
        console.error('Erreur createPersonnel:', error);
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// ============================================
// PUT mettre à jour un personnel
// ============================================
exports.updatePersonnel = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        console.log(`Mise à jour du personnel ID: ${id}`);
        
        const personnel = await Personnel.findOne({ id: id });
        
        if (!personnel) {
            return res.status(404).json({ 
                success: false, 
                message: `Personnel avec ID ${id} non trouvé` 
            });
        }

        const { nom, prenom, heuresTravail, type } = req.body;

        // Mettre à jour seulement les champs fournis
        if (nom) personnel.nom = nom;
        if (prenom) personnel.prenom = prenom;
        if (heuresTravail) personnel.heuresTravail = heuresTravail;
        if (type) personnel.type = type;

        // Recalculer le salaire
        personnel.calculerSalaire();

        await personnel.save();

        res.json({ 
            success: true, 
            message: 'Personnel mis à jour',
            data: personnel 
        });
        
        console.log(`Personnel ${id} mis à jour`);
    } catch (error) {
        console.error('Erreur updatePersonnel:', error);
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// ============================================
// DELETE supprimer un personnel
// ============================================
exports.deletePersonnel = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        console.log(`Suppression du personnel ID: ${id}`);
        
        const personnel = await Personnel.findOneAndDelete({ id: id });
        
        if (!personnel) {
            return res.status(404).json({ 
                success: false, 
                message: `Personnel avec ID ${id} non trouvé` 
            });
        }

        res.json({ 
            success: true, 
            message: 'Personnel supprimé avec succès',
            data: { id: id, nom: personnel.nom }
        });
        
        console.log(`Personnel ${id} supprimé`);
    } catch (error) {
        console.error('Erreur deletePersonnel:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// ============================================
// GET calculer le salaire avec taux personnalisé
// ============================================
exports.getSalaire = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const tauxHoraire = parseFloat(req.query.taux) || 15;
        
        console.log(`Calcul salaire pour ID ${id} avec taux ${tauxHoraire}€/h`);
        
        const personnel = await Personnel.findOne({ id: id });
        
        if (!personnel) {
            return res.status(404).json({ 
                success: false, 
                message: `Personnel avec ID ${id} non trouvé` 
            });
        }

        const salaire = personnel.calculerSalaire(tauxHoraire);

        res.json({ 
            success: true, 
            data: {
                id: personnel.id,
                nom: personnel.nom,
                prenom: personnel.prenom,
                heuresTravail: personnel.heuresTravail,
                tauxHoraire: tauxHoraire,
                salaire: salaire
            }
        });
        
        console.log(`Salaire calculé: ${salaire}€`);
    } catch (error) {
        console.error('Erreur getSalaire:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};
