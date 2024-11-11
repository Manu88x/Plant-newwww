import React, { useState } from "react";

function PlantCard({ plant, onDelete }) {
  const [isInStock, setIsInStock] = useState(true);

  const handleStockToggle = () => {
    setIsInStock(!isInStock); // Toggle the stock status
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image || "https://via.placeholder.com/400"} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price}</p>
      <button onClick={handleStockToggle}>
        {isInStock ? "In Stock" : "Out of Stock"}
      </button>
      <button onClick={() => onDelete(plant.id)}>Delete</button>
    </li>
  );
}

export default PlantCard;
