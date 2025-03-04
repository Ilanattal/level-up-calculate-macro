// src/types.ts

import ingredientData from './ingredients.json'; // Importation des données d'ingrédients

// Définir le type des données d'ingrédients en fonction du contenu de ingredients.json
export type IngredientData = typeof ingredientData;

// Définir l'interface Ingredient
export interface Ingredient {
  name: keyof IngredientData; // Utilise la clé de ingredientData comme type pour le nom
  quantity: number; // Quantité de l'ingrédient
}

// Définir l'interface pour le calcul des résultats (Total)
export interface Total {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  price: number;
}