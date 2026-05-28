import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  getMarketPrices, 
  addMarketPrice, 
  updateMarketPrice, 
  deleteMarketPrice,
  getEncyclopediaPlants,
  addEncyclopediaPlant,
  updateEncyclopediaPlant,
  deleteEncyclopediaPlant,
  getAgriNews,
  addAgriNews,
  updateAgriNews,
  deleteAgriNews
} from '../services/firestore';

const ADMIN_PASSCODE = 'plantq#@2026#';

const AdminPanel = () => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState('plants'); // 'plants' or 'market'
  const [loading, setLoading] = useState(false);

  // Plants State
  const [plants, setPlants] = useState([]);
  const [plantForm, setPlantForm] = useState({ id: '', name: '', type: '', origin: '', lifespan: '', toxicity: '', care: '', image: '' });

  // Market State
  const [marketPrices, setMarketPrices] = useState([]);
  const [marketForm, setMarketForm] = useState({ id: '', marketName: '', vegetableName: '', pricePerKg: '', category: 'vegetables' });

  // News State
  const [news, setNews] = useState([]);
  const [newsForm, setNewsForm] = useState({ id: '', title: '', description: '', urlToImage: '', category: 'farming', sourceName: 'PlantIQ News', url: 'https://lankasri.com/srilanka' });

  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert("Invalid Passcode!");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const p = await getEncyclopediaPlants();
      const m = await getMarketPrices();
      const n = await getAgriNews();
      setPlants(p);
      setMarketPrices(m);
      setNews(n);
    } catch (error) {
      console.error(error);
      alert("Error fetching data");
    }
    setLoading(false);
  };

  // --- CRUD: PLANTS ---
  const handlePlantSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (plantForm.id) {
        const { id, ...data } = plantForm;
        await updateEncyclopediaPlant(id, data);
      } else {
        const { id, ...data } = plantForm;
        await addEncyclopediaPlant(data);
      }
      setPlantForm({ id: '', name: '', type: '', origin: '', lifespan: '', toxicity: '', care: '', image: '' });
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("Error saving plant");
    }
    setLoading(false);
  };

  const handlePlantDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this plant?")) {
      setLoading(true);
      await deleteEncyclopediaPlant(id);
      await fetchData();
      setLoading(false);
    }
  };

  // --- CRUD: MARKET ---
  const handleMarketSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...marketForm, pricePerKg: Number(marketForm.pricePerKg) };
      if (marketForm.id) {
        const { id, ...data } = payload;
        await updateMarketPrice(id, data);
      } else {
        const { id, ...data } = payload;
        await addMarketPrice(data);
      }
      setMarketForm({ id: '', marketName: '', vegetableName: '', pricePerKg: '', category: 'vegetables' });
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("Error saving market price");
    }
    setLoading(false);
  };

  const handleMarketDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this price record?")) {
      setLoading(true);
      await deleteMarketPrice(id);
      await fetchData();
      setLoading(false);
    }
  };

  // --- CRUD: NEWS ---
  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { 
        ...newsForm, 
        source: { name: newsForm.sourceName }
      };
      // Ensure URL defaults to Lankasri if empty
      if(!payload.url || payload.url.trim() === '') {
        payload.url = 'https://lankasri.com/srilanka';
      }

      if (newsForm.id) {
        const { id, sourceName, ...data } = payload;
        await updateAgriNews(id, data);
      } else {
        const { id, sourceName, ...data } = payload;
        await addAgriNews(data);
      }
      setNewsForm({ id: '', title: '', description: '', urlToImage: '', category: 'farming', sourceName: 'PlantIQ News', url: 'https://lankasri.com/srilanka' });
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("Error saving news article");
    }
    setLoading(false);
  };

  const handleNewsDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news article?")) {
      setLoading(true);
      await deleteAgriNews(id);
      await fetchData();
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', paddingTop: '100px' }}>
        <div style={{ background: 'var(--card-bg)', padding: '3rem', borderRadius: '16px', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-color)', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <h2>🔒 Admin Access</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Enter secret passcode to manage dynamic data.</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="password" 
              placeholder="Enter secure passcode" 
              value={passcode} 
              onChange={(e) => setPasscode(e.target.value)}
              className="search-input"
              style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '1rem' }}>Unlock Panel</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <section className="section" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>⚙️ Admin Control Panel</h2>
          <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Lock Panel</button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => setActiveTab('plants')} className={activeTab === 'plants' ? 'btn-primary' : 'btn-secondary'} style={{ flex: 1, padding: '1rem' }}>🌿 Manage Encyclopedia</button>
          <button onClick={() => setActiveTab('market')} className={activeTab === 'market' ? 'btn-primary' : 'btn-secondary'} style={{ flex: 1, padding: '1rem' }}>📈 Manage Market</button>
          <button onClick={() => setActiveTab('news')} className={activeTab === 'news' ? 'btn-primary' : 'btn-secondary'} style={{ flex: 1, padding: '1rem' }}>📰 Manage News</button>
        </div>

        {loading && <div style={{ textAlign: 'center', padding: '2rem' }}>⏳ Loading data...</div>}

        {!loading && activeTab === 'plants' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3>{plantForm.id ? 'Edit Plant' : 'Add New Plant'}</h3>
              <form onSubmit={handlePlantSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <input required type="text" placeholder="Name (e.g. Tomato)" value={plantForm.name} onChange={e => setPlantForm({...plantForm, name: e.target.value})} className="search-input" />
                <input required type="text" placeholder="Type (e.g. Vegetable)" value={plantForm.type} onChange={e => setPlantForm({...plantForm, type: e.target.value})} className="search-input" />
                <input required type="text" placeholder="Origin" value={plantForm.origin} onChange={e => setPlantForm({...plantForm, origin: e.target.value})} className="search-input" />
                <input required type="text" placeholder="Lifespan" value={plantForm.lifespan} onChange={e => setPlantForm({...plantForm, lifespan: e.target.value})} className="search-input" />
                <input required type="text" placeholder="Toxicity" value={plantForm.toxicity} onChange={e => setPlantForm({...plantForm, toxicity: e.target.value})} className="search-input" />
                <textarea required placeholder="Care Instructions" value={plantForm.care} onChange={e => setPlantForm({...plantForm, care: e.target.value})} className="search-input" style={{ minHeight: '100px' }}></textarea>
                <input required type="text" placeholder="Image URL" value={plantForm.image} onChange={e => setPlantForm({...plantForm, image: e.target.value})} className="search-input" />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }}>{plantForm.id ? 'Update Plant' : 'Save Plant'}</button>
                  {plantForm.id && <button type="button" onClick={() => setPlantForm({ id: '', name: '', type: '', origin: '', lifespan: '', toxicity: '', care: '', image: '' })} className="btn-secondary">Cancel</button>}
                </div>
              </form>
            </div>
            
            <div style={{ overflowX: 'auto', background: 'var(--card-bg)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3>Current Plants ({plants.length})</h3>
              <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '1rem 0' }}>Name</th>
                    <th style={{ padding: '1rem 0' }}>Type</th>
                    <th style={{ padding: '1rem 0', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plants.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem 0' }}>{p.name}</td>
                      <td style={{ padding: '1rem 0' }}>{p.type}</td>
                      <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                        <button onClick={() => setPlantForm(p)} style={{ background: 'var(--emerald-500)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', marginRight: '0.5rem', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => handlePlantDelete(p.id)} style={{ background: 'var(--danger)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer' }}>Del</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && activeTab === 'market' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3>{marketForm.id ? 'Edit Price' : 'Add New Price'}</h3>
              <form onSubmit={handleMarketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <input required type="text" placeholder="Crop Name (e.g. Tomato)" value={marketForm.vegetableName} onChange={e => setMarketForm({...marketForm, vegetableName: e.target.value})} className="search-input" />
                <input required type="text" placeholder="Market Location (e.g. Dambulla)" value={marketForm.marketName} onChange={e => setMarketForm({...marketForm, marketName: e.target.value})} className="search-input" />
                <input required type="number" placeholder="Price Per Kg (Rs.)" value={marketForm.pricePerKg} onChange={e => setMarketForm({...marketForm, pricePerKg: e.target.value})} className="search-input" />
                <select value={marketForm.category} onChange={e => setMarketForm({...marketForm, category: e.target.value})} className="search-input">
                  <option value="vegetables">Vegetable</option>
                  <option value="fruits">Fruit</option>
                </select>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }}>{marketForm.id ? 'Update Price' : 'Save Price'}</button>
                  {marketForm.id && <button type="button" onClick={() => setMarketForm({ id: '', marketName: '', vegetableName: '', pricePerKg: '', category: 'vegetables' })} className="btn-secondary">Cancel</button>}
                </div>
              </form>
            </div>
            
            <div style={{ overflowX: 'auto', background: 'var(--card-bg)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3>Current Prices ({marketPrices.length})</h3>
              <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '1rem 0' }}>Crop</th>
                    <th style={{ padding: '1rem 0' }}>Market</th>
                    <th style={{ padding: '1rem 0' }}>Price (Rs/Kg)</th>
                    <th style={{ padding: '1rem 0', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {marketPrices.map(m => (
                    <tr key={m.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem 0' }}>{m.vegetableName}</td>
                      <td style={{ padding: '1rem 0' }}>{m.marketName}</td>
                      <td style={{ padding: '1rem 0' }}>Rs. {m.pricePerKg}</td>
                      <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                        <button onClick={() => setMarketForm(m)} style={{ background: 'var(--emerald-500)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', marginRight: '0.5rem', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => handleMarketDelete(m.id)} style={{ background: 'var(--danger)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer' }}>Del</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && activeTab === 'news' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3>{newsForm.id ? 'Edit News' : 'Add New Article'}</h3>
              <form onSubmit={handleNewsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <input required type="text" placeholder="Headline (Title)" value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} className="search-input" />
                <textarea required placeholder="News Description / Summary" value={newsForm.description} onChange={e => setNewsForm({...newsForm, description: e.target.value})} className="search-input" style={{ minHeight: '100px' }}></textarea>
                <input type="text" placeholder="Image URL (Optional)" value={newsForm.urlToImage} onChange={e => setNewsForm({...newsForm, urlToImage: e.target.value})} className="search-input" />
                <input required type="text" placeholder="Source Name (e.g. LankaSri)" value={newsForm.sourceName} onChange={e => setNewsForm({...newsForm, sourceName: e.target.value})} className="search-input" />
                <input required type="text" placeholder="Read More URL" value={newsForm.url} onChange={e => setNewsForm({...newsForm, url: e.target.value})} className="search-input" />
                <select value={newsForm.category} onChange={e => setNewsForm({...newsForm, category: e.target.value})} className="search-input">
                  <option value="farming">Farming</option>
                  <option value="weather">Weather</option>
                  <option value="markets">Markets</option>
                  <option value="disease">Crop Diseases</option>
                  <option value="fertilizer">Fertilizer</option>
                  <option value="seeds">Seeds</option>
                  <option value="govt">Govt Updates</option>
                </select>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }}>{newsForm.id ? 'Update News' : 'Publish News'}</button>
                  {newsForm.id && <button type="button" onClick={() => setNewsForm({ id: '', title: '', description: '', urlToImage: '', category: 'farming', sourceName: 'PlantIQ News', url: 'https://lankasri.com/srilanka' })} className="btn-secondary">Cancel</button>}
                </div>
              </form>
            </div>
            
            <div style={{ overflowX: 'auto', background: 'var(--card-bg)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3>Published News ({news.length})</h3>
              <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '1rem 0' }}>Headline</th>
                    <th style={{ padding: '1rem 0' }}>Category</th>
                    <th style={{ padding: '1rem 0' }}>Date</th>
                    <th style={{ padding: '1rem 0', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map(n => (
                    <tr key={n.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem 0' }}>{n.title.length > 40 ? n.title.substring(0, 40) + '...' : n.title}</td>
                      <td style={{ padding: '1rem 0', textTransform: 'capitalize' }}>{n.category}</td>
                      <td style={{ padding: '1rem 0' }}>{new Date(n.publishedAt).toLocaleDateString()}</td>
                      <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                        <button onClick={() => setNewsForm({ ...n, sourceName: n.source?.name || 'PlantIQ News' })} style={{ background: 'var(--emerald-500)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', marginRight: '0.5rem', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => handleNewsDelete(n.id)} style={{ background: 'var(--danger)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer' }}>Del</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminPanel;
