import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLearningArticles } from '../services/firestore';

const ArticleView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  const currentLang = i18n.language || 'en';

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articles = await getLearningArticles();
        const found = articles.find(a => a.id === id);
        if (found) {
          setArticle(found);
        } else {
          navigate('/learning');
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchArticle();
  }, [id, navigate]);

  // Scroll Progress Logic
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Math.round(scroll * 100));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading article...</div>;
  if (!article) return null;

  const title = article.title[currentLang] || article.title['en'];

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', position: 'relative' }}>
      
      {/* Reading Progress Bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '5px', background: 'var(--bg-secondary)', zIndex: 1000 }}>
        <div style={{ width: `${scrollProgress}%`, height: '100%', background: 'var(--emerald-500)', transition: 'width 0.2s ease-out' }}></div>
      </div>

      {/* Hero Image */}
      <div style={{ position: 'relative', width: '100%', height: '50vh', minHeight: '400px' }}>
        <img 
          src={article.image || 'https://placehold.co/800x400/10b981/ffffff?text=Article'} 
          alt={title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x400/10b981/ffffff?text=Article'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)' }}></div>
      </div>

      <div className="container" style={{ position: 'relative', marginTop: '-100px', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', '@media(minWidth: 1024px)': { gridTemplateColumns: '1fr 300px' } }}>
          
          {/* Main Article Content */}
          <article style={{ background: 'var(--card-bg)', padding: '3rem', borderRadius: '24px', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-color)' }}>
            
            {/* Meta Info */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {article.tags?.map(tag => (
                <span key={tag} style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--emerald-500)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {tag}
                </span>
              ))}
            </div>

            <h1 style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '2rem', color: 'var(--text-primary)' }}>{title}</h1>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--emerald-500)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {article.author.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{article.author}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t('learning.read_time', { time: article.readTime })}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={() => setBookmarked(!bookmarked)}
                  style={{ background: bookmarked ? 'var(--emerald-500)' : 'transparent', color: bookmarked ? '#fff' : 'var(--text-secondary)', border: '1px solid var(--border-color)', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  {bookmarked ? '🔖 Saved' : '🔖 ' + t('learning.bookmark', 'Bookmark')}
                </button>
                <button style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🔗 {t('learning.share', 'Share')}
                </button>
              </div>
            </div>

            {/* Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              {article.sections?.map((section, idx) => (
                <section key={idx} id={`section-${idx}`}>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                    {section.title[currentLang] || section.title['en']}
                  </h2>
                  <p style={{ whiteSpace: 'pre-line' }}>
                    {section.content[currentLang] || section.content['en']}
                  </p>
                </section>
              ))}
            </div>

            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🎉 {t('learning.completed', { percent: 100 })}</div>
              <button onClick={() => navigate('/learning')} className="btn-primary" style={{ padding: '1rem 2rem' }}>Back to Learning Center</button>
            </div>
          </article>

          {/* Sticky Sidebar */}
          <div style={{ display: 'none', '@media(minWidth: 1024px)': { display: 'block' } }}>
            <div style={{ position: 'sticky', top: '100px', background: 'var(--card-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{t('learning.toc', 'Table of Contents')}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {article.sections?.map((section, idx) => (
                  <li key={idx}>
                    <a 
                      href={`#section-${idx}`} 
                      style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.3s ease' }}
                      onMouseEnter={e => e.target.style.color = 'var(--emerald-500)'}
                      onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                    >
                      {section.title[currentLang] || section.title['en']}
                    </a>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{t('learning.recommended', 'Recommended')}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px', cursor: 'pointer' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--emerald-500)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Disease Control</div>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Natural Pesticide Guide</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
