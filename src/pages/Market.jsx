import React, { useEffect, useState } from 'react';
import { getMarketPrices } from '../services/firestore';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const sampleData = [
  { marketName: 'Dambulla', vegetableName: 'Tomato', pricePerKg: 180, category: 'vegetables' },
  { marketName: 'Pettah', vegetableName: 'Carrot', pricePerKg: 220, category: 'vegetables' },
  { marketName: 'Colombo', vegetableName: 'Potato', pricePerKg: 150, category: 'vegetables' },
  { marketName: 'Nuwara Eliya', vegetableName: 'Cabbage', pricePerKg: 120, category: 'vegetables' },
  { marketName: 'Dambulla', vegetableName: 'Banana', pricePerKg: 80, category: 'fruits' },
  { marketName: 'Pettah', vegetableName: 'Apple', pricePerKg: 600, category: 'fruits' }
];

const Market = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMarket, setFilterMarket] = useState('All');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        let data = await getMarketPrices();
        
        // Seed database if empty just for the demo
        if (data.length === 0) {
          const promises = sampleData.map(item => addDoc(collection(db, 'marketPrices'), item));
          await Promise.all(promises);
          data = await getMarketPrices();
        }
        
        setPrices(data);
      } catch (error) {
        console.error("Error fetching market prices:", error);
      }
      setLoading(false);
    };

    fetchPrices();
  }, []);

  const filteredPrices = prices.filter(p => {
    const matchSearch = p.vegetableName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchMarket = filterMarket === 'All' || p.marketName === filterMarket;
    return matchSearch && matchMarket;
  });

  const uniqueMarkets = ['All', ...new Set(prices.map(p => p.marketName))];

  return (
    <section className="section" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">📈 Live Data</div>
          <h2 className="section-title">Farmer Market Prices</h2>
          <p className="section-subtitle">Real-time daily vegetable and fruit prices across Sri Lanka.</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Search crop (e.g. Tomato)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            style={{ flex: 1, minWidth: '200px' }}
          />
          <select 
            value={filterMarket} 
            onChange={(e) => setFilterMarket(e.target.value)}
            className="search-input"
            style={{ maxWidth: '200px' }}
          >
            {uniqueMarkets.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        {loading ? (
          <p>Loading prices...</p>
        ) : (
          <div className="plant-cards-grid">
            {filteredPrices.map((item, index) => (
              <div key={item.id || index} className="plant-card">
                <div className="plant-card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 className="plant-card-name">{item.vegetableName}</h3>
                    <span className="plant-tag">{item.category}</span>
                  </div>
                  <p className="plant-card-sci" style={{ margin: '10px 0' }}>📍 {item.marketName}</p>
                  <h2 style={{ color: 'var(--primary-color)', fontSize: '1.5rem' }}>Rs. {item.pricePerKg} /kg</h2>
                </div>
              </div>
            ))}
            {filteredPrices.length === 0 && <p>No items found for this search.</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default Market;
