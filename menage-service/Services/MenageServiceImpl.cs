// ====================================================================
// FICHIER 4 : Services/MenageServiceImpl.cs
// Où le créer : Dans le dossier Services/
// Description : Implémentation des opérations SOAP
// ====================================================================

using System;
using System.Collections.Generic;
using System.Linq;
using MenageService.Data;
using MenageService.Models;

namespace MenageService.Services
{
    /// <summary>
    /// Implémentation du service SOAP Ménage
    /// Contient toute la logique métier
    /// </summary>
    public class MenageServiceImpl : IMenageService
    {
        private readonly AppDbContext _context;

        // Injection du contexte de base de données
        public MenageServiceImpl(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Ajouter un nouveau personnel de ménage
        /// </summary>
        public PersonnelMenage AjouterPersonnelMenage(PersonnelMenage personnelMenage)
        {
            try
            {
                Console.WriteLine($" Ajout du personnel: {personnelMenage.Prenom} {personnelMenage.Nom}");

                // Vérifier si l'ID existe déjà
                if (_context.PersonnelMenages.Any(p => p.Id == personnelMenage.Id))
                {
                    throw new Exception($" Un personnel avec l'ID {personnelMenage.Id} existe déjà");
                }

                // Calculer le salaire
                personnelMenage.CalculerSalaire();

                // Ajouter à la base de données
                _context.PersonnelMenages.Add(personnelMenage);
                _context.SaveChanges();

                Console.WriteLine($" Personnel {personnelMenage.Id} ajouté avec succès");
                return personnelMenage;
            }
            catch (Exception ex)
            {
                Console.WriteLine($" Erreur lors de l'ajout: {ex.Message}");
                throw;
            }
        }

        /// <summary>
        /// Modifier un personnel existant
        /// </summary>
        public PersonnelMenage ModifierPersonnelMenage(int id, PersonnelMenage personnelMenage)
        {
            try
            {
                Console.WriteLine($"Modification du personnel ID: {id}");

                // Rechercher le personnel existant
                var existing = _context.PersonnelMenages.Find(id);
                if (existing == null)
                {
                    throw new Exception($" Personnel avec ID {id} non trouvé");
                }

                // Mettre à jour les propriétés
                existing.Nom = personnelMenage.Nom;
                existing.Prenom = personnelMenage.Prenom;
                existing.HeuresTravail = personnelMenage.HeuresTravail;
                existing.Tache = personnelMenage.Tache;
                existing.NumSecteur = personnelMenage.NumSecteur;

                // Recalculer le salaire
                existing.CalculerSalaire();

                // Sauvegarder
                _context.SaveChanges();

                Console.WriteLine($" Personnel {id} modifié avec succès");
                return existing;
            }
            catch (Exception ex)
            {
                Console.WriteLine($" Erreur lors de la modification: {ex.Message}");
                throw;
            }
        }

        /// <summary>
        /// Supprimer un personnel
        /// </summary>
        public bool SupprimerPersonnelMenage(int id)
        {
            try
            {
                Console.WriteLine($" Suppression du personnel ID: {id}");

                var personnel = _context.PersonnelMenages.Find(id);
                if (personnel == null)
                {
                    Console.WriteLine($" Personnel {id} non trouvé");
                    return false;
                }

                _context.PersonnelMenages.Remove(personnel);
                _context.SaveChanges();

                Console.WriteLine($" Personnel {id} supprimé");
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($" Erreur lors de la suppression: {ex.Message}");
                return false;
            }
        }

        /// <summary>
        /// Récupérer un personnel par ID
        /// </summary>
        public PersonnelMenage GetPersonnelMenage(int id)
        {
            Console.WriteLine($"Recherche du personnel ID: {id}");

            var personnel = _context.PersonnelMenages.Find(id);
            if (personnel == null)
            {
                throw new Exception($" Personnel avec ID {id} non trouvé");
            }

            Console.WriteLine($" Personnel {id} trouvé: {personnel.Prenom} {personnel.Nom}");
            return personnel;
        }

        /// <summary>
        /// Lister tous les personnels
        /// </summary>
        public List<PersonnelMenage> ListerPersonnelsMenage()
        {
            Console.WriteLine(" Liste de tous les personnels de ménage");

            var liste = _context.PersonnelMenages.ToList();
            Console.WriteLine($" {liste.Count} personnel(s) trouvé(s)");

            return liste;
        }

        /// <summary>
        /// Affecter un nouveau secteur
        /// </summary>
        public bool AffecterSecteur(int idPersonnel, int numSecteur)
        {
            try
            {
                Console.WriteLine($" Affectation secteur {numSecteur} au personnel {idPersonnel}");

                var personnel = _context.PersonnelMenages.Find(idPersonnel);
                if (personnel == null)
                {
                    Console.WriteLine($" Personnel {idPersonnel} non trouvé");
                    return false;
                }

                personnel.NumSecteur = numSecteur;
                _context.SaveChanges();

                Console.WriteLine($" Secteur {numSecteur} affecté");
                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Assigner une nouvelle tâche
        /// </summary>
        public bool AssignerTache(int idPersonnel, string tache)
        {
            try
            {
                Console.WriteLine($" Assignation tâche '{tache}' au personnel {idPersonnel}");

                var personnel = _context.PersonnelMenages.Find(idPersonnel);
                if (personnel == null)
                {
                    Console.WriteLine($" Personnel {idPersonnel} non trouvé");
                    return false;
                }

                personnel.Tache = tache;
                _context.SaveChanges();

                Console.WriteLine($" Tâche '{tache}' assignée");
                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Lister par secteur
        /// </summary>
        public List<PersonnelMenage> ListerParSecteur(int numSecteur)
        {
            Console.WriteLine($" Recherche dans le secteur {numSecteur}");

            var liste = _context.PersonnelMenages
                .Where(p => p.NumSecteur == numSecteur)
                .ToList();

            Console.WriteLine($" {liste.Count} personnel(s) dans le secteur {numSecteur}");
            return liste;
        }

        /// <summary>
        /// Lister par tâche
        /// </summary>
        public List<PersonnelMenage> ListerParTache(string tache)
        {
            Console.WriteLine($" Recherche tâche contenant '{tache}'");

            var liste = _context.PersonnelMenages
                .Where(p => p.Tache.Contains(tache))
                .ToList();

            Console.WriteLine($" {liste.Count} personnel(s) avec cette tâche");
            return liste;
        }
    }
}
