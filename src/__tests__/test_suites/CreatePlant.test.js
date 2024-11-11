import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import App from '../../components/App';
import '@testing-library/jest-dom';


global.fetch = jest.fn();

describe('2nd Deliverable', () => {
  test('adds a new plant when the form is submitted', async () => {
    const firstPlant = { name: 'foo', image: 'foo_plant_image_url', price: 10 };
    const secondPlant = { name: 'bar', image: 'bar_plant_image_url', price: 5 };

    
    const basePlants = [
      { id: 1, name: 'Plant 1', image: 'http://placekitten.com/200/300', price: 25.98 },
      { id: 2, name: 'Plant 2', image: 'http://placekitten.com/200/301', price: 12.11 },
    ];

    
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(basePlants),
    });

    const { getByPlaceholderText, findByText, getByText } = render(<App />);

    
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ ...firstPlant, id: 3 }), // Simulate returning the added plant with an id
    });

    
    await act(async () => {
      fireEvent.change(getByPlaceholderText('Plant name'), { target: { value: firstPlant.name } });
      fireEvent.change(getByPlaceholderText('Image URL'), { target: { value: firstPlant.image } });
      fireEvent.change(getByPlaceholderText('Price'), { target: { value: firstPlant.price.toString() } }); 
      fireEvent.click(getByText('Add Plant'));
    });

    
    expect(fetch).toHaveBeenCalledWith("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: firstPlant.name,
        image: firstPlant.image,
        price: firstPlant.price, 
      }),
    });

    
    const newPlant = await findByText('foo');
    expect(newPlant).toBeInTheDocument();

    
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ ...secondPlant, id: 4 }), // Simulate returning the second added plant with an id
    });

    
    await act(async () => {
      fireEvent.change(getByPlaceholderText('Plant name'), { target: { value: secondPlant.name } });
      fireEvent.change(getByPlaceholderText('Image URL'), { target: { value: secondPlant.image } });
      fireEvent.change(getByPlaceholderText('Price'), { target: { value: secondPlant.price.toString() } });
      fireEvent.click(getByText('Add Plant'));
    });

    
    expect(fetch).toHaveBeenCalledWith("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: secondPlant.name,
        image: secondPlant.image,
        price: secondPlant.price, 
      }),
    });

    
    const nextPlant = await findByText('bar');
    expect(nextPlant).toBeInTheDocument();
  });
});
