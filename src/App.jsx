import { useState } from 'react'
import './App.css'
import CharacterList from './components/CharacterList'
import FilterButtons from './components/FilterButtons'
import RandomCharacterPicker from './components/RandomCharacterPicker'
import { characters as initialCharacters } from './data/characters'

function App() {
  const [possibleCharacters, setPossibleCharacters] = useState(initialCharacters)
  const [notPossibleCharacters, setNotPossibleCharacters] = useState([])
  const [pickerResetSignal, setPickerResetSignal] = useState(0);
  const [score, setScore] = useState({ me: 0, opponent: 0 });

  const handleMoveCharacter = (characterId) => {
    const character = possibleCharacters.find(c => c.id === characterId)
    if (character) {
      setPossibleCharacters(prev => prev.filter(c => c.id !== characterId))
      setNotPossibleCharacters(prev => [...prev, character])
    } else {
      const character = notPossibleCharacters.find(c => c.id === characterId)
      setNotPossibleCharacters(prev => prev.filter(c => c.id !== characterId))
      setPossibleCharacters(prev => [...prev, character])
    }
  }

  const handleFilter = (type, value) => {
    let charactersToMove = possibleCharacters.filter(char => char[type] === value);

    // For element filters (except Cryo), also remove Aether and Lumine
    if (type === 'element' && value !== 'Cryo') {
      const travelerNames = ['Aether', 'Lumine'];
      const travelersToMove = possibleCharacters.filter(char => travelerNames.includes(char.name));
      // Avoid double-adding
      charactersToMove = [...new Set([...charactersToMove, ...travelersToMove])];
    }

    setPossibleCharacters(prev => prev.filter(char => !charactersToMove.includes(char)))
    setNotPossibleCharacters(prev => [...prev, ...charactersToMove])
  }

  return (
    <div className="app">
      <h1>Genshin Impact Guess Me Helper</h1>
      
      <div className="game-container">
        <div className="control-column">
          <div className="scoreboard" style={{ width: '100%' }}>
            <button
              className="score-btn"
              onClick={() => setScore(s => ({ ...s, me: s.me + 1 }))}
            >
              Me
            </button>
            <span className="score-value">{score.me} : {score.opponent}</span>
            <button
              className="score-btn"
              onClick={() => setScore(s => ({ ...s, opponent: s.opponent + 1 }))}
            >
              Opponent
            </button>
          </div>
          <button
            className="reset-score-btn"
            style={{ width: '100%', marginBottom: '0.75rem', background: '#06d6a0', color: 'white', border: 'none', borderRadius: '5px', padding: '0.5rem 0', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s' }}
            onClick={() => setScore({ me: 0, opponent: 0 })}
          >
            🔄 Reset Scoreboard
          </button>
          <button
            className="reset-app-btn"
            style={{ width: '100%', marginBottom: '0.75rem', background: '#ef476f', color: 'white', border: 'none', borderRadius: '5px', padding: '0.5rem 0', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s' }}
            onClick={() => {
              setPossibleCharacters(initialCharacters);
              setNotPossibleCharacters([]);
              setPickerResetSignal(prev => prev + 1);
            }}
          >
            🔄 Reset App
          </button>
          <RandomCharacterPicker possibleCharacters={possibleCharacters} resetSignal={pickerResetSignal} />
          <FilterButtons onFilter={handleFilter} />
        </div>
        <div className="lists-container">
          <CharacterList 
            characters={possibleCharacters}
            onMoveCharacter={handleMoveCharacter}
            listType="possible"
          />
          
          <CharacterList 
            characters={notPossibleCharacters}
            onMoveCharacter={handleMoveCharacter}
            listType="not-possible"
          />
        </div>
      </div>
    </div>
  )
}

export default App
