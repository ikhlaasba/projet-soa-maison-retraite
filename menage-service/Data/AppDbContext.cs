// ====================================================================
// FICHIER 2 : Data/AppDbContext.cs
// Où le créer : Dans le dossier Data/
// Description : Contexte de base de données Entity Framework
// ====================================================================

using Microsoft.EntityFrameworkCore;
using MenageService.Models;

namespace MenageService.Data
{
    /// <summary>
    /// Contexte de base de données pour SQL Server
    /// Gère la connexion et les opérations sur la base
    /// </summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        /// <summary>
        /// Table des personnels de ménage
        /// </summary>
        public DbSet<PersonnelMenage> PersonnelMenages { get; set; }

        /// <summary>
        /// Configuration du modèle et données de test
        /// </summary>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            Console.WriteLine("Configuration du modèle de données...");

            // Données de test initiales
            modelBuilder.Entity<PersonnelMenage>().HasData(
                new PersonnelMenage
                {
                    Id = 1,
                    Nom = "Lefebvre",
                    Prenom = "Marie",
                    HeuresTravail = 35,
                    Tache = "Nettoyage chambres",
                    NumSecteur = 1,
                    Salaire = 525 // 35h x 15€
                },
                new PersonnelMenage
                {
                    Id = 2,
                    Nom = "Bernard",
                    Prenom = "Luc",
                    HeuresTravail = 30,
                    Tache = "Entretien espaces communs",
                    NumSecteur = 2,
                    Salaire = 450 // 30h x 15€
                }
            );

            Console.WriteLine(" 2 personnels de test ajoutés");
        }
    }
}
