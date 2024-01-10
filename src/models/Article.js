export class Article {
    constructor(data) {
        this.codeInterneProduit = data["Code interne produit"];
        this.nomProduit = data["Produit"];
        this.uniteDeStock = data["Unité de stock"];
        // ... et ainsi de suite pour les autres champs

        // Convertir les champs numériques si nécessaire
        this.stockInitialQuantite = Number(data["Stock initial qté"]);
        this.consoReelleQuantite = Number(data["Conso réelle qté"]);
        // Répétez pour les autres champs numériques
    }

    // Vous pouvez ajouter d'autres méthodes ici si nécessaire
}
