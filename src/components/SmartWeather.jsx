import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PREDEFINED_CITIES = [
  { name: 'Akuressa', lat: 6.0963, lon: 80.4854 },
  { name: 'Ampara', lat: 7.2840, lon: 81.6747 },
  { name: 'Anuradhapura', lat: 8.3114, lon: 80.4037 },
  { name: 'Avissawella', lat: 6.9533, lon: 80.2117 },
  { name: 'Badulla', lat: 6.9934, lon: 81.0550 },
  { name: 'Balangoda', lat: 6.6453, lon: 80.6974 },
  { name: 'Bandarawela', lat: 6.8301, lon: 80.9926 },
  { name: 'Batticaloa', lat: 7.7170, lon: 81.6980 },
  { name: 'Beruwala', lat: 6.4764, lon: 79.9831 },
  { name: 'Chavakachcheri', lat: 9.6582, lon: 80.1582 },
  { name: 'Chilaw', lat: 7.5759, lon: 79.7953 },
  { name: 'Colombo', lat: 6.9271, lon: 79.8612 },
  { name: 'Dambulla', lat: 7.8596, lon: 80.6547 },
  { name: 'Dehiwala-Mount Lavinia', lat: 6.8378, lon: 79.8659 },
  { name: 'Ella', lat: 6.8667, lon: 81.0466 },
  { name: 'Embilipitiya', lat: 6.3353, lon: 80.8407 },
  { name: 'Galle', lat: 6.0535, lon: 80.2210 },
  { name: 'Gampaha', lat: 7.0840, lon: 79.9996 },
  { name: 'Hambantota', lat: 6.1248, lon: 81.1185 },
  { name: 'Hatton', lat: 6.8893, lon: 80.5966 },
  { name: 'Jaffna', lat: 9.6615, lon: 80.0255 },
  { name: 'Kadawatha', lat: 7.0016, lon: 79.9500 },
  { name: 'Kaduwela', lat: 6.9328, lon: 79.9840 },
  { name: 'Kalutara', lat: 6.5854, lon: 79.9607 },
  { name: 'Kandy', lat: 7.2906, lon: 80.6337 },
  { name: 'Kattankudy', lat: 7.6894, lon: 81.7226 },
  { name: 'Kegalle', lat: 7.2513, lon: 80.3464 },
  { name: 'Kilinochchi', lat: 9.3803, lon: 80.3982 },
  { name: 'Kuliyapitiya', lat: 7.4688, lon: 80.0401 },
  { name: 'Kurunegala', lat: 7.4818, lon: 80.3609 },
  { name: 'Mannar', lat: 8.9810, lon: 79.9044 },
  { name: 'Matale', lat: 7.4675, lon: 80.6234 },
  { name: 'Matara', lat: 5.9549, lon: 80.5550 },
  { name: 'Mawanella', lat: 7.2562, lon: 80.4431 },
  { name: 'Monaragala', lat: 6.8728, lon: 81.3507 },
  { name: 'Moratuwa', lat: 6.7730, lon: 79.8816 },
  { name: 'Mullaitivu', lat: 9.2671, lon: 80.8142 },
  { name: 'Nawalapitiya', lat: 7.0543, lon: 80.5330 },
  { name: 'Negombo', lat: 7.2008, lon: 79.8737 },
  { name: 'Nuwara Eliya', lat: 6.9497, lon: 80.7839 },
  { name: 'Panadura', lat: 6.7136, lon: 79.9071 },
  { name: 'Point Pedro', lat: 9.8167, lon: 80.2333 },
  { name: 'Polonnaruwa', lat: 7.9403, lon: 81.0018 },
  { name: 'Puttalam', lat: 8.0362, lon: 79.8283 },
  { name: 'Ratnapura', lat: 6.6828, lon: 80.3992 },
  { name: 'Sigiriya', lat: 7.9570, lon: 80.7603 },
  { name: 'Tangalle', lat: 6.0245, lon: 80.7937 },
  { name: 'Tissamaharama', lat: 6.2796, lon: 81.2882 },
  { name: 'Trincomalee', lat: 8.5811, lon: 81.2330 },
  { name: 'Vavuniya', lat: 8.7542, lon: 80.4982 },
  { name: 'Weligama', lat: 5.9737, lon: 80.4286 }
];

