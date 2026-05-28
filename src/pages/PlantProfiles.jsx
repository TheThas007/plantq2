import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getEncyclopediaPlants, addEncyclopediaPlant } from '../services/firestore';

const mockPlantDatabase = [
  {
    name: 'Tomato (Solanum lycopersicum)',
    type: 'Vegetable',
    origin: 'South America',
    lifespan: 'Annual',
    toxicity: 'Leaves and stems are mildly toxic to pets.',
    care: 'Needs full sun (6-8 hours), consistent watering, and well-draining soil. Susceptible to blight.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80'
  },
  {
    name: 'Monstera Deliciosa',
    type: 'Houseplant',
    origin: 'Central America',
    lifespan: 'Perennial',
    toxicity: 'Toxic to cats and dogs.',
    care: 'Bright indirect light, water every 1-2 weeks allowing soil to dry out between waterings. Thrives in high humidity.',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80'
  },
  {
    name: 'Aloe Vera',
    type: 'Succulent',
    origin: 'Arabian Peninsula',
    lifespan: 'Perennial',
    toxicity: 'Toxic to pets if ingested.',
    care: 'Bright direct/indirect light. Water sparingly (every 2-3 weeks). Highly drought-tolerant.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80'
  },
  {
    name: 'Boston Fern',
    type: 'Fern',
    origin: 'Tropical regions',
    lifespan: 'Perennial',
    toxicity: 'Non-toxic to pets.',
    care: 'Prefers cool locations with high humidity and indirect light. Keep soil consistently moist but not soggy.',
    image: 'https://images.unsplash.com/photo-1626264906560-eb052b66ec07?w=400&q=80'
  },
  {
    name: 'Snake Plant (Sansevieria)',
    type: 'Succulent / Houseplant',
    origin: 'West Africa',
    lifespan: 'Perennial',
    toxicity: 'Mildly toxic to pets.',
    care: 'Extremely tolerant of low light. Water only when soil is completely dry. Overwatering will kill it.',
    image: 'https://images.unsplash.com/photo-1599026410190-677a28e7e174?w=400&q=80'
  },
  {
    name: 'Peace Lily (Spathiphyllum)',
    type: 'Houseplant',
    origin: 'Americas / SE Asia',
    lifespan: 'Perennial',
    toxicity: 'Toxic to pets and humans if ingested.',
    care: 'Low to medium light. Keep soil moist but not soggy. Leaves will droop dramatically when thirsty.',
    image: 'https://images.unsplash.com/photo-1593691509543-c20fb51c0b47?w=400&q=80'
  },
  {
    name: 'Mango Tree (Mangifera indica)',
    type: 'Fruit Tree',
    origin: 'South Asia',
    lifespan: 'Perennial (Decades)',
    toxicity: 'Sap and skin can cause allergic reactions.',
    care: 'Requires tropical/subtropical climate, full sun, and deep watering. Needs well-draining deep soil.',
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&q=80'
  },
  {
    name: 'Basil (Ocimum basilicum)',
    type: 'Herb',
    origin: 'Central Africa / SE Asia',
    lifespan: 'Annual',
    toxicity: 'Non-toxic.',
    care: 'Full sun (6-8 hours). Keep soil moist. Pinch off flowers to keep leaves producing flavor.',
    image: 'https://images.unsplash.com/photo-1604153070409-775c74eb7db0?w=400&q=80'
  }
];

const PlantProfiles = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        let data = await getEncyclopediaPlants();
        
        // Seed database if empty just for demo
        if (data.length === 0) {
          console.log("Seeding encyclopedia...");
          const promises = mockPlantDatabase.map(item => addEncyclopediaPlant(item));
          await Promise.all(promises);
          data = await getEncyclopediaPlants();
        }
        
        setPlants(data);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
      setLoading(false);
    };

    fetchPlants();
  }, []);

  const filteredPlants = plants.filter(p => 
    (p.name && p.name.toLowerCase().includes(search.toLowerCase())) || 
    (p.type && p.type.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section className="section" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">🔍 {t('nav.encyclopedia', 'Plant Encyclopedia')}</div>
          <h2 className="section-title">{t('profiles.title', 'Plant Identification & Profiles')}</h2>
          <p className="section-subtitle">{t('profiles.subtitle', 'Search thousands of plant species to learn about their origin, care, and toxicity.')}</p>
        </div>

        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <input 
            type="text" 
            placeholder={t('profiles.search', 'Search by name or type (e.g. Tomato, Succulent)...')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            style={{ width: '100%', maxWidth: '500px', fontSize: '1.1rem', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-primary)' }}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="spinner" style={{ fontSize: '3rem', animation: 'spin 2s linear infinite' }}>⏳</div>
          </div>
        ) : (
          <div className="plant-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {filteredPlants.map((plant, idx) => (
              <div key={plant.id || idx} className="plant-card" style={{ display: 'flex', flexDirection: 'column', background: 'var(--card-bg)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: '100%', height: '200px', background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
                  {plant.image ? (
                    <img 
                      src={plant.image || 'https://placehold.co/400x400/10b981/ffffff?text=Plant'} 
                      alt={plant.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/10b981/ffffff?text=Plant'; }}
                    />
                  ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No Image</div>
                  )}
                </div>
                <div className="plant-card-body" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <h3 className="plant-card-name" style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{plant.name}</h3>
                  <span className="plant-tag" style={{ alignSelf: 'flex-start', background: 'var(--emerald-100)', color: 'var(--emerald-700)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '500' }}>{plant.type}</span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><strong>🌍 {t('profiles.origin', 'Origin')}:</strong> {plant.origin}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><strong>⏳ {t('profiles.lifespan', 'Lifespan')}:</strong> {plant.lifespan}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><strong>⚠️ {t('profiles.toxicity', 'Toxicity')}:</strong> {plant.toxicity}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 'auto' }}><strong>💧 {t('profiles.care', 'Care')}:</strong> {plant.care}</p>
                </div>
              </div>
            ))}
            {filteredPlants.length === 0 && (
              <p style={{ textAlign: 'center', width: '100%', padding: '2rem', color: 'var(--text-secondary)' }}>{t('profiles.no_results', 'No plants found matching your search.')}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PlantProfiles;
