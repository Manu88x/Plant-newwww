import React, { useState } from "react";

function NewPlantForm({ setPlants }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensures name, image, and price are provided
    if (!name || !image || !price || isNaN(price)) {
      alert("Please fill out all fields correctly.");
      return;
    }

    // Creating new plant object
    const newPlant = { name, image, price: parseFloat(price) };

    // POST request to add new plant
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((data) => {
        setPlants((prevPlants) => [...prevPlants, data]); // Add new plant to state
        setName(""); // Clear form
        setImage("");
        setPrice("");
      })
      .catch((error) => {
        console.error("Error adding new plant:", error);
      });
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;

