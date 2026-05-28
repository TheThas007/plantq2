import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CameraScanner = () => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const startCamera = async () => {
    setErrorMsg('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API is not supported in this browser. Please ensure you are using HTTPS or localhost.");
      }

      // First try to get the back camera
      let mediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: { exact: "environment" } } 
        });
      } catch (err) {
        // If back camera is not available (e.g. laptop), just get any camera
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: true
        });
      }
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setErrorMsg("Camera access denied or not available. " + err.message);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageData);
      stopCamera();
      analyzePlant(imageData);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setErrorMsg('');
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target.result);
        analyzePlant(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePlant = async (base64Image) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setErrorMsg('');

    try {
      const apiKey = import.meta.env.VITE_PLANTNET_API_KEY || "2b10dVs2E5528ep54GeAw5Wvh";
      if (!apiKey) throw new Error("API key is missing in .env");

      // Convert Base64 to Blob
      const response = await fetch(base64Image);
      const blob = await response.blob();

      // Pl@ntNet API expects multipart/form-data
      const formData = new FormData();
      formData.append('images', blob, 'plant.jpg');
      formData.append('organs', 'auto'); 

      // Use proxy to avoid CORS issues
      const url = `/api/plantnet/v2/identify/all?include-related-images=false&no-reject=false&lang=en&api-key=${apiKey}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 sec timeout

      const apiRes = await fetch(url, {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!apiRes.ok) {
        const errText = await apiRes.text();
        throw new Error(`API Error (${apiRes.status}): ${errText}`);
      }

      const data = await apiRes.json();
      
      if (data.results && data.results.length > 0) {
        const bestMatch = data.results[0];
        const probability = Math.round(bestMatch.score * 100);
        const speciesName = bestMatch.species.scientificNameWithoutAuthor || bestMatch.species.scientificName;
        const commonNames = bestMatch.species.commonNames ? bestMatch.species.commonNames.join(', ') : 'Unknown';

        // Mocking Care data based on species
        let isHealthy = probability > 50;
        let healthScore = isHealthy ? Math.min(100, probability + 10) : probability;

        setAnalysisResult({
          diseaseName: speciesName,
          confidence: `${probability}%`,
          healthScore: healthScore,
          tips: [
            `${t('scanner.watering', 'Watering')}: Adjust watering schedules.`,
            `${t('scanner.sunlight', 'Sunlight')}: Provide adequate sunlight.`,
            `${t('scanner.treatment', 'Treatment')}: Monitor for pests or fungal issues.`
          ],
          commonName: commonNames
        });
      } else {
        throw new Error("No plant detected in the image.");
      }

    } catch (error) {
      console.error(error);
      setErrorMsg(error.name === 'AbortError' ? "Request timed out." : error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetScanner = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setErrorMsg('');
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="scanner-container">
      {!stream && !capturedImage && (
        <div className="scanner-upload">
          <div className="upload-icon">📸</div>
          <h3>{t('scanner.btn.upload', 'Upload Plant Image')}</h3>
          <p>or take a photo</p>
          <div className="scanner-actions">
            <button className="btn-primary" onClick={startCamera}>
              {t('scanner.btn.camera', 'Open Camera')}
            </button>
            <label className="btn-secondary">
              {t('scanner.btn.upload', 'Upload Image')}
              <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>
        </div>
      )}

      {stream && !capturedImage && (
        <div className="camera-view">
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: '12px' }} />
          <div className="camera-controls" style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={captureImage}>Capture</button>
            <button className="btn-secondary" onClick={stopCamera}>Cancel</button>
          </div>
        </div>
      )}

      {capturedImage && (
        <div className="analysis-view" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="image-preview">
            <img src={capturedImage} alt="Captured Plant" style={{ width: '100%', borderRadius: '16px', border: '2px solid var(--border-color)' }} />
            <button className="btn-secondary" onClick={resetScanner} style={{ width: '100%', marginTop: '1rem' }}>Scan Another Plant</button>
          </div>

          <div className="analysis-details">
            {isAnalyzing && (
              <div className="loading-state" style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div className="spinner" style={{ fontSize: '3rem', animation: 'spin 2s linear infinite' }}>⚙️</div>
                <h3 style={{ marginTop: '1rem' }}>{t('scanner.analyzing', 'Analyzing with AI...')}</h3>
                <p>Running multi-layer neural networks...</p>
              </div>
            )}

            {errorMsg && (
              <div style={{ color: 'var(--danger)', padding: '1rem', background: '#fee2e2', borderRadius: '8px' }}>
                <p>⚠️ {errorMsg}</p>
              </div>
            )}

            {analysisResult && (
              <div className="result-card" style={{ animation: 'fadeInUp 0.5s ease' }}>
                <h3>{t('scanner.results', 'Analysis Results')}</h3>
                <div className="result-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', marginTop: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t('scanner.disease', 'Disease')} / Species</span>
                    <h4 style={{ fontSize: '1.3rem', color: 'var(--primary-color)' }}>{analysisResult.diseaseName}</h4>
                    {analysisResult.commonName && <p style={{ fontSize: '0.85rem', color: '#64748b' }}>({analysisResult.commonName})</p>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t('scanner.confidence', 'Confidence')}</span>
                    <h4 style={{ fontSize: '1.5rem', color: 'var(--emerald-500)' }}>{analysisResult.confidence}</h4>
                  </div>
                </div>

                <div className="care-plan" style={{ padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                  <h4 style={{ marginBottom: '1rem' }}>📋 {t('scanner.care', 'Smart Care Plan')}</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {analysisResult.tips.map((tip, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--emerald-500)' }}>✓</span>
                        <span style={{ fontSize: '0.95rem' }}>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraScanner;
