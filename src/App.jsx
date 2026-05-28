import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { getUserProfile } from './services/auth';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Market from './pages/Market';
import About from './pages/About';
import PlantProfiles from './pages/PlantProfiles';
import Community from './pages/Community';
import Experts from './pages/Experts';
import AdminPanel from './pages/AdminPanel';
import LearningCenter from './pages/LearningCenter';
import ArticleView from './pages/ArticleView';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch user profile from Firestore to get additional data
        try {
          const profile = await getUserProfile(currentUser.uid);
          setUser({ ...currentUser, ...profile });
        } catch(e) {
           setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>; // Could replace with a better spinner
  }

  // ProtectedRoute helper component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/register" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        {/* Public Routes for Authentication */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        
        {/* Protected Routes (Require Login) */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/market" element={<ProtectedRoute><Market /></ProtectedRoute>} />
        <Route path="/profiles" element={<ProtectedRoute><PlantProfiles /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path="/experts" element={<ProtectedRoute><Experts /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard user={user} /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/learning" element={<ProtectedRoute><LearningCenter /></ProtectedRoute>} />
        <Route path="/learning/:id" element={<ProtectedRoute><ArticleView /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
