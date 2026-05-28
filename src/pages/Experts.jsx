import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const mockExperts = [
  {
    id: 1,
    name: 'ilakkiya',
    role: 'Senior Agronomist',
    experience: '15 Years Experience',
    specialty: 'Crop Diseases, Soil Health',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aravind'
  },
  {
    id: 2,
    name: 'Thasmilan',
    role: 'Horticulturist',
    experience: '8 Years Experience',
    specialty: 'Indoor Plants, Organic Farming',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
  },
  {
    id: 3,
    name: 'sarunika',
    role: 'Agricultural Consultant',
    experience: '20 Years Experience',
    specialty: 'Pest Control, Irrigation',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saman'
  }
];

const Experts = () => {
  const { t } = useTranslation();
  const [bookingExpert, setBookingExpert] = useState(null);

  const handleBook = (expert) => {
    setBookingExpert(expert);
  };

  const confirmBooking = (e) => {
    e.preventDefault();
    alert(`Consultation booked successfully with ${bookingExpert.name}!\nThey will contact you shortly.`);
    setBookingExpert(null);
  };

  return (
    <section className="section" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">👨‍🌾 {t('nav.experts')}</div>
          <h2 className="section-title">{t('experts.title')}</h2>
          <p className="section-subtitle">{t('experts.subtitle')}</p>
        </div>

        {bookingExpert ? (
          <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
            <h3>Booking: {bookingExpert.name}</h3>
            <p style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>{bookingExpert.specialty}</p>
            <form onSubmit={confirmBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="date" className="search-input" required />
              <select className="search-input" required>
                <option value="">Select Time Slot</option>
                <option value="10:00">10:00 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="16:00">04:00 PM</option>
              </select>
              <textarea placeholder="Briefly describe your plant issue..." className="search-input" rows="3" required></textarea>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setBookingExpert(null)}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Confirm Booking</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {mockExperts.map(expert => (
              <div key={expert.id} className="plant-card" style={{ textAlign: 'center', padding: '2rem' }}>
                <img
                  src={expert.image}
                  alt={expert.name}
                  style={{ width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 1rem', background: '#f1f5f9' }}
                />
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{expert.name}</h3>
                <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{expert.role}</p>
                <p style={{ margin: '0.5rem 0', color: '#64748b' }}>{expert.experience}</p>
                <div style={{ background: 'var(--bg-color)', padding: '0.5rem', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  <strong>Specialty:</strong> {expert.specialty}
                </div>
                <button className="btn-primary" style={{ width: '100%' }} onClick={() => handleBook(expert)}>
                  Book Consultation
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experts;
