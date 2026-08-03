import React, { useState, useEffect } from 'react';

interface InventoryItem {
  _id: string;
  brand: string;
  productName: string;
  quantity: number;
  expirationDate?: string | null;
}

function App() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [form, setForm] = useState({ brand: '', productName: '', quantity: 0, isPerishable: false, expirationDate: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/inventory')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const newItem = await res.json();
    setItems([...items, newItem]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Spoiler Alert: Excess Inventory Portal</h1>
      
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Brand (e.g., Kraft)" onChange={e => setForm({...form, brand: e.target.value})} />
        <input type="text" placeholder="Product" onChange={e => setForm({...form, productName: e.target.value})} />
        <input type="number" placeholder="Quantity" onChange={e => setForm({...form, quantity: parseInt(e.target.value)})} />
        <label>
          <input 
            type="checkbox" 
            checked={form.isPerishable}
            onChange={(e) => 
              setForm({
                ...form,
                isPerishable: e.target.checked,
                expirationDate: e.target.checked ? form.expirationDate : ""
              })
            }
          />Is item perishable?</label>
        {form.isPerishable && (
          <input 
          type="date" 
          onChange={e => 
            setForm({
              ...form, 
              expirationDate: e.target.value
            })} 
          />
        )}
        <button type="submit">List Inventory</button>
      </form>

      <h2>Available Pallets</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.brand} - {item.productName} 
            ({item.quantity} pallets) - 
            {item.expirationDate && calcDaysRemainingBeforeExpired(item.expirationDate) || " Non-perishable"}
          </li>
        ))}
      </ul>
    </div>
  );
}

function calcDaysRemainingBeforeExpired(expirationDate: string): string {
  let convertedDate = new Date(expirationDate);
  let millisecondsRemaining = convertedDate.getTime() - new Date().getTime();
  return (
    " Expires: " + 
    convertedDate.toLocaleDateString() + 
    " (" + Math.round(millisecondsRemaining / (1000 * 60 * 60 * 24)) + " days)") as string;
}

export default App;