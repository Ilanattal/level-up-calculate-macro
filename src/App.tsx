// App.tsx

import React, { useState, useEffect } from 'react';
import ingredientData from './ingredients.json'; // Assure-toi que le chemin est correct
import Form from './components/Form';
import { Ingredient, Total } from './type'; // Import des types

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [total, setTotal] = useState<Total>({
    calories: 0,
    proteins: 0,
    fats: 0,
    carbs: 0,
    price: 0,
  });

  useEffect(() => {
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

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  return (
    <div className="container">
      <h1>Calculateur de Macronutriments et Prix</h1>
      <Form ingredients={ingredients} setIngredients={setIngredients} ingredientData={ingredientData} />
  
      <div className="ingredients-list">
        <h2>Ingrédients ajoutés :</h2>
        <div className="ingredient-item-container">
          {ingredients.map((item, index) => (
            <div key={index} className="ingredient-item">
              <div className="ingredient-box">
                {item.quantity}g de {item.name}
              </div>
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
  
      <div className="results-section">
        <h3>Résultats :</h3>
        <div className="results-container">
          <div className="result-box">Calories: {total.calories.toFixed(2)} kcal</div>
          <div className="result-box">Protéines: {total.proteins.toFixed(2)} g</div>
          <div className="result-box">Lipides: {total.fats.toFixed(2)} g</div>
          <div className="result-box">Glucides: {total.carbs.toFixed(2)} g</div>
          <div className="result-box">Prix: {total.price.toFixed(2)} ILS</div>
        </div>
      </div>
    </div>
  );
};

export default App;