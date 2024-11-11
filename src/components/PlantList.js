import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, setPlants }) {
  const handleDelete = (id) => {
    // DELETE request to remove the plant
    fetch(`http://localhost:6001/plants/${id}`, { method: "DELETE" })
      .then(() => {
        // Remove the deleted plant from the local state
        setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
      });
  };

  return (
    <ul className="cards">
      {plants.map((plant, index) => (
        <PlantCard 
          key={plant.id || index}  // Fallback to index if id is not available or unique
          plant={plant} 
          onDelete={handleDelete} 
        />
      ))}
    </ul>
  );
}

export default PlantList;
