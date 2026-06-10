/** Formate un montant en centimes en euros affichables ("59 €", "299 €"). */
export function euros(cents: number): string {
  return (cents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}
