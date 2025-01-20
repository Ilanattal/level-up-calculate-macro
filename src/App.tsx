import React, { useState, useEffect } from 'react';

// Chargement des données des ingrédients depuis le fichier JSON
import ingredientData from './ingredients.json';

// Définition des types pour les ingrédients
interface Ingredient {
  name: keyof typeof ingredientData; // Définit la clé comme une clé valide de ingredientData
  quantity: number;
}

interface Total {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  price: number;
}

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]); // Liste des ingrédients
  const [total, setTotal] = useState<Total>({
    calories: 0,
    proteins: 0,
    fats: 0,
    carbs: 0,
    price: 0,
  });

  const [ingredientName, setIngredientName] = useState<string>('');
  const [ingredientQuantity, setIngredientQuantity] = useState<string>(''); // Utilisation de string pour gérer le champ vide

  useEffect(() => {
    // Calcul des résultats à chaque ajout d'ingrédient
    let calories = 0;
    let proteins = 0;
    let fats = 0;
    let carbs = 0;
    let price = 0;

    ingredients.forEach(item => {
      const data = ingredientData[item.name];
      const multiplier = item.quantity / 100;
      calories += data.calories * multiplier;
      proteins += data.proteins * multiplier;
      fats += data.fats * multiplier;
      carbs += data.carbs * multiplier;
      price += data.price * multiplier;
    });

    setTotal({
      calories,
      proteins,
      fats,
      carbs,
      price,
    });
  }, [ingredients]);

  const handleAddIngredient = () => {
    // S'assure que l'ingrédient existe dans la base de données et que la quantité est valide
    const normalizedIngredientName = ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1); // Normalise le nom avec une majuscule
    const quantity = parseFloat(ingredientQuantity);
    if (
      normalizedIngredientName &&
      quantity > 0 &&
      ingredientData[normalizedIngredientName as keyof typeof ingredientData]
    ) {
      setIngredients([
        ...ingredients,
        { name: normalizedIngredientName as keyof typeof ingredientData, quantity },
      ]);
      setIngredientName('');
      setIngredientQuantity('');
    } else {
      alert('Ingrédient invalide ou quantité incorrecte.');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    // Supprime l'ingrédient à l'index donné
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  return (
    <div className="container">
      <h1 className="title">Calculateur de Macronutriments et Prix</h1>
  
      {/* Sélection de l'ingrédient et de la quantité */}
      <div className="input-section">
        <input
          className="input"
          type="text"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)} // Retirer toLowerCase
          placeholder="Ingrédient"
          list="ingredients-list" // Le datalist est lié ici
        />
        <datalist id="ingredients-list">
          {Object.keys(ingredientData).map((ingredient, index) => (
            <option key={index} value={ingredient} />
          ))}
        </datalist>
        <input
          className="input"
          type="number"
          value={ingredientQuantity}
          onChange={(e) => setIngredientQuantity(e.target.value)} // Mise à jour de la quantité saisie
          placeholder="Quantité (g ou mL)" // Ne montre pas un zéro par défaut
        />
        <button className="add-button" onClick={handleAddIngredient}>Ajouter l'Ingrédient</button>
      </div>
  
      {/* Liste des ingrédients ajoutés */}
      <div className="ingredients-list">
        <h2 className="ingredients-title">Ingrédients ajoutés :</h2>
        <div className="ingredient-item-container">
          {ingredients.map((item, index) => (
            <div key={index} className="ingredient-item">
              {/* Box pour l'aliment */}
              <div className="ingredient-box">
                {item.quantity}g de {item.name}
              </div>
              {/* Bouton de suppression à l'extérieur de l'encadré */}
              <button
                className="delete-button"
                onClick={() => handleRemoveIngredient(index)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </div>
  
      {/* Section des résultats */}
      <div className="results-section">
        <h3 className="results-title">Résultats :</h3>
        <div className="results-container">
          <div className="result-box">
            <p>Calories : {total.calories.toFixed(2)} kcal</p>
          </div>
          <div className="result-box">
            <p>Protéines : {total.proteins.toFixed(2)} g</p>
          </div>
          <div className="result-box">
            <p>Lipides : {total.fats.toFixed(2)} g</p>
          </div>
          <div className="result-box">
            <p>Glucides : {total.carbs.toFixed(2)} g</p>
          </div>
          <div className="result-box">
            <p>Prix : {total.price.toFixed(2)} ILS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;