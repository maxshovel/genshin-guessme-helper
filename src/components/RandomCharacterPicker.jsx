import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import CharacterPortrait from './CharacterPortrait';

const RandomCharacterPicker = ({ possibleCharacters, resetSignal }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
  }, [resetSignal]);

  // Memoize the handler to avoid unnecessary recreations
  const handlePick = useCallback(() => {
    if (possibleCharacters.length === 0) return;
    const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
    setSelected(possibleCharacters[randomIndex]);
  }, [possibleCharacters]);



  return (
    <div className="random-character-picker-col">
      <div className="random-character-picker">
        <button onClick={handlePick} className="random-pick-btn">
          🎲 Pick Random Character
        </button>
      </div>
      {selected && (
        <div className="character-card random-character-card">
          <CharacterPortrait character={selected} size="large" />
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

// PropTypes validation for component props
RandomCharacterPicker.propTypes = {
  possibleCharacters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      portrait: PropTypes.string,
      element: PropTypes.string.isRequired,
      weapon: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired
    })
  ).isRequired,
  resetSignal: PropTypes.number.isRequired
};

// Export memoized component to prevent unnecessary re-renders
export default React.memo(RandomCharacterPicker);