const SmartWeather = () => {
  const { t, i18n } = useTranslation();
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [locationName, setLocationName] = useState('');

  const fetchWeather = async (lat, lon, locName = 'Current Location') => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=auto`);
      if (!res.ok) throw new Error('Weather data unavailable');
      const data = await res.json();
      
      const current = data.current_weather;
      // Get current hour index roughly
      const hourIndex = new Date().getHours();
      const humidity = data.hourly.relativehumidity_2m[hourIndex];
      const rainChance = data.hourly.precipitation_probability[hourIndex];

      setWeatherData({
        temp: current.temperature,
        windSpeed: current.windspeed,
        humidity: humidity,
        rainChance: rainChance,
        code: current.weathercode
      });

      const forecast = data.daily.time.map((time, i) => ({
        date: time,
        maxTemp: data.daily.temperature_2m_max[i],
        minTemp: data.daily.temperature_2m_min[i],
        rain: data.daily.precipitation_probability_max[i],
        code: data.daily.weathercode[i]
      })).slice(1, 8); // Next 7 days

      setForecastData(forecast);
      setLocationName(locName);
    } catch (err) {
      console.error(err);
      setError('Failed to load weather data.');
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude, 'Your Location');
        },
        (err) => {
          console.warn("Geolocation denied or failed. Defaulting to Colombo.", err);
          fetchWeather(PREDEFINED_CITIES[0].lat, PREDEFINED_CITIES[0].lon, PREDEFINED_CITIES[0].name);
        }
      );
    } else {
      fetchWeather(PREDEFINED_CITIES[0].lat, PREDEFINED_CITIES[0].lon, PREDEFINED_CITIES[0].name);
    }
  };

  useEffect(() => {
    getUserLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCityChange = (e) => {
    const city = PREDEFINED_CITIES.find(c => c.name === e.target.value);
    if (city) {
      fetchWeather(city.lat, city.lon, city.name);
    }
  };

  const getAIRecommendation = () => {
    if (!weatherData) return null;
    const { temp, rainChance, humidity, windSpeed } = weatherData;
    
    // Logic for AI recommendation
    let msg = "";
    let alertType = "info"; // info, warning, danger
    let farmingAlert = "";
    
    if (temp > 32) {
      msg = i18n.language === 'ta' ? "கடுமையான வெப்பம்! செடிகளுக்கு அதிகாலையில் தண்ணீர் ஊற்றவும்." : 
            i18n.language === 'si' ? "අධික උෂ්ණත්වය! උදෑසන ශාක වලට ජලය සපයන්න." : 
            "High heat detected. Water your plants early morning.";
      farmingAlert = "Irrigate crops early to prevent evaporation loss.";
      alertType = "warning";
    } else if (rainChance > 60) {
      msg = i18n.language === 'ta' ? "இன்று மழைக்கு வாய்ப்புள்ளது. அதிக தண்ணீர் ஊற்றுவதைத் தவிர்க்கவும்." :
            i18n.language === 'si' ? "අද වැසි අපේක්ෂා කෙරේ. අධික ලෙස ජලය යෙදීමෙන් වළකින්න." :
            "Rain expected today. Avoid overwatering.";
      farmingAlert = "Heavy rain expected — avoid fertilizer application.";
      alertType = "info";
    } else if (humidity > 80) {
      msg = i18n.language === 'ta' ? "அதிக ஈரப்பதம் பூஞ்சை நோய்களை உருவாக்கலாம். செடிகளை கவனிக்கவும்." :
            i18n.language === 'si' ? "අධික ආර්ද්‍රතාවය දිලීර රෝග ඇති කළ හැකිය. ශාක පරීක්ෂා කරන්න." :
            "High humidity may increase fungal disease risk.";
      farmingAlert = "Monitor for fungal growth on leaves.";
      alertType = "warning";
    } else if (windSpeed > 25) {
      msg = i18n.language === 'ta' ? "பலத்த காற்று வீசும். சிறிய செடிகளை பாதுகாக்கவும்." :
            i18n.language === 'si' ? "දැඩි සුළං පවතී. කුඩා ශාක ආරක්ෂා කරන්න." :
            "Strong winds expected. Protect young indoor and outdoor plants.";
      farmingAlert = "Strong winds expected — protect young plants and greenhouses.";
      alertType = "danger";
    } else {
      msg = i18n.language === 'ta' ? "அருமையான வானிலை! உங்கள் செடிகள் பாதுகாப்பாக உள்ளன." :
            i18n.language === 'si' ? "කාලගුණය යහපත්ය! ඔබේ ශාක ආරක්ෂිතයි." :
            "Perfect weather conditions for most plants today.";
      farmingAlert = "Good conditions for routine maintenance.";
      alertType = "info";
    }

    return { msg, farmingAlert, alertType };
  };

  const renderWeatherIcon = (code) => {
    // Basic WMO weather code mapping to emoji
    if (code === 0) return '☀️';
    if (code > 0 && code <= 3) return '⛅';
    if (code >= 45 && code <= 48) return '🌫️';
    if (code >= 51 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 77) return '❄️';
    if (code >= 80 && code <= 82) return '🌦️';
    if (code >= 95) return '⛈️';
    return '🌤️';
  };

  const aiRec = getAIRecommendation();

  return (
    <div style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: '-50%', right: '-20%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }}></div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t('weather.title', 'Smart Plant Weather Intelligence')}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>{t('weather.subtitle', 'Real-time weather insights and AI-powered plant care recommendations.')}</p>
        </div>
        
        <select 
          onChange={handleCityChange} 
          style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem', cursor: 'pointer', outline: 'none' }}
        >
          <option value="">🌍 {locationName || t('weather.locating')}</option>
          {PREDEFINED_CITIES.map(c => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <div className="spinner" style={{ fontSize: '3rem', animation: 'spin 2s linear infinite' }}>⏳</div>
        </div>
      ) : error ? (
        <div style={{ color: 'var(--danger)', textAlign: 'center', padding: '2rem' }}>⚠️ {error}</div>
      ) : weatherData && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', position: 'relative', zIndex: 1 }}>
          
          {/* Current Weather Card */}
          <div style={{ background: 'linear-gradient(135deg, var(--emerald-600) 0%, var(--emerald-400) 100%)', borderRadius: '20px', padding: '2rem', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '0.5rem' }}>{locationName}</div>
                <div style={{ fontSize: '4rem', fontWeight: '800', lineHeight: 1 }}>{Math.round(weatherData.temp)}°C</div>
              </div>
              <div style={{ fontSize: '4rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' }}>
                {renderWeatherIcon(weatherData.code)}
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '2rem', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{t('weather.humidity', 'Humidity')}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{weatherData.humidity}%</div>
              </div>
              <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.2)', borderRight: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{t('weather.rain', 'Rain')}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{weatherData.rainChance}%</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{t('weather.wind', 'Wind')}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{weatherData.windSpeed} km/h</div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '16px', borderLeft: `4px solid ${aiRec.alertType === 'danger' ? 'var(--danger)' : aiRec.alertType === 'warning' ? 'var(--warning)' : 'var(--emerald-500)'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                🤖 {t('weather.ai_alert', 'Plant AI Alert')}
              </div>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>{aiRec.msg}</p>
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#d97706', fontWeight: 'bold' }}>
                🌾 {t('weather.farming', 'Farming Advisory')}
              </div>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{aiRec.farmingAlert}</p>
            </div>
          </div>

          {/* 7 Day Forecast */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>📅 {t('weather.forecast', '7-Day Forecast')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '250px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {forecastData.map((day, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '500', width: '80px' }}>
                    {new Date(day.date).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'ta-IN', { weekday: 'short' })}
                  </span>
                  <span style={{ fontSize: '1.5rem' }}>{renderWeatherIcon(day.code)}</span>
                  <span style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 'bold', width: '90px', justifyContent: 'flex-end' }}>
                    <span>{Math.round(day.maxTemp)}°</span>
                    <span style={{ color: 'var(--text-tertiary)' }}>{Math.round(day.minTemp)}°</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default SmartWeather;
