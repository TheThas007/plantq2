import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAgriNews, addAgriNews } from '../services/firestore';

// Fallback Data for Seeding if Database is empty
const FALLBACK_NEWS = [
  {
    id: 1,
    title: 'Heavy Rain Alert for Farmers in Central Province',
    description: 'Farmers in Nuwara Eliya and Kandy are advised to avoid fertilizer application due to expected heavy rainfall over the next 48 hours.',
    urlToImage: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&q=80',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { name: 'Meteorological Dept SL' },
    category: 'weather'
  },
  {
    id: 2,
    title: 'Vegetable Prices Surge in Dambulla Wholesale Market',
    description: 'Prices of carrot, beans, and tomato have seen a 20% increase today due to supply shortages from upcountry farming districts.',
    urlToImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: { name: 'AgriMarket News' },
    category: 'markets'
  },
  {
    id: 3,
    title: 'New Subsidy for Organic Fertilizer Announced',
    description: 'The Ministry of Agriculture has announced a new subsidy scheme for paddy farmers adopting organic fertilizer methods for the upcoming Maha season.',
    urlToImage: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=500&q=80',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: { name: 'Gov Info SL' },
    category: 'govt'
  },
  {
    id: 4,
    title: 'Fall Armyworm Threat in Anuradhapura Corn Fields',
    description: 'Agronomists issue an urgent warning to corn farmers in Anuradhapura regarding the rapid spread of the Fall Armyworm pest.',
    urlToImage: 'https://images.unsplash.com/photo-1595856467362-e1a533bf03db?w=500&q=80',
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    source: { name: 'Crop Protection SL' },
    category: 'disease'
  },
  {
    id: 5,
    title: 'High Yielding Onion Seeds Distributed in Jaffna',
    description: 'The Department of Agriculture commenced the distribution of a new high-yielding red onion seed variety to farmers in the Northern Province.',
    urlToImage: 'https://images.unsplash.com/photo-1618512496248-a0bfe8cb9cb1?w=500&q=80',
    publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    source: { name: 'Farming Daily' },
    category: 'seeds'
  },
  {
    id: 6,
    title: 'Tea Production Rebounds After Favorable Weather',
    description: 'Tea estates in Ratnapura and Badulla report a significant increase in green leaf plucking volumes following optimum rainfall patterns.',
    urlToImage: 'https://images.unsplash.com/photo-1571406852441-2a623719b486?w=500&q=80',
    publishedAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    source: { name: 'Tea Board SL' },
    category: 'farming'
  }
];

const CATEGORIES = [
  { id: 'all', key: 'news.filter.all' },
  { id: 'weather', key: 'news.filter.weather' },
  { id: 'farming', key: 'news.filter.farming' },
  { id: 'disease', key: 'news.filter.disease' },
  { id: 'markets', key: 'news.filter.markets' },
  { id: 'fertilizer', key: 'news.filter.fertilizer' },
  { id: 'seeds', key: 'news.filter.seeds' },
  { id: 'govt', key: 'news.filter.govt' }
];

