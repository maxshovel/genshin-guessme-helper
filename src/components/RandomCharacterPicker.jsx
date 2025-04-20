import React, { useState, useEffect } from 'react';

const RandomCharacterPicker = ({ possibleCharacters, resetSignal }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
  }, [resetSignal]);

  const handlePick = () => {
    if (possibleCharacters.length === 0) return;
    const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
    setSelected(possibleCharacters[randomIndex]);
  };

  // Helper for initials fallback
  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(part => part.charAt(0)).join('').toUpperCase();
  };

  return (
    <div className="random-character-picker-col">
      <div className="random-character-picker">
        <button onClick={handlePick} className="random-pick-btn">
          🎲 Pick Random Character
        </button>
      </div>
      {selected && (
        <div className="character-card random-character-card">
          <div className="character-portrait-container">
            {selected.portrait ? (
              <img 
                src={selected.portrait} 
                alt={selected.name + ' portrait'} 
                className="character-portrait"
                loading="lazy"
              />
            ) : (
              <div className="character-portrait-fallback">
                <span>{getInitials(selected.name)}</span>
              </div>
            )}
          </div>
          <h3>{selected.name}</h3>
          <div className="character-info-hover always-show">
            <div className="character-info-content">
              <p>Element: {selected.element}</p>
              <p>Weapon: {selected.weapon}</p>
              <p>Region: {selected.region}</p>
              <p>Body-Type: {selected.model === 'small' ? 'Small' : selected.model === 'medium' ? 'Medium' : selected.model === 'tall' ? 'Tall' : selected.model}</p>
              <p>Sex: {selected.sex}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomCharacterPicker;
