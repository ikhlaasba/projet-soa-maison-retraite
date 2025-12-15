// ====================================================================
// FICHIER 1 : Models/PersonnelMenage.cs
// Où le créer : Dans le dossier Models/
// Description : Modèle de données pour le personnel de ménage
// ====================================================================

using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace MenageService.Models
{
    /// <summary>
    /// Représente un membre du personnel de ménage
    /// [DataContract] permet la sérialisation SOAP
    /// </summary>
    [DataContract]
    public class PersonnelMenage
    {
        /// <summary>
        /// Identifiant unique du personnel
        /// </summary>
        [DataMember]
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Nom de famille
        /// </summary>
        [DataMember]
        [Required(ErrorMessage = "Le nom est obligatoire")]
        [StringLength(100)]
        public string Nom { get; set; } = string.Empty;

        /// <summary>
        /// Prénom
        /// </summary>
        [DataMember]
        [Required(ErrorMessage = "Le prénom est obligatoire")]
        [StringLength(100)]
        public string Prenom { get; set; } = string.Empty;

        /// <summary>
        /// Nombre d'heures de travail par semaine
        /// </summary>
        [DataMember]
        [Required]
        [Range(0, 168, ErrorMessage = "Les heures doivent être entre 0 et 168")]
        public int HeuresTravail { get; set; }

        /// <summary>
        /// Tâche assignée (ex: "Nettoyage chambres")
        /// </summary>
        [DataMember]
        [Required(ErrorMessage = "La tâche est obligatoire")]
        [StringLength(200)]
        public string Tache { get; set; } = string.Empty;

        /// <summary>
        /// Numéro du secteur assigné (ex: 1, 2, 3)
        /// </summary>
        [DataMember]
        [Required]
        [Range(1, 100, ErrorMessage = "Le numéro de secteur doit être entre 1 et 100")]
        public int NumSecteur { get; set; }

        /// <summary>
        /// Salaire calculé automatiquement
        /// </summary>
        [DataMember]
        public float Salaire { get; set; }

        /// <summary>
        /// Méthode pour calculer le salaire
        /// Par défaut : 15€/heure
        /// </summary>
        public void CalculerSalaire(float tauxHoraire = 15.0f)
        {
            Salaire = HeuresTravail * tauxHoraire;
            Console.WriteLine($" Salaire calculé: {HeuresTravail}h x {tauxHoraire}€ = {Salaire}€");
        }
    }
}

