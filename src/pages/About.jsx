import React from 'react';

const About = () => {
  return (
    <section className="section" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="section-header">
          <div className="section-label">ℹ️ About Us</div>
          <h2 className="section-title">About PlantIQ</h2>
        </div>
        <div style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--text-color)' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Welcome to <strong>PlantIQ</strong>, your smart plant care companion. We leverage the power of Artificial Intelligence to help farmers and gardeners identify plant diseases instantly and accurately.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Our mission is to improve crop yields and plant health by providing accessible, cutting-edge technology directly to your smartphone. Simply take a picture of a leaf, and our AI will analyze it to detect diseases and offer actionable treatment solutions.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Along with our disease scanner, we provide real-time updates on farmer market prices across Sri Lanka, ensuring you stay informed about the latest agricultural trends.
          </p>
          <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--card-bg)', borderRadius: '12px', textAlign: 'center' }}>
            <h3>Our Vision</h3>
            <p>Empowering agriculture through technology for a greener, healthier future.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
