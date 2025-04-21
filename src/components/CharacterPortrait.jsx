import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { getInitials } from '../utils/helpers';
import './CharacterPortrait.css';

/**
 * Character portrait component with fallback handling
 * 
 * Features:
 * - Loads local portrait images
 * - Graceful fallback to initials when image not available
 * - Lazy loading for performance
 * - Optimized with memo to prevent unnecessary re-renders
 */
const CharacterPortrait = ({ character, size = 'medium', className = '' }) => {
  const [imageError, setImageError] = useState(false);
  
  // Handle image loading error
  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // Size classes to control the portrait dimensions
  const sizeClasses = {
    small: 'character-portrait-small',
    medium: 'character-portrait-medium',
    large: 'character-portrait-large'
  };

  // Determine the appropriate CSS classes
  const containerClasses = `character-portrait-container ${sizeClasses[size] || 'character-portrait-medium'} ${className}`;

  // Only try to load the image if we have a portrait URL and haven't encountered an error
  const shouldShowImage = character.portrait && !imageError;

  return (
    <div className={containerClasses}>
      {shouldShowImage ? (
        <img 
          src={character.portrait} 
          alt={`${character.name} portrait`} 
          className="character-portrait"
          onError={handleImageError}
          loading="lazy"
          draggable="false"
        />
      ) : (
        <div className="character-portrait-fallback">
          <span>{getInitials(character.name)}</span>
        </div>
      )}
    </div>
  );
};

// PropTypes validation
CharacterPortrait.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    portrait: PropTypes.string
  }).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string
};

// Export memoized component to prevent unnecessary rerenders
export default memo(CharacterPortrait);
