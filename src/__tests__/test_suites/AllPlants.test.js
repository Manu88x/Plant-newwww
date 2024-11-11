import React from 'react';
import { render, act, screen } from '@testing-library/react';
import App from '../../components/App';
import '@testing-library/jest-dom';

// Mock the global fetch function
global.fetch = jest.fn();

describe('1st Deliverable', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks to reset between tests
  });

  test('displays all plants on startup', async () => {
    // Mock the fetch response for the first set of plants
    const basePlants = [
      { id: 1, name: 'Plant 1', image: 'http://placekitten.com/200/300', price: 25.98 },
      { id: 2, name: 'Plant 2', image: 'http://placekitten.com/200/301', price: 12.11 },
      { id: 3, name: 'Plant 3', image: 'http://placekitten.com/200/302', price: 5.99 },
    ];
    
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(basePlants),
    });

    // Render the component
    let { findAllByTestId } = render(<App />);

    // Wait for all the plant items to be rendered
    await act(async () => {
      const plantItems = await findAllByTestId('plant-item');
      expect(plantItems).toHaveLength(basePlants.length);

      const plantNames = plantItems.map((item) => item.querySelector('h4').textContent);
      const basePlantNames = basePlants.map((plant) => plant.name);
      expect(plantNames).toEqual(basePlantNames);

      const plantImages = plantItems.map((item) => item.querySelector('img').src.split('/').pop());
      const basePlantImages = basePlants.map((plant) => plant.image.split('/').pop());
      expect(plantImages).toEqual(basePlantImages);

      // Ensure price is formatted as expected (with $ and two decimal places)
      const plantPrices = plantItems.map((item) => item.querySelector('p').textContent);
      const basePlantPrices = basePlants.map((plant) => `Price: $${plant.price.toFixed(2)}`);
      expect(plantPrices).toEqual(basePlantPrices);
    });
  });

  test('plants aren\'t hardcoded', async () => {
    // Mock the fetch response for the alternate set of plants
    const alternatePlants = [
      { id: 1, name: 'Plant A', image: 'http://placekitten.com/200/303', price: 15.88 },
      { id: 2, name: 'Plant B', image: 'http://placekitten.com/200/304', price: 7.22 },
      { id: 3, name: 'Plant C', image: 'http://placekitten.com/200/305', price: 9.99 },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(alternatePlants),
    });

    // Render the component
    let { findAllByTestId } = render(<App />);

    // Wait for all the plant items to be rendered
    await act(async () => {
      const plantItems = await findAllByTestId('plant-item');
      expect(plantItems).toHaveLength(alternatePlants.length);

      const plantNames = plantItems.map((item) => item.querySelector('h4').textContent);
      const basePlantNames = alternatePlants.map((plant) => plant.name);
      expect(plantNames).toEqual(basePlantNames);

      const plantImages = plantItems.map((item) => item.querySelector('img').src.split('/').pop());
      const basePlantImages = alternatePlants.map((plant) => plant.image.split('/').pop());
      expect(plantImages).toEqual(basePlantImages);

      // Ensure price is formatted as expected (with $ and two decimal places)
      const plantPrices = plantItems.map((item) => item.querySelector('p').textContent);
      const basePlantPrices = alternatePlants.map((plant) => `Price: $${plant.price.toFixed(2)}`);
      expect(plantPrices).toEqual(basePlantPrices);
    });
  });
});

