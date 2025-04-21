/**
 * Utility functions for the Genshin Impact Guess Me Helper app
 */

/**
 * Converts a character name to initials for fallback display
 * @param {string} name - Character name
 * @returns {string} - Uppercase initials from the name
 */
export const getInitials = (name) => {
  if (!name) return '';
  // Handle names with spaces (like "Arataki Itto")
  return name.split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
};

/**
 * Enhanced filter handler that supports both inclusion and exclusion modes
 * @param {string} type - Filter type (element, weapon, region, model)
 * @param {string} value - Filter value
 * @param {Array} characters - Array of character objects
 * @param {boolean} include - If true, keep matching characters; if false, remove matching characters
 * @returns {Object} - Object containing charactersToKeep and charactersToMove arrays
 */
export const getCharactersToFilter = (type, value, characters, include) => {
  // Find matching characters for the specified type and value
  let matchingCharacters = characters.filter(char => char[type] === value);
  
  // Special case for elements (except Cryo)
  if (type === 'element' && value !== 'Cryo') {
    const travelerNames = ['Aether', 'Lumine'];
    const matchingTravelers = characters.filter(char => travelerNames.includes(char.name));
    // Avoid double-adding
    matchingCharacters = [...new Set([...matchingCharacters, ...matchingTravelers])];
  }
  
  // Determine which characters to keep and which to move based on include flag
  let charactersToKeep, charactersToMove;
  
  if (include) {
    // "Yes" was clicked - keep only matching characters
    charactersToKeep = matchingCharacters;
    charactersToMove = characters.filter(char => !matchingCharacters.includes(char));
  } else {
    // "No" was clicked - remove matching characters
    charactersToKeep = characters.filter(char => !matchingCharacters.includes(char));
    charactersToMove = matchingCharacters;
  }
  
  return { charactersToKeep, charactersToMove };
};
