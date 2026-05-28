import React, { useEffect, useState } from 'react';
import { getUserPlants } from '../services/firestore';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AgriNews from '../components/AgriNews';

const Dashboard = ({ user }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const data = await getUserPlants(user.uid);
        setPlants(data);
      } catch (error) {
        console.error("Error fetching plants: ", error);
      }
      setLoading(false);
    };

    if (user?.uid) {
      fetchPlants();
    }
  }, [user]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&precipitation=true`);
          const data = await res.json();
          setWeather(data.current_weather);
        } catch (err) {
          console.error("Weather fetch failed", err);
        }
      }, (err) => {
        console.log("Geolocation denied or failed", err);
      });
    }
  }, []);

  if (loading) return <div style={{ padding: '120px 20px', textAlign: 'center' }}>Loading dashboard...</div>;

  // Prepare Chart Data
  const healthData = plants.map((p, idx) => ({
    name: `Scan ${plants.length - idx}`,
    score: p.healthScore || 0
  })).reverse();

  const avgHealth = plants.length > 0 ? Math.round(plants.reduce((sum, p) => sum + (p.healthScore || 0), 0) / plants.length) : 0;
  
  // Dynamic Weather Logic
  let weatherTip = "Ensure your plants are watered regularly.";
  if (weather) {
    if (weather.weathercode >= 50 && weather.weathercode <= 69) { // Rain codes in WMO
      weatherTip = "🌧️ It's raining in your area! You can skip watering outdoor plants today.";
    } else if (weather.temperature > 30) {
      weatherTip = "🔥 It's very hot today (" + weather.temperature + "°C). Make sure to deep-water your plants and provide afternoon shade.";
    } else {
      weatherTip = "🌤️ Weather is pleasant (" + weather.temperature + "°C). Standard watering schedule applies.";
    }
  }

  return (
    <section className="section dashboard" id="dashboard" style={{ paddingTop: '120px' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">📊 Dashboard</div>
          <h2 className="section-title">Welcome, {user.name}</h2>
          <p className="section-subtitle">Here is your scan history, analytics, and growth tracking.</p>
        </div>

        {weather && (
          <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', borderLeft: '4px solid var(--primary-color)' }}>
            <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🌍 Smart Care Recommendation
            </h3>
            <p>{weatherTip}</p>
          </div>
        )}

        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-icon green">🌱</div>
            </div>
            <div className="dash-card-value">{plants.length}</div>
            <div className="dash-card-label">Total Plants Scanned</div>
          </div>
          
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>💧</div>
            </div>
            <div className="dash-card-value">{plants.length > 0 && weather && weather.weathercode >= 50 && weather.weathercode <= 69 ? '0' : plants.length > 0 ? '1' : '0'}</div>
            <div className="dash-card-label">Watering Reminders Today</div>
          </div>

          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>☀️</div>
            </div>
            <div className="dash-card-value">{avgHealth}%</div>
            <div className="dash-card-label">Avg Health Score</div>
          </div>
        </div>

        {plants.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <h3>📈 Health History Timeline</h3>
            <div style={{ width: '100%', height: 300, marginTop: '2rem', background: 'var(--card-bg)', padding: '2rem', borderRadius: '12px' }}>
              <ResponsiveContainer>
                <LineChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="var(--primary-color)" activeDot={{ r: 8 }} name="Health Score (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div style={{ marginTop: '4rem', paddingBottom: '4rem' }}>
          <h3>Recent Scans</h3>
          {plants.length === 0 ? (
            <div>
              <p>No scans yet. Go to the Home page to scan a plant!</p>
              <a href="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>Scan a Plant Now</a>
            </div>
          ) : (
            <div className="plant-cards-grid" style={{ marginTop: '1rem' }}>
              {plants.map(plant => (
                <div key={plant.id} className="plant-card">
                  {plant.imageUrl && (
                    <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0' }}>
                      <img src={plant.imageUrl} alt={plant.plantName} className="plant-card-img" />
                    </div>
                  )}
                  <div className="plant-card-body">
                    <h3 className="plant-card-name">{plant.plantName}</h3>
                    <p className="plant-card-sci">{plant.diseaseName}</p>
                    <div className="plant-card-tags">
                      <span className="plant-tag">Score: {plant.healthScore}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Dynamic Agriculture News feed placed elegantly at the bottom of the dashboard */}
      <AgriNews />
    </section>
  );
};

export default Dashboard;
