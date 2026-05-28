import React from 'react';
import { useTranslation } from 'react-i18next';
import CameraScanner from '../components/CameraScanner';
import SmartWeather from '../components/SmartWeather';
import AgriNews from '../components/AgriNews';

const Home = () => {
  const { t } = useTranslation();

  return (
    <main>
      <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="hero-bg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <img src="/assets/images/hero-bg.png" alt="Lush tropical plants background" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} />
        </div>
        
        {/* Dynamic Gradient Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)', zIndex: 1 }}></div>

        <div className="container relative z-10" style={{ zIndex: 2, textAlign: 'center', color: '#fff', padding: '0 2rem' }}>
          <div className="hero-content" style={{ animation: 'fadeInUp 1s ease-out' }}>
            <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '1.5rem', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              {t('hero.badge')}
            </div>
            <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              <span>{t('hero.title1')}</span><br />
              <span style={{ color: '#4ade80', textShadow: '0 0 20px rgba(74, 222, 128, 0.5)' }}>{t('hero.title2')}</span><br />
              <span>{t('hero.title3')}</span>
            </h1>
            <p className="hero-description" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem', color: '#e2e8f0', lineHeight: '1.6' }}>
              {t('hero.desc')}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#scanner" onClick={(e) => { e.preventDefault(); document.getElementById('scanner')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1rem', borderRadius: '50px', background: '#22c55e', color: '#fff', border: 'none', boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.5)', transition: 'all 0.3s ease', minWidth: '200px' }}>
                {t('hero.btn.scan')}
              </a>
              <a href="/experts" className="btn-secondary" style={{ padding: '0.8rem 2rem', fontSize: '1rem', borderRadius: '50px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease', minWidth: '200px' }}>
                {t('hero.btn.expert')}
              </a>
            </div>
          </div>
        </div>
        
        {/* Floating elements for premium feel */}
        <div style={{ position: 'absolute', bottom: '-50px', left: 0, width: '100%', height: '150px', background: 'linear-gradient(to top, var(--bg-color) 0%, transparent 100%)', zIndex: 2 }}></div>
      </section>

      <section className="section weather" id="weather" style={{ position: 'relative', zIndex: 3, marginTop: '-50px', paddingBottom: '4rem' }}>
        <div className="container">
          <SmartWeather />
        </div>
      </section>

      {/* Agriculture News Section */}
      <AgriNews />

      <section className="section scanner" id="scanner" style={{ position: 'relative', zIndex: 3, marginTop: '-50px', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ color: 'var(--primary-color)', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t('scanner.core')}</div>
            <h2 className="section-title" style={{ fontSize: '2.5rem' }}>{t('scanner.title')}</h2>
          </div>
          <div style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '1rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', border: '1px solid var(--border-color)' }}>
            <CameraScanner />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
