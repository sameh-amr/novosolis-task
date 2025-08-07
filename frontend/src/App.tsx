import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './common/Header';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-yellow-500">
      <div className="container mx-auto">
        <Header />
        <div className="flex items-center justify-center mt-12">
          <h1 className="text-5xl font-bold text-white text-center">✅ Tailwind is working!</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
