import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const Navbar = ({ user }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ta' : 'en');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="logo-icon">🌿</div>
          <span>PlantIQ</span>
        </Link>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</Link>
          <Link to="/#scanner" onClick={() => setIsMenuOpen(false)}>{t('nav.scan')}</Link>
          <Link to="/profiles" onClick={() => setIsMenuOpen(false)}>{t('nav.encyclopedia', 'Encyclopedia')}</Link>
          <Link to="/community" onClick={() => setIsMenuOpen(false)}>{t('nav.community', 'Community')}</Link>
          <Link to="/experts" onClick={() => setIsMenuOpen(false)}>{t('nav.experts', 'Experts')}</Link>
          <Link to="/market" onClick={() => setIsMenuOpen(false)}>{t('nav.market', 'Market')}</Link>
          <Link to="/learning" onClick={() => setIsMenuOpen(false)}>{t('nav.learning', 'Learning Center')}</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>{t('nav.about', 'About Us')}</Link>
        </div>
        <div className="nav-actions">
          <Link to="/admin" title="Admin Panel" style={{ textDecoration: 'none', fontSize: '1.2rem', padding: '0 0.5rem' }}>⚙️</Link>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Dark Mode" style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer' }}>
            {isDark ? '☀️' : '🌙'}
          </button>
          <button className="lang-toggle" onClick={toggleLang} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
            {i18n.language === 'en' ? 'தமிழ்' : 'EN'}
          </button>
          {user ? (
            <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/dashboard" className="btn-login" style={{ fontWeight: 'bold' }}>{user.displayName || 'Dashboard'}</Link>
              <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.4rem 1rem' }}>{t('nav.logout')}</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-login">{t('nav.login')}</Link>
              <Link to="/register" className="btn-signup">{t('nav.signup')}</Link>
            </>
          )}
        </div>
        <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
      </div>
    </nav>
  );
};

export default Navbar;