const AgriNews = () => {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchNews();
    // Auto-refresh every 15 minutes
    const interval = setInterval(fetchNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      let data = await getAgriNews();
      
      // Auto-Seed Data if Firestore is empty
      if (data.length === 0) {
        console.log("Seeding News Database...");
        for (const item of FALLBACK_NEWS) {
          const { id, ...seedData } = item;
          // Ensure default URL is lankasri as requested
          seedData.url = 'https://lankasri.com/srilanka';
          if(!seedData.urlToImage) {
            seedData.urlToImage = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80';
          }
          await addAgriNews(seedData);
        }
        // Refetch after seeding
        data = await getAgriNews();
      }
      
      setNews(data);
    } catch (error) {
      console.error("Error fetching news from Firestore:", error);
    }
    setLoading(false);
  };

  const filteredNews = activeCategory === 'all' 
    ? news 
    : news.filter(n => n.category === activeCategory);

  const formatTimeAgo = (dateString) => {
    const hours = Math.abs(new Date() - new Date(dateString)) / 36e5;
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${Math.floor(hours)} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  return (
    <section className="section" style={{ position: 'relative', zIndex: 3, paddingBottom: '4rem' }}>
      
      {/* Breaking News Ticker */}
      <div style={{ background: 'var(--danger)', color: '#fff', padding: '0.8rem 0', display: 'flex', alignItems: 'center', overflow: 'hidden', whiteSpace: 'nowrap', marginBottom: '3rem', position: 'relative', zIndex: 10 }}>
        <div style={{ background: 'var(--danger)', fontWeight: 'bold', padding: '0 2rem', zIndex: 2, position: 'absolute', left: 0, height: '100%', display: 'flex', alignItems: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
          🚨 {t('news.breaking', 'BREAKING')}
        </div>
        <div style={{ paddingLeft: '180px', animation: 'marquee 25s linear infinite', display: 'flex', gap: '3rem' }}>
          <span>Vegetable prices increase in Colombo wholesale market by 20% due to heavy rains.</span>
          <span>New government subsidy for organic paddy farmers announced for Maha season.</span>
          <span>Tomato fungal disease alert issued for Nuwara Eliya district.</span>
        </div>
      </div>

      <div className="container">
        
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label" style={{ animation: 'pulse 2s infinite' }}>📰 Real-Time Updates</div>
          <h2 className="section-title">{t('news.title', 'Agriculture News & Farming Updates')}</h2>
          <p className="section-subtitle">{t('news.subtitle', 'Stay updated with real-time agriculture, crop, weather, and market news.')}</p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '30px',
                border: 'none',
                background: activeCategory === cat.id ? 'var(--emerald-500)' : 'var(--bg-secondary)',
                color: activeCategory === cat.id ? '#fff' : 'var(--text-secondary)',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
                boxShadow: activeCategory === cat.id ? '0 4px 15px rgba(16, 185, 129, 0.4)' : 'none'
              }}
            >
              {t(cat.key)}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', '@media(minWidth: 1024px)': { gridTemplateColumns: '3fr 1fr' } }}>
          
          {/* Main News Feed */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {loading ? (
              [1, 2, 3, 4].map(n => (
                <div key={n} style={{ background: 'var(--card-bg)', borderRadius: '24px', height: '400px', animation: 'pulse 1.5s infinite', border: '1px solid var(--border-color)' }}></div>
              ))
            ) : filteredNews.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                No news found for this category.
              </div>
            ) : (
              filteredNews.map(article => (
                <div key={article.id} className="news-card" style={{ background: 'var(--card-bg)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img 
                      src={article.urlToImage || 'https://placehold.co/600x400/10b981/ffffff?text=Agri+News'} 
                      alt="news" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/10b981/ffffff?text=Agri+News'; }}
                    />
                    <span style={{ position: 'absolute', top: '15px', left: '15px', background: 'var(--emerald-500)', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                      {t(`news.filter.${article.category}`, article.category)}
                    </span>
                  </div>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <span>🏢 {article.source.name}</span>
                      <span>⏱️ {formatTimeAgo(article.publishedAt)}</span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.8rem', lineHeight: '1.4', color: 'var(--text-primary)' }}>{article.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                      {article.description.length > 120 ? article.description.substring(0, 120) + '...' : article.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <a href={article.url || '#'} target="_blank" rel="noreferrer" style={{ color: 'var(--emerald-500)', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {t('news.read_more', 'Read More')} <span>→</span>
                      </a>
                      <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem' }}>🔖</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar / Market Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: '300px' }}>
            
            {/* AI Recommendation Widget */}
            <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(34,197,94,0.05))', borderRadius: '24px', padding: '1.5rem', border: '1px solid rgba(16,185,129,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--emerald-500)', fontWeight: 'bold' }}>
                <span>🤖</span> AI Intelligence
              </div>
              <p style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                {t('news.ai_recommendation', 'Tomato fungal disease alert in Nuwara Eliya this week.')}
              </p>
            </div>

            {/* Market Highlights Widget */}
            <div style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '1.5rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                📈 {t('news.market_highlights', "Today's Market Highlights")}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🍅</span>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Tomato Demand</span>
                  </div>
                  <span style={{ color: 'var(--emerald-500)', fontWeight: 'bold' }}>↑ High</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🧅</span>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Onion Price</span>
                  </div>
                  <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>↓ Low</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🫘</span>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Beans Demand</span>
                  </div>
                  <span style={{ color: 'var(--emerald-500)', fontWeight: 'bold' }}>↑ Rising</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      
      {/* CSS for Marquee - Injecting inline for simplicity or assuming it's in index.css */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .news-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 15px 30px -10px rgba(0,0,0,0.2) !important;
        }
        .news-card img:hover {
          transform: scale(1.05) !important;
        }
      `}</style>
    </section>
  );
};

export default AgriNews;
