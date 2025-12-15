using Microsoft.EntityFrameworkCore;
using SoapCore;
using MenageService.Data;
using MenageService.Services;

var builder = WebApplication.CreateBuilder(args);

Console.WriteLine(" Démarrage du Service Ménage SOAP...");

// ============================================
// CONFIGURATION SQL SERVER
// ============================================
string connectionString = "Server=localhost,1433;Database=menage_db;User Id=sa;Password=Admin123!;TrustServerCertificate=True";

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(connectionString);
    Console.WriteLine("📊 Connexion SQL Server configurée");
});

// ============================================
// ENREGISTRER LE SERVICE SOAP
// ============================================
builder.Services.AddScoped<IMenageService, MenageServiceImpl>();
Console.WriteLine(" Service SOAP enregistré");

// ============================================
// CONFIGURATION SOAPCORE
// ============================================
builder.Services.AddSoapCore();

var app = builder.Build();

// ============================================
// CRÉER/METTRE À JOUR LA BASE DE DONNÉES
// ============================================
Console.WriteLine(" Création/vérification de la base de données...");
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    try
    {
        dbContext.Database.EnsureCreated();
        Console.WriteLine(" Base de données 'menage_db' créée/vérifiée");
        Console.WriteLine(" 2 personnels de test insérés automatiquement");
    }
    catch (Exception ex)
    {
        Console.WriteLine($" Erreur base de données: {ex.Message}");
        Console.WriteLine(" Vérifiez que SQL Server tourne: docker ps");
    }
}

// ============================================
// PUBLIER LE SERVICE SOAP (VERSION CORRIGÉE)
// ============================================
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.UseSoapEndpoint<IMenageService>(
        path: "/MenageService.asmx",
        encoder: new SoapEncoderOptions 
        { 
            MessageVersion = System.ServiceModel.Channels.MessageVersion.Soap11,
            WriteEncoding = System.Text.Encoding.UTF8
        },
        serializer: SoapSerializer.DataContractSerializer
    );
});

Console.WriteLine(" Endpoint SOAP configuré");

// ============================================
// ROUTE D'ACCUEIL
// ============================================
app.MapGet("/", () => 
{
    return Results.Json(new
    {
        service = " Service Ménage SOAP",
        version = "1.0.0",
        port = 8085,
        endpoints = new
        {
            wsdl = "http://localhost:8085/MenageService.asmx?wsdl",
            soap = "http://localhost:8085/MenageService.asmx"
        },
        status = "UP "
    });
});

// ============================================
// DÉMARRAGE
// ============================================
Console.WriteLine("\n================================");
Console.WriteLine("   SERVICE MÉNAGE SOAP DÉMARRÉ !");
Console.WriteLine("================================");
Console.WriteLine(" Port : 8085");
Console.WriteLine(" URL : http://localhost:8085");
Console.WriteLine(" WSDL : http://localhost:8085/MenageService.asmx?wsdl");
Console.WriteLine("================================\n");

app.Run();  // ✅ Utilise ASPNETCORE_URLS