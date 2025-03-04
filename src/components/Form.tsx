import React, { useState } from 'react';
import { Ingredient, IngredientData } from '../type'; // Import des types

interface FormProps {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  ingredientData: IngredientData; // Utilisation du type IngredientData pour ingredientData
}

const Form: React.FC<FormProps> = ({ ingredients, setIngredients, ingredientData }) => {
  const [ingredientName, setIngredientName] = useState<string>(''); // Nom de l'ingrédient
  const [ingredientQuantity, setIngredientQuantity] = useState<string>(''); // Quantité de l'ingrédient

  const handleAddIngredient = () => {
    const normalizedIngredientName = ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1); // Normalisation du nom

    const quantity = parseFloat(ingredientQuantity);

    // Vérification de l'ingrédient et de la quantité
    if (
      ingredientData[normalizedIngredientName as keyof IngredientData] && // Vérifie si l'ingrédient existe
      quantity > 0 && // Vérifie que la quantité est valide
      !isNaN(quantity) // Vérifie que la quantité est un nombre
    ) {
      setIngredients([
        ...ingredients,
        { name: normalizedIngredientName as keyof IngredientData, quantity },
      ]);
      setIngredientName('');
      setIngredientQuantity('');
    } else {
      alert('Ingrédient invalide ou quantité incorrecte.');
    }
  };

  return (
    <div className="input-section">
      <input
        className="input"
        type="text"
        value={ingredientName}
        onChange={(e) => setIngredientName(e.target.value)} // Mise à jour du nom de l'ingrédient
        placeholder="Ingrédient"
        list="ingredients-list"
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
        onChange={(e) => setIngredientQuantity(e.target.value)} // Mise à jour de la quantité
        placeholder="Quantité (g ou mL)"
      />
      
      <button className="add-button" onClick={handleAddIngredient}>
        Ajouter l'Ingrédient
      </button>
    </div>
  );
};

export default Form;