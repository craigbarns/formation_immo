/** Prix immobiliers moyens France 2026 (€/m²) — données estimées marché */

export type ZonePrix = {
  ville: string;
  departement: string;
  lat: number;
  lng: number;
  prixMoyen: number;       // €/m² appartement
  prixMaison: number;      // €/m² maison
  loyer: number;           // €/m² loyer mensuel
  evolution1an: number;    // % évolution sur 1 an
  tension: "haute" | "moyenne" | "basse";
  zone: "A_bis" | "A" | "B1" | "B2" | "C";
};

export const ZONES_PRIX: ZonePrix[] = [
  { ville: "Paris", departement: "75", lat: 48.8566, lng: 2.3522, prixMoyen: 10200, prixMaison: 11500, loyer: 28, evolution1an: -4.2, tension: "haute", zone: "A_bis" },
  { ville: "Lyon", departement: "69", lat: 45.7640, lng: 4.8357, prixMoyen: 4750, prixMaison: 4200, loyer: 14, evolution1an: -2.1, tension: "haute", zone: "A" },
  { ville: "Marseille", departement: "13", lat: 43.2965, lng: 5.3698, prixMoyen: 3350, prixMaison: 3800, loyer: 12, evolution1an: 1.8, tension: "moyenne", zone: "A" },
  { ville: "Toulouse", departement: "31", lat: 43.6047, lng: 1.4442, prixMoyen: 3850, prixMaison: 3600, loyer: 12.5, evolution1an: 0.5, tension: "moyenne", zone: "B1" },
  { ville: "Nice", departement: "06", lat: 43.7102, lng: 7.2620, prixMoyen: 5600, prixMaison: 6200, loyer: 17, evolution1an: 0.8, tension: "haute", zone: "A" },
  { ville: "Nantes", departement: "44", lat: 47.2184, lng: -1.5536, prixMoyen: 3950, prixMaison: 3700, loyer: 13, evolution1an: -3.5, tension: "haute", zone: "B1" },
  { ville: "Bordeaux", departement: "33", lat: 44.8378, lng: -0.5792, prixMoyen: 4400, prixMaison: 4200, loyer: 14, evolution1an: -5.2, tension: "haute", zone: "B1" },
  { ville: "Strasbourg", departement: "67", lat: 48.5734, lng: 7.7521, prixMoyen: 3550, prixMaison: 3200, loyer: 12, evolution1an: -0.8, tension: "moyenne", zone: "B1" },
  { ville: "Montpellier", departement: "34", lat: 43.6110, lng: 3.8767, prixMoyen: 3800, prixMaison: 3500, loyer: 13, evolution1an: 1.2, tension: "haute", zone: "A" },
  { ville: "Rennes", departement: "35", lat: 48.1173, lng: -1.6778, prixMoyen: 4100, prixMaison: 3900, loyer: 13, evolution1an: -2.8, tension: "haute", zone: "B1" },
  { ville: "Grenoble", departement: "38", lat: 45.1885, lng: 5.7245, prixMoyen: 3200, prixMaison: 3000, loyer: 11.5, evolution1an: -1.5, tension: "moyenne", zone: "B1" },
  { ville: "Lille", departement: "59", lat: 50.6292, lng: 3.0573, prixMoyen: 3350, prixMaison: 2900, loyer: 13, evolution1an: 0.2, tension: "haute", zone: "A" },
  { ville: "Toulon", departement: "83", lat: 43.1242, lng: 5.9280, prixMoyen: 3150, prixMaison: 3500, loyer: 11, evolution1an: 2.1, tension: "moyenne", zone: "A" },
  { ville: "Aix-en-Provence", departement: "13", lat: 43.5297, lng: 5.4474, prixMoyen: 5100, prixMaison: 5800, loyer: 16, evolution1an: 0.4, tension: "haute", zone: "A" },
  { ville: "Reims", departement: "51", lat: 49.2583, lng: 4.0317, prixMoyen: 2600, prixMaison: 2400, loyer: 10, evolution1an: 1.5, tension: "basse", zone: "B1" },
  { ville: "Rouen", departement: "76", lat: 49.4432, lng: 1.0993, prixMoyen: 2800, prixMaison: 2600, loyer: 11, evolution1an: 0.3, tension: "basse", zone: "B1" },
  { ville: "Dijon", departement: "21", lat: 47.3220, lng: 5.0415, prixMoyen: 2700, prixMaison: 2500, loyer: 10.5, evolution1an: 2.0, tension: "basse", zone: "B1" },
  { ville: "Le Havre", departement: "76", lat: 49.4944, lng: 0.1079, prixMoyen: 2200, prixMaison: 2000, loyer: 9, evolution1an: 2.8, tension: "basse", zone: "B2" },
  { ville: "Metz", departement: "57", lat: 49.1193, lng: 6.1727, prixMoyen: 2400, prixMaison: 2200, loyer: 9.5, evolution1an: 1.0, tension: "basse", zone: "B1" },
  { ville: "Angers", departement: "49", lat: 47.4784, lng: -0.5632, prixMoyen: 3100, prixMaison: 2900, loyer: 11, evolution1an: -1.0, tension: "moyenne", zone: "B1" },
  { ville: "Brest", departement: "29", lat: 48.3904, lng: -4.4861, prixMoyen: 2500, prixMaison: 2300, loyer: 9.5, evolution1an: 3.2, tension: "basse", zone: "B2" },
  { ville: "Le Mans", departement: "72", lat: 48.0061, lng: 0.1996, prixMoyen: 1900, prixMaison: 1750, loyer: 8.5, evolution1an: 2.5, tension: "basse", zone: "B2" },
  { ville: "Clermont-Ferrand", departement: "63", lat: 45.7797, lng: 3.0863, prixMoyen: 2300, prixMaison: 2100, loyer: 9, evolution1an: 1.8, tension: "basse", zone: "B1" },
  { ville: "Besançon", departement: "25", lat: 47.2378, lng: 6.0241, prixMoyen: 2100, prixMaison: 1900, loyer: 8.5, evolution1an: 0.8, tension: "basse", zone: "B2" },
];

export const EVOLUTION_NATIONALE = [
  { annee: 2020, paris: 10800, province: 3200 },
  { annee: 2021, paris: 10600, province: 3450 },
  { annee: 2022, paris: 10900, province: 3750 },
  { annee: 2023, paris: 10500, province: 3600 },
  { annee: 2024, paris: 10200, province: 3400 },
  { annee: 2025, paris: 9900,  province: 3350 },
  { annee: 2026, paris: 10200, province: 3480 },
];

export const RENDEMENTS_PAR_VILLE = [
  { ville: "Le Mans",         rendementBrut: 7.8, rendementNet: 5.2 },
  { ville: "Clermont-Ferrand",rendementBrut: 7.2, rendementNet: 4.8 },
  { ville: "Brest",           rendementBrut: 7.0, rendementNet: 4.6 },
  { ville: "Reims",           rendementBrut: 6.8, rendementNet: 4.5 },
  { ville: "Le Havre",        rendementBrut: 6.5, rendementNet: 4.2 },
  { ville: "Metz",            rendementBrut: 6.3, rendementNet: 4.1 },
  { ville: "Rouen",           rendementBrut: 6.2, rendementNet: 4.0 },
  { ville: "Toulon",          rendementBrut: 6.0, rendementNet: 3.9 },
  { ville: "Marseille",       rendementBrut: 5.8, rendementNet: 3.8 },
  { ville: "Montpellier",     rendementBrut: 5.2, rendementNet: 3.4 },
  { ville: "Toulouse",        rendementBrut: 5.0, rendementNet: 3.2 },
  { ville: "Strasbourg",      rendementBrut: 4.8, rendementNet: 3.1 },
  { ville: "Rennes",          rendementBrut: 4.6, rendementNet: 3.0 },
  { ville: "Lyon",            rendementBrut: 4.4, rendementNet: 2.8 },
  { ville: "Bordeaux",        rendementBrut: 4.2, rendementNet: 2.6 },
  { ville: "Nantes",          rendementBrut: 4.0, rendementNet: 2.5 },
  { ville: "Nice",            rendementBrut: 3.8, rendementNet: 2.3 },
  { ville: "Paris",           rendementBrut: 3.2, rendementNet: 1.8 },
];
