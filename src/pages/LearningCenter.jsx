import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getLearningArticles, seedLearningArticles } from '../services/firestore';

const CATEGORIES = [
  { id: 'all', key: 'learning.filter.all' },
  { id: 'beginner', key: 'learning.filter.beginner' },
  { id: 'organic', key: 'learning.filter.organic' },
  { id: 'nature', key: 'learning.filter.nature' },
  { id: 'vegetable', key: 'learning.filter.vegetable' }
];

const LearningCenter = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        await seedLearningArticles(); // Ensure we have data
        const data = await getLearningArticles();
        setArticles(data);
      } catch (err) {
        console.error("Failed to load articles", err);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const currentLang = i18n.language || 'en';

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory || (article.tags && article.tags.some(tag => tag.toLowerCase() === activeCategory.toLowerCase()));
    
    // Safely get title for current language
    const titleStr = article.title[currentLang] || article.title['en'] || '';
    const matchesSearch = titleStr.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="section" style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Header Section */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label" style={{ animation: 'pulse 2s infinite' }}>📚 PlantIQ Academy</div>
          <h2 className="section-title">{t('learning.title', 'Agriculture Learning Center')}</h2>
          <p className="section-subtitle">{t('learning.subtitle', 'Learn modern, organic, and natural farming methods with step-by-step guides.')}</p>
        </div>

        {/* Search & Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', marginBottom: '4rem' }}>
          
          {/* Search Bar */}
          <div style={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>🔍</span>
            <input 
              type="text" 
              placeholder={t('learning.search_placeholder', 'Search articles (e.g., tomato farming)...')} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '1.2rem 1.2rem 1.2rem 3.5rem', borderRadius: '30px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-primary)', fontSize: '1rem', boxShadow: 'var(--shadow-sm)', outline: 'none', transition: 'box-shadow 0.3s ease' }}
            />
          </div>

          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
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
                  transition: 'all 0.3s ease',
                  boxShadow: activeCategory === cat.id ? '0 4px 15px rgba(16, 185, 129, 0.4)' : 'none'
                }}
              >
                {t(cat.key)}
              </button>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        {!searchQuery && activeCategory === 'all' && (
          <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(34,197,94,0.05))', borderRadius: '24px', padding: '1.5rem', border: '1px solid rgba(16,185,129,0.3)', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>🤖</span>
            <p style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-primary)', margin: 0 }}>
              {t('learning.ai_suggestion', { topic: 'Natural Farming', suggestion: 'Compost Making' })}
            </p>
          </div>
        )}

        {/* Articles Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3].map(n => (
              <div key={n} style={{ background: 'var(--card-bg)', borderRadius: '24px', height: '400px', animation: 'pulse 1.5s infinite', border: '1px solid var(--border-color)' }}></div>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
            No articles found matching your search.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {filteredArticles.map(article => (
              <div 
                key={article.id} 
                onClick={() => navigate(`/learning/${article.id}`)}
                style={{ background: 'var(--card-bg)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img src={article.image} alt="article cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {article.tags && article.tags[0] && (
                    <span style={{ position: 'absolute', top: '15px', left: '15px', background: 'var(--emerald-500)', color: '#fff', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', backdropFilter: 'blur(4px)', backgroundColor: 'rgba(16,185,129,0.85)' }}>
                      {article.tags[0]}
                    </span>
                  )}
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <span>✍️ {article.author}</span>
                    <span>⏱️ {t('learning.read_time', { time: article.readTime })}</span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', lineHeight: '1.4', color: 'var(--text-primary)' }}>
                    {article.title[currentLang] || article.title['en']}
                  </h3>
                  
                  {/* Simulate Reading Progress (For UI flair) */}
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      <span>{t('learning.continue_reading', 'Continue Reading')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LearningCenter;
