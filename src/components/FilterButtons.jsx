import React from 'react';
import { elements, weapons, regions } from '../data/characters';

const FilterButtons = ({ onFilter }) => {
  return (
    <div className="filter-buttons">
      <div className="filter-section">
        <h3>Filter by Element</h3>
        {elements.map((element) => (
          <button
            key={element}
            onClick={() => onFilter('element', element)}
          >
            {element === 'None' ? 'Remove Traveler' : `Remove ${element}`}
          </button>
        ))}
      </div>

      <div className="filter-section">
        <h3>Filter by Weapon</h3>
        {weapons.map((weapon) => (
          <button
            key={weapon}
            onClick={() => onFilter('weapon', weapon)}
          >
            Remove {weapon} users
          </button>
        ))}
      </div>

      <div className="filter-section">
        <h3>Filter by Region</h3>
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => onFilter('region', region)}
          >
            Remove {region} characters
          </button>
        ))}
      </div>
      <div className="filter-section">
        <h3>Filter by Body-Type</h3>
        {['small', 'medium', 'tall'].map((model) => (
          <button
            key={model}
            onClick={() => onFilter('model', model)}
          >
            Remove {model.charAt(0).toUpperCase() + model.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
