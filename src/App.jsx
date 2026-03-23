import React, { useState } from 'react';
import Review3DScene from './components/Review3DScene';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{
        position: 'absolute',
        top: 40,
        left: 0,
        width: '100%',
        textAlign: 'center',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 700, 
          letterSpacing: '-0.02em',
          background: 'linear-gradient(90deg, #fff, #a5b4fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '10px'
        }}>
          Отзывы о платформе Stellas Deutsch
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
          Drag to explore &bull; Click card to read more
        </p>
      </div>
      
      <Review3DScene />
    </div>
  );
}

export default App;
