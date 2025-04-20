import React, { useState } from 'react';

const CharacterList = ({ characters, onMoveCharacter, listType }) => {
  // Track failed image loads
  const [failedImages, setFailedImages] = useState({});
  
  // Handle image load errors
  const handleImageError = (characterId) => {
    setFailedImages(prev => ({
      ...prev,
      [characterId]: true
    }));
  };
  
  // Function to get character initials for fallback
  const getInitials = (name) => {
    if (!name) return '';
    // Handle names with spaces (like "Arataki Itto")
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  return (
    <div className={`character-list ${listType}`}>
      <h2>{listType === 'possible' ? 'Possible Characters' : 'Not Possible Characters'}</h2>
      <div className="characters-grid">
        {characters.map((character) => (
          <div key={character.id} className="character-card">
            <div className="character-portrait-container">
              {character.portrait && !failedImages[character.id] ? (
                <img 
                  src={character.portrait} 
                  alt={character.name + ' portrait'} 
                  className="character-portrait"
                  onError={() => handleImageError(character.id)} 
                  loading="lazy"
                />
              ) : (
                <div className="character-portrait-fallback">
                  <span>{getInitials(character.name)}</span>
                </div>
              )}
            </div>
            <h3>{character.name}</h3>
            <div className="character-info-hover">
              <div className="character-info-content">
                <p>Element: {character.element}</p>
                <p>Weapon: {character.weapon}</p>
                <p>Region: {character.region}</p>
                <p>Body-Type: {character.model === 'small' ? 'Small' : character.model === 'medium' ? 'Medium' : character.model === 'tall' ? 'Tall' : character.model}</p>
                <p>Sex: {character.sex}</p>
              </div>
            </div>
            <button className="character-move-btn" onClick={() => onMoveCharacter(character.id)}>
              {listType === 'possible' ? '✗' : '⟲'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
