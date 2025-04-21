import { useState, useCallback } from 'react'
import './App.css'
import CharacterList from './components/CharacterList'
import FilterButtons from './components/FilterButtons'
import RandomCharacterPicker from './components/RandomCharacterPicker'
import { characters as initialCharacters } from './data/characters'
import { getCharactersToFilter } from './utils/helpers'

function App() {
  const [possibleCharacters, setPossibleCharacters] = useState(initialCharacters)
  const [notPossibleCharacters, setNotPossibleCharacters] = useState([])
  const [pickerResetSignal, setPickerResetSignal] = useState(0);
  const [score, setScore] = useState({ me: 0, opponent: 0 });
  // Track which filters are active: { [type]: { [value]: true/false } }
  const [activeFilters, setActiveFilters] = useState({});

  // Memoized handler to prevent recreation on each render
  const handleMoveCharacter = useCallback((characterId) => {
    const character = possibleCharacters.find(c => c.id === characterId)
    if (character) {
      setPossibleCharacters(prev => prev.filter(c => c.id !== characterId))
      setNotPossibleCharacters(prev => [...prev, character])
    } else {
      const character = notPossibleCharacters.find(c => c.id === characterId)
      setNotPossibleCharacters(prev => prev.filter(c => c.id !== characterId))
      setPossibleCharacters(prev => [...prev, character])
    }
  }, [possibleCharacters, notPossibleCharacters]);

  // Memoized filter handler using the utility function with include/exclude support
  const handleFilter = useCallback((type, value, include) => {
    const { charactersToKeep, charactersToMove } = getCharactersToFilter(type, value, possibleCharacters, include);

    // Update filter state
    setActiveFilters(prev => ({
      ...prev,
      [type]: {
        ...(prev[type] || {}),
        [value]: include
      }
    }));

    setPossibleCharacters(charactersToKeep);
    setNotPossibleCharacters(prev => [...prev, ...charactersToMove]);
  }, [possibleCharacters]);

  return (
    <>
      <div className="app">
        <h1>Genshin Impact Guess Who</h1>
        <div className="game-container">
          <div className="control-column">
            <div className="scoreboard">
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
              onClick={() => setScore({ me: 0, opponent: 0 })}
            >
              🔄 Reset Scoreboard
            </button>
            <button
              className="reset-app-btn"
              onClick={() => {
                setPossibleCharacters(initialCharacters);
                setNotPossibleCharacters([]);
                setPickerResetSignal(prev => prev + 1);
                setActiveFilters({}); // Reset pressed filter buttons
              }}
            >
              🔄 Reset App
            </button>
            <RandomCharacterPicker possibleCharacters={possibleCharacters} resetSignal={pickerResetSignal} />
            <FilterButtons onFilter={handleFilter} activeFilters={activeFilters} />
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
      <footer className="app-footer">
        <hr className="footer-divider" />
        <div className="footer-content">
          <span>
            <sup>[1]</sup> Genshin Impact, its characters, and assets are the intellectual property of HoYoverse (miHoYo). This project is a fan-made tool and is not affiliated with, endorsed, sponsored, or specifically approved by HoYoverse. All Genshin Impact content referenced herein belongs to its respective owner. Please support the official game!
          </span>
          <br />
          <span>
            <sup>[2]</sup> Project source code: <a href="https://github.com/maxshovel/genshin-guessme-helper" target="_blank" rel="noopener noreferrer">https://github.com/maxshovel/genshin-guessme-helper</a>
          </span>
        </div>
      </footer>
    </>
  )
}

export default App
