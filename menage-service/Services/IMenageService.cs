// ====================================================================
// FICHIER 3 : Services/IMenageService.cs
// Où le créer : Dans le dossier Services/
// Description : Interface SOAP (contrat de service)
// ====================================================================

using System.Collections.Generic;
using System.ServiceModel;
using MenageService.Models;

namespace MenageService.Services
{
    /// <summary>
    /// Interface du service SOAP Ménage
    /// Définit toutes les opérations disponibles
    /// [ServiceContract] indique que c'est un service web SOAP
    /// </summary>
    [ServiceContract]
    public interface IMenageService
    {
        /// <summary>
        /// Ajouter un nouveau personnel de ménage
        /// </summary>
        [OperationContract]
        PersonnelMenage AjouterPersonnelMenage(PersonnelMenage personnelMenage);

        /// <summary>
        /// Modifier un personnel existant
        /// </summary>
        [OperationContract]
        PersonnelMenage ModifierPersonnelMenage(int id, PersonnelMenage personnelMenage);

        /// <summary>
        /// Supprimer un personnel
        /// </summary>
        [OperationContract]
        bool SupprimerPersonnelMenage(int id);

        /// <summary>
        /// Récupérer un personnel par son ID
        /// </summary>
        [OperationContract]
        PersonnelMenage GetPersonnelMenage(int id);

        /// <summary>
        /// Lister tous les personnels de ménage
        /// </summary>
        [OperationContract]
        List<PersonnelMenage> ListerPersonnelsMenage();

        /// <summary>
        /// Affecter un nouveau secteur à un personnel
        /// </summary>
        [OperationContract]
        bool AffecterSecteur(int idPersonnel, int numSecteur);

        /// <summary>
        /// Assigner une nouvelle tâche à un personnel
        /// </summary>
        [OperationContract]
        bool AssignerTache(int idPersonnel, string tache);

        /// <summary>
        /// Lister tous les personnels d'un secteur
        /// </summary>
        [OperationContract]
        List<PersonnelMenage> ListerParSecteur(int numSecteur);

        /// <summary>
        /// Lister les personnels par tâche
        /// </summary>
        [OperationContract]
        List<PersonnelMenage> ListerParTache(string tache);
    }
}