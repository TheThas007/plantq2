import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase/firebase';
import { getCommunityPosts, createCommunityPost } from '../services/firestore';

const Community = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const fetchPosts = async () => {
    try {
      const data = await getCommunityPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("You must be logged in to post!");
      return;
    }
    try {
      const userName = auth.currentUser.displayName || auth.currentUser.email.split('@')[0];
      await createCommunityPost(auth.currentUser.uid, userName, newTitle, newContent);
      setNewTitle('');
      setNewContent('');
      setShowModal(false);
      fetchPosts(); // Refresh list
    } catch (err) {
      alert("Error creating post: " + err.message);
    }
  };

  return (
    <section className="section" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="section-label">💬 {t('nav.community')}</div>
            <h2 className="section-title">{t('community.title')}</h2>
            <p className="section-subtitle">{t('community.subtitle')}</p>
          </div>
          <div>
            <button className="btn-primary" onClick={() => setShowModal(true)}>{t('community.btn.new')}</button>
          </div>
        </div>

        {showModal && (
          <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: 'var(--shadow-md)' }}>
            <h3>Create a New Post</h3>
            <form onSubmit={handlePostSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <input 
                type="text" 
                placeholder="Question or Title" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
                className="search-input" 
                required 
              />
              <textarea 
                placeholder="Describe your plant issue or tip..." 
                value={newContent} 
                onChange={(e) => setNewContent(e.target.value)} 
                className="search-input" 
                rows="4" 
                required 
              />
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Post</button>
              </div>
            </form>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {loading ? (
            <p>Loading posts...</p>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-color)', borderRadius: '12px' }}>
              <p>No posts yet. Be the first to ask a question!</p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>{post.title}</h3>
                <p style={{ color: 'var(--text-color)', marginBottom: '1rem', lineHeight: '1.6' }}>{post.content}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b' }}>
                  <span>👤 By {post.userName}</span>
                  <span>📅 {post.createdAt ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'Just now'}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Community;
