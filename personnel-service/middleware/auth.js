// ====================================================================
// FICHIER 5 : middleware/auth.js
// Où le créer : Dans le dossier middleware/
// Description : Vérifie le token JWT avant d'accéder aux routes
// ====================================================================

const axios = require('axios');

/**
 * Middleware d'authentification
 * Vérifie le token JWT en appelant le service d'authentification
 */
const authMiddleware = async (req, res, next) => {
    try {
        // 1. Récupérer le token depuis les headers
        const token = req.headers.authorization;
        
        // 2. Vérifier si le token est présent
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: ' Token manquant. Veuillez vous connecter.' 
            });
        }

        console.log(' Validation du token...');

        // 3. Appeler le service d'authentification pour valider le token
        const response = await axios.get(
            `${process.env.AUTH_SERVICE_URL}/validate`,
            {
                headers: { Authorization: token },
                timeout: 5000 // 5 secondes max
            }
        );

        // 4. Vérifier si le token est valide
        if (!response.data.valid) {
            return res.status(401).json({ 
                success: false,
                message: ' Token invalide ou expiré.' 
            });
        }

        // 5. Stocker les infos de l'utilisateur dans la requête
        req.user = {
            username: response.data.username,
            role: response.data.role
        };
        
        console.log(` Token valide pour ${req.user.username}`);

        // 6. Continuer vers la prochaine fonction (le controller)
        next();

    } catch (error) {
        console.error(' Erreur authentification:', error.message);
        
        // Gérer différents types d'erreurs
        if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({ 
                success: false,
                message: ' Service d\'authentification non disponible' 
            });
        }

        res.status(401).json({ 
            success: false,
            message: ' Authentification échouée' 
        });
    }
};

module.exports = authMiddleware;
