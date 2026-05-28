import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// Comprehensive Sri Lankan Crop Database
const CROPS_DB = [
  {
    id: 'tomato',
    nameEn: 'Tomato', nameTa: 'தக்காளி', nameSi: 'තක්කාලි',
    bestCities: ['Nuwara Eliya', 'Kandy', 'Badulla', 'Jaffna', 'Matale', 'Dambulla'],
    bestMonths: [4, 5, 6, 7, 8], // May-August approx
    harvest: '70–90 days',
    demand: 'high',
    price: 'Rs. 280–420/kg',
    profit: 'high',
    diseaseRisk: 'High (Blight)',
    weather: 'Cool to Moderate, Full Sun',
    tips: 'Stake plants early and avoid overhead watering to prevent fungal diseases.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80'
  },
  {
    id: 'chili',
    nameEn: 'Chili', nameTa: 'மிளகாய்', nameSi: 'මිරිස්',
    bestCities: ['Anuradhapura', 'Jaffna', 'Kurunegala', 'Puttalam', 'Hambantota', 'Dambulla'],
    bestMonths: [0, 1, 2, 3, 4, 8, 9, 10], // Dry season planting
    harvest: '75–100 days',
    demand: 'high',
    price: 'Rs. 600–1200/kg',
    profit: 'high',
    diseaseRisk: 'Medium (Leaf Curl Virus)',
    weather: 'Warm and Sunny',
    tips: 'Use mulch to retain moisture and apply neem oil for pest control.',
    image: 'https://images.unsplash.com/photo-1585064705353-c90185e78bc1?w=400&q=80'
  },
  {
    id: 'onion',
    nameEn: 'Onion', nameTa: 'வெங்காயம்', nameSi: 'ළූණු',
    bestCities: ['Jaffna', 'Vavuniya', 'Trincomalee', 'Mannar', 'Dambulla'],
    bestMonths: [4, 5, 6, 7], // Yala season
    harvest: '90–120 days',
    demand: 'high',
    price: 'Rs. 250–450/kg',
    profit: 'high',
    diseaseRisk: 'Low',
    weather: 'Dry and Warm',
    tips: 'Stop watering 2 weeks before harvest to cure bulbs properly.',
    image: 'https://images.unsplash.com/photo-1618512496248-a0bfe8cb9cb1?w=400&q=80'
  },
  {
    id: 'carrot',
    nameEn: 'Carrot', nameTa: 'கேரட்', nameSi: 'කැරට්',
    bestCities: ['Nuwara Eliya', 'Badulla', 'Kandy'],
    bestMonths: [1, 2, 3, 8, 9, 10], 
    harvest: '70–80 days',
    demand: 'medium',
    price: 'Rs. 150–250/kg',
    profit: 'medium',
    diseaseRisk: 'Low',
    weather: 'Cool and Moist',
    tips: 'Ensure soil is deep and free of stones for straight roots.',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80'
  },
  {
    id: 'potato',
    nameEn: 'Potato', nameTa: 'உருளைக்கிழங்கு', nameSi: 'අර්තාපල්',
    bestCities: ['Nuwara Eliya', 'Badulla', 'Jaffna'],
    bestMonths: [2, 3, 4, 8, 9], 
    harvest: '90–110 days',
    demand: 'high',
    price: 'Rs. 200–350/kg',
    profit: 'high',
    diseaseRisk: 'High (Late Blight)',
    weather: 'Cool Climate',
    tips: 'Hill up soil around stems to prevent greening of tubers.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80'
  },
  {
    id: 'cabbage',
    nameEn: 'Cabbage', nameTa: 'முட்டைக்கோஸ்', nameSi: 'ගෝවා',
    bestCities: ['Nuwara Eliya', 'Badulla', 'Kandy'],
    bestMonths: [1, 2, 8, 9, 10, 11], 
    harvest: '60–85 days',
    demand: 'medium',
    price: 'Rs. 100–180/kg',
    profit: 'medium',
    diseaseRisk: 'Medium (Caterpillars)',
    weather: 'Cool Climate',
    tips: 'Use row covers to protect young plants from cabbage moths.',
    image: 'https://images.unsplash.com/photo-1596191796120-d39b8bc1fc08?w=400&q=80'
  },
  {
    id: 'beans',
    nameEn: 'Beans', nameTa: 'பீன்ஸ்', nameSi: 'බෝංචි',
    bestCities: ['Kandy', 'Matale', 'Nuwara Eliya', 'Badulla'],
    bestMonths: [0, 1, 2, 5, 6, 7], 
    harvest: '50–65 days',
    demand: 'medium',
    price: 'Rs. 250–400/kg',
    profit: 'medium',
    diseaseRisk: 'Low',
    weather: 'Moderate',
    tips: 'Harvest frequently to encourage more pod production.',
    image: 'https://images.unsplash.com/photo-1588681285375-10313f8c87ba?w=400&q=80'
  },
  {
    id: 'brinjal',
    nameEn: 'Brinjal', nameTa: 'கத்தரிக்காய்', nameSi: 'වම්බටු',
    bestCities: ['Kurunegala', 'Anuradhapura', 'Jaffna', 'Hambantota', 'Colombo', 'Matara'],
    bestMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // All year round mostly
    harvest: '60–80 days',
    demand: 'high',
    price: 'Rs. 150–250/kg',
    profit: 'medium',
    diseaseRisk: 'High (Shoot and Fruit Borer)',
    weather: 'Warm and Sunny',
    tips: 'Regularly prune lower leaves to improve air circulation.',
    image: 'https://images.unsplash.com/photo-1614560124614-7d5a525287f3?w=400&q=80'
  },
  {
    id: 'okra',
    nameEn: 'Okra', nameTa: 'வெண்டைக்காய்', nameSi: 'බණ්ඩක්කා',
    bestCities: ['Colombo', 'Galle', 'Matara', 'Kurunegala', 'Hambantota'],
    bestMonths: [2, 3, 4, 5, 6, 8, 9], 
    harvest: '50–60 days',
    demand: 'medium',
    price: 'Rs. 120–200/kg',
    profit: 'low',
    diseaseRisk: 'Low',
    weather: 'Hot and Humid',
    tips: 'Harvest pods when they are 3-4 inches long for best tenderness.',
    image: 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=400&q=80'
  },
  {
    id: 'pumpkin',
    nameEn: 'Pumpkin', nameTa: 'பூசணிக்காய்', nameSi: 'වට්ටක්කා',
    bestCities: ['Anuradhapura', 'Polonnaruwa', 'Monaragala', 'Ampara', 'Kurunegala'],
    bestMonths: [1, 2, 3, 8, 9, 10], 
    harvest: '90–120 days',
    demand: 'low',
    price: 'Rs. 80–120/kg',
    profit: 'medium',
    diseaseRisk: 'Medium (Powdery Mildew)',
    weather: 'Warm and Dry',
    tips: 'Provide plenty of space for vines to run and avoid overwatering foliage.',
    image: 'https://images.unsplash.com/photo-1509564287513-41bbd6f6eec7?w=400&q=80'
  },
  {
    id: 'corn',
    nameEn: 'Corn', nameTa: 'சோளம்', nameSi: 'බඩ ඉරිඟු',
    bestCities: ['Anuradhapura', 'Ampara', 'Mahiyanganaya', 'Monaragala'],
    bestMonths: [3, 4, 9, 10], // Maha and Yala starts
    harvest: '80–100 days',
    demand: 'medium',
    price: 'Rs. 100–150/kg',
    profit: 'medium',
    diseaseRisk: 'Low',
    weather: 'Warm, Full Sun',
    tips: 'Plant in blocks rather than single rows for better pollination.',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=80'
  },
  {
    id: 'tea',
    nameEn: 'Tea', nameTa: 'தேயிலை', nameSi: 'තේ',
    bestCities: ['Nuwara Eliya', 'Badulla', 'Kandy', 'Ratnapura', 'Matara', 'Galle'],
    bestMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // Perennial
    harvest: 'Continuous Plucking',
    demand: 'high',
    price: 'Rs. 200–350/kg (Green leaf)',
    profit: 'high',
    diseaseRisk: 'Medium (Blister Blight)',
    weather: 'Cool, Humid, High Rainfall',
    tips: 'Maintain shade trees and follow strict plucking cycles.',
    image: 'https://images.unsplash.com/photo-1571406852441-2a623719b486?w=400&q=80'
  },
  {
    id: 'banana',
    nameEn: 'Banana', nameTa: 'வாழைப்பழம்', nameSi: 'කෙසෙල්',
    bestCities: ['Embilipitiya', 'Kurunegala', 'Ratnapura', 'Colombo', 'Hambantota'],
    bestMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // All year round
    harvest: '9–12 months',
    demand: 'high',
    price: 'Rs. 80–200/kg',
    profit: 'high',
    diseaseRisk: 'Medium (Panama Disease)',
    weather: 'Tropical, Hot, Humid',
    tips: 'Remove suckers to direct energy to the main fruiting stem.',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&q=80'
  },
  {
    id: 'papaya',
    nameEn: 'Papaya', nameTa: 'பப்பாளி', nameSi: 'පැපොල්',
    bestCities: ['Puttalam', 'Kurunegala', 'Anuradhapura', 'Hambantota', 'Vavuniya'],
    bestMonths: [1, 2, 3, 8, 9, 10], 
    harvest: '6–9 months',
    demand: 'high',
    price: 'Rs. 100–250/kg',
    profit: 'high',
    diseaseRisk: 'High (Ringspot Virus)',
    weather: 'Warm and Sunny',
    tips: 'Ensure excellent drainage; papayas are highly susceptible to root rot.',
    image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400&q=80'
  },
  {
    id: 'coconut',
    nameEn: 'Coconut', nameTa: 'தேங்காய்', nameSi: 'පොල්',
    bestCities: ['Kurunegala', 'Puttalam', 'Gampaha', 'Matara', 'Galle', 'Hambantota'],
    bestMonths: [4, 5, 6, 10, 11], // Monsoon planting
    harvest: 'Every 2 months (after 5 years)',
    demand: 'high',
    price: 'Rs. 80–150/nut',
    profit: 'high',
    diseaseRisk: 'Low',
    weather: 'Coastal, Tropical, Humid',
    tips: 'Regularly apply organic fertilizer and bury coconut husks to retain moisture.',
    image: 'https://images.unsplash.com/photo-1587314545939-55694a12ac6e?w=400&q=80'
  }
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CITIES = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Dambulla', 'Galle',
  'Gampaha', 'Hambantota', 'Jaffna', 'Kandy', 'Kurunegala', 'Mannar', 'Matale', 'Matara',
  'Monaragala', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

const SmartFarmingPlanner = () => {
  const { t, i18n } = useTranslation();
  
  const currentMonthIndex = new Date().getMonth();
  const [selectedCity, setSelectedCity] = useState('Anuradhapura');
  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);

  // Recommendations Logic
  const recommendedCrops = useMemo(() => {
    return CROPS_DB.filter(crop => 
      crop.bestCities.includes(selectedCity) && 
      crop.bestMonths.includes(selectedMonth)
    );
  }, [selectedCity, selectedMonth]);

  const trendingCrops = useMemo(() => {
    return CROPS_DB.filter(c => c.demand === 'high').slice(0, 3);
  }, []);

  const getLocalizedName = (crop) => {
    if (i18n.language === 'ta') return crop.nameTa;
    if (i18n.language === 'si') return crop.nameSi;
    return crop.nameEn;
  };

  const getTranslatedBadge = (value) => {
    if(value === 'high') return t('planner.high', 'High');
    if(value === 'medium') return t('planner.medium', 'Medium');
    if(value === 'low') return t('planner.low', 'Low');
    return value;
  };

  const getBadgeColor = (value) => {
    if(value === 'high') return 'var(--emerald-500)';
    if(value === 'medium') return '#eab308'; // yellow
    if(value === 'low') return 'var(--danger)';
    return 'var(--text-secondary)';
  };

  // AI Prediction string logic
  const topCrop = recommendedCrops.length > 0 ? recommendedCrops[0] : null;
  const aiPredictionText = topCrop 
    ? t('planner.ai_prediction', '{{crop}} demand is expected to increase this month in {{city}} market.', { crop: getLocalizedName(topCrop), city: selectedCity })
    : t('profiles.no_results', 'No major crop predictions for this exact combination. Explore other months!');

  return (
    <div className="planner-page" style={{ paddingTop: '100px', paddingBottom: '4rem', background: 'var(--bg-color)', minHeight: '100vh' }}>
      
      {/* Hero Header */}
      <section className="container" style={{ textAlign: 'center', marginBottom: '3rem', animation: 'fadeInUp 0.8s ease' }}>
        <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', background: 'linear-gradient(90deg, rgba(34,197,94,0.1), rgba(16,185,129,0.1))', color: 'var(--emerald-500)', borderRadius: '30px', fontWeight: 'bold', marginBottom: '1rem', border: '1px solid rgba(34,197,94,0.3)' }}>
          🌱 AI-Powered Agriculture
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', lineHeight: '1.2', marginBottom: '1rem', background: 'linear-gradient(to right, var(--text-primary), var(--emerald-500))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {t('planner.title', 'Smart Farming Planner')}
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
          {t('planner.subtitle', 'Discover what crops to grow in Sri Lanka based on city, season, weather, and market demand.')}
        </p>
      </section>

      {/* Filters Area */}
      <section className="container" style={{ marginBottom: '3rem' }}>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-lg)', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-end', justifyContent: 'center' }}>
          
          <div style={{ flex: '1', minWidth: '250px' }}>
            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>📍 {t('planner.city', 'Select City')}</label>
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
              className="search-input"
              style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
            >
              {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>

          <div style={{ flex: '1', minWidth: '250px' }}>
            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>📅 {t('planner.month', 'Select Month')}</label>
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="search-input"
              style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
            >
              {MONTHS.map((m, idx) => <option key={idx} value={idx}>{m}</option>)}
            </select>
          </div>

          <div style={{ flex: '0 0 auto' }}>
            <button className="btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem', borderRadius: '12px', height: '100%', boxShadow: '0 10px 25px -5px rgba(34,197,94,0.4)' }}>
              {t('planner.btn', 'Get Recommendations')}
            </button>
          </div>
        </div>
      </section>

      {/* AI Prediction Banner */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.95))', borderLeft: '6px solid var(--emerald-500)', borderRadius: '16px', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: 'var(--shadow-md)', color: '#fff' }}>
          <div style={{ fontSize: '2.5rem', animation: 'pulse 2s infinite' }}>🤖</div>
          <div>
            <h4 style={{ color: 'var(--emerald-400)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.3rem' }}>AI Market Prediction</h4>
            <p style={{ fontSize: '1.2rem', fontWeight: '500', margin: 0, lineHeight: '1.4' }}>{aiPredictionText}</p>
          </div>
        </div>
      </section>

      {/* Recommended Crops Grid */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem' }}>{t('planner.best_crop', 'Best Crops This Month')}</h2>
          <span style={{ background: 'var(--bg-secondary)', padding: '0.5rem 1rem', borderRadius: '30px', fontWeight: 'bold' }}>{recommendedCrops.length} Found</span>
        </div>

        {recommendedCrops.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--card-bg)', borderRadius: '24px', border: '1px dashed var(--border-color)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏜️</div>
            <h3>No optimal crops found</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Try selecting a different month or city to find better farming opportunities.</p>
          </div>
        ) : (
          <div className="plant-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {recommendedCrops.map(crop => (
              <div key={crop.id} className="plant-card" style={{ background: 'var(--card-bg)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                <div style={{ height: '220px', position: 'relative' }}>
                  <img src={crop.image} alt={crop.nameEn} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', color: '#fff', padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span>{t('planner.profit', 'Profit')}:</span> 
                    <span style={{ color: getBadgeColor(crop.profit) }}>{getTranslatedBadge(crop.profit)}</span>
                  </div>
                </div>
                
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{getLocalizedName(crop)}</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>⏱️ {t('planner.harvest', 'Harvest Time')}</span>
                      <span style={{ fontWeight: '600' }}>{crop.harvest}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>📈 {t('planner.demand', 'Demand')}</span>
                      <span style={{ fontWeight: '600', color: getBadgeColor(crop.demand) }}>{getTranslatedBadge(crop.demand)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>💰 {t('planner.price', 'Estimated Price')}</span>
                      <span style={{ fontWeight: '600', color: 'var(--emerald-500)' }}>{crop.price}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>🦠 Disease Risk</span>
                      <span style={{ fontWeight: '600' }}>{crop.diseaseRisk}</span>
                    </div>
                  </div>

                  <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '12px', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    <strong>💡 Pro Tip:</strong> {crop.tips}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Profit Dashboard & Monthly Guide */}
      <section className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          
          {/* Dashboard Left */}
          <div style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📊 {t('planner.dashboard', 'Farmer Profit Dashboard')}
            </h3>
            
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>{t('planner.high_profit', 'High Profit This Month')}</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {trendingCrops.map(crop => (
                <div key={crop.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                      <img src={crop.image} alt={crop.id} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span style={{ fontWeight: 'bold' }}>{getLocalizedName(crop)}</span>
                  </div>
                  <span style={{ padding: '0.3rem 0.8rem', background: 'rgba(34,197,94,0.1)', color: 'var(--emerald-500)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    High Demand 🚀
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Guide Right */}
          <div style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🗓️ {t('planner.monthly_guide', 'Visual Monthly Farming Guide')}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[0, 1, 2, 3].map(offset => {
                const checkMonth = (currentMonthIndex + offset) % 12;
                const topCropsForMonth = CROPS_DB.filter(c => c.bestMonths.includes(checkMonth)).slice(0, 4);
                
                return (
                  <div key={offset} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '80px', fontWeight: 'bold', color: offset === 0 ? 'var(--emerald-500)' : 'var(--text-secondary)' }}>
                      {MONTHS[checkMonth].substring(0, 3)}
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {topCropsForMonth.map(c => (
                        <span key={c.id} style={{ padding: '0.3rem 0.6rem', background: 'var(--bg-tertiary)', borderRadius: '8px', fontSize: '0.85rem' }}>
                          {getLocalizedName(c)}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default SmartFarmingPlanner;
