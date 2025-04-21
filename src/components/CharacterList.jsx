import React from 'react';
import PropTypes from 'prop-types';
import CharacterPortrait from './CharacterPortrait';
import './CharacterListCompact.css';

const CharacterList = ({ characters, onMoveCharacter, listType }) => {
  if (listType === 'not-possible') {
    return (
      <div className={`character-list ${listType}`}>
        <h2>Not Possible Characters</h2>
        <div className="not-possible-list-compact">
          {characters.map((character) => (
            <div key={character.id} className="not-possible-item">
              <span className="not-possible-item-name">
                {character.name}
              </span>
              <button className="not-possible-item-redo" onClick={() => onMoveCharacter(character.id)} title="Redo">
                ⟲
              </button>
              <div className="character-info-hover">
                <div className="character-info-content">
                  <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                    <CharacterPortrait character={character} size="small" />
                    <span style={{fontWeight: 'bold', marginLeft: '0.75rem', color: '#ffd166'}}>{character.name}</span>
                  </div>
                  <p>Element: {character.element}</p>
                  <p>Weapon: {character.weapon}</p>
                  <p>Region: {character.region}</p>
                  <p>Body-Type: {character.model === 'small' ? 'Small' : character.model === 'medium' ? 'Medium' : character.model === 'tall' ? 'Tall' : character.model}</p>
                  <p>Sex: {character.sex}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default: possible characters (full card)
  return (
    <div className={`character-list ${listType}`}>
      <h2>Possible Characters</h2>
      <div className="characters-grid">
        {characters.map((character) => (
          <div key={character.id} className="character-card">
            <CharacterPortrait character={character} />
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
              ✗
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// PropTypes validation for component props
CharacterList.propTypes = {
  characters: PropTypes.arrayOf(
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
  onMoveCharacter: PropTypes.func.isRequired,
  listType: PropTypes.oneOf(['possible', 'not-possible']).isRequired
};

// Export memoized component to prevent unnecessary re-renders
export default React.memo(CharacterList);
