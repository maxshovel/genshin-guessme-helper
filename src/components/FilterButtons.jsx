import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { elements, weapons, regions } from '../data/characters';
import './FilterButtons.css';

const FilterButtons = ({ onFilter, activeFilters = {} }) => {
  // Memoize filter handlers for each type
  const createFilterHandler = useCallback((type, value, include) => {
    return () => onFilter(type, value, include);
  }, [onFilter]);

  // Helper to check if a button is active
  const isActive = (type, value, include) => {
    return activeFilters[type] && activeFilters[type][value] === include;
  };

  return (
    <div className="filter-buttons">
      <div className="filter-section">
        <h3>Filter by Element</h3>
        {elements.filter(element => element !== 'None').map((element) => (
          <div key={element} className="filter-button-group">
            <span className="filter-label">{`${element} User?`}</span>
            <div className="yes-no-buttons">
              <button
                onClick={createFilterHandler('element', element, true)}
                aria-label={`Include only ${element} element`}
                className={`yes-button${isActive('element', element, true) ? ' active' : ''}`}
              >
                Yes
              </button>
              <button
                onClick={createFilterHandler('element', element, false)}
                aria-label={`Exclude ${element} element`}
                className={`no-button${isActive('element', element, false) ? ' active' : ''}`}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h3>Filter by Weapon</h3>
        {weapons.map((weapon) => (
          <div key={weapon} className="filter-button-group">
            <span className="filter-label">{weapon} User?</span>
            <div className="yes-no-buttons">
              <button
                onClick={createFilterHandler('weapon', weapon, true)}
                aria-label={`Include only ${weapon} weapon users`}
                className={`yes-button${isActive('weapon', weapon, true) ? ' active' : ''}`}
              >
                Yes
              </button>
              <button
                onClick={createFilterHandler('weapon', weapon, false)}
                aria-label={`Exclude ${weapon} weapon users`}
                className={`no-button${isActive('weapon', weapon, false) ? ' active' : ''}`}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h3>Filter by Region</h3>
        {regions.map((region) => (
          <div key={region} className="filter-button-group">
            <span className="filter-label">From {region}?</span>
            <div className="yes-no-buttons">
              <button
                onClick={createFilterHandler('region', region, true)}
                aria-label={`Include only ${region} region`}
                className={`yes-button${isActive('region', region, true) ? ' active' : ''}`}
              >
                Yes
              </button>
              <button
                onClick={createFilterHandler('region', region, false)}
                aria-label={`Exclude ${region} region`}
                className={`no-button${isActive('region', region, false) ? ' active' : ''}`}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h3>Filter by Body-Type</h3>
        {['small', 'medium', 'tall'].map((model) => (
          <div key={model} className="filter-button-group">
            <span className="filter-label">
              Is {model.charAt(0).toUpperCase() + model.slice(1)}?
            </span>
            <div className="yes-no-buttons">
              <button
                onClick={createFilterHandler('model', model, true)}
                aria-label={`Include only ${model.charAt(0).toUpperCase() + model.slice(1)} body type`}
                className={`yes-button${isActive('model', model, true) ? ' active' : ''}`}
              >
                Yes
              </button>
              <button
                onClick={createFilterHandler('model', model, false)}
                aria-label={`Exclude ${model.charAt(0).toUpperCase() + model.slice(1)} body type`}
                className={`no-button${isActive('model', model, false) ? ' active' : ''}`}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// PropTypes validation for component props
FilterButtons.propTypes = {
  onFilter: PropTypes.func.isRequired
};

// Export memoized component to prevent unnecessary re-renders
export default React.memo(FilterButtons);
