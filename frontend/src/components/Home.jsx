import React, { useEffect, useState } from 'react';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import GalaxyBackground from './GalaxyBackground';
import { useAuth } from '../context/AuthContext';

const API_URL = '/api/characters/';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    setLoading(true);
    setError('');
    api
      .get(API_URL)
      .then((res) => {
        setCharacters(res.data);
        setError('');
      })
      .catch((err) => {
        console.error('API error details:', {
          message: err.message,
          code: err.code,
          config: err.config,
          response: err.response,
          request: err.request,
        });
        if (err.response) {
          setError(
            `Failed to load characters (status ${err.response.status}). Please try again.`
          );
        } else if (err.request) {
          setError(
            'No response from server. Please check your backend and network connection.'
          );
        } else {
          setError('Failed to load characters. Please try again.');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center py-8 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <GalaxyBackground />
      {/* Optional dreamy overlay */}
      <div className="absolute inset-0 -z-5 bg-gradient-to-b from-blue-900/60 to-black/80 pointer-events-none" />
      
      {/* Auth buttons */}
      <div className="absolute top-4 right-4 z-20">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-cyan-200">Welcome, {user?.username}!</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200 hover:bg-red-500/30 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-lg text-cyan-200 hover:bg-cyan-500/30 transition-colors duration-200"
          >
            Login
          </button>
        )}
      </div>
      
      <h1 className="text-3xl font-bold mb-6 relative z-10 text-cyan-300">Choose Your AI Character</h1>
      {loading && (
        <div className="text-lg text-gray-500 mt-8 relative z-10">Loading characters...</div>
      )}
      {error && characters.length === 0 && !loading && (
        <div className="relative z-10">
          <div className="text-red-500 font-semibold mt-8">{error}</div>
          <div className="mt-8 text-sm text-gray-400 max-w-xl text-center">
            <strong>Debug instructions:</strong><br />
            1. Make sure Django is running at <code>http://127.0.0.1:8000/api/characters/</code>.<br />
            2. Test <code>{API_URL}</code> in your browser or with <code>curl</code>.<br />
            3. Check the browser console for detailed error logs if loading fails.<br />
            4. Ensure the URL in this file matches your backend exactly (host, port, protocol).
          </div>
        </div>
      )}
      {!loading && !error && characters.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl px-4 relative z-10">
          {characters.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              onClick={() => navigate(`/chat/${char.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home; 