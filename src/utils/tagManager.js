// Utility for managing tags with random colors and localStorage persistence
// Following Azure best practices for error handling and secure operations

// Predefined color palette for better visual consistency
const COLOR_PALETTE = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8C471', '#82E0AA', '#F1948A', '#85929E', '#A569BD',
  '#5DADE2', '#58D68D', '#F4D03F', '#EC7063', '#AF7AC5'
];

const TAGS_STORAGE_KEY = 'task_tags';

/**
 * Get a random color from the predefined palette
 * @returns {string} Hex color code
 */
const getRandomColor = () => {
  return COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
};

/**
 * Determine if text should be light or dark based on background color
 * @param {string} hexColor - Background color in hex format
 * @returns {string} Text color (light or dark)
 */
const getTextColor = (hexColor) => {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#333333' : '#FFFFFF';
};

/**
 * Get all tags from localStorage
 * @returns {Object} Object with tag names as keys and color info as values
 */
export const getTags = () => {
  try {
    const stored = localStorage.getItem(TAGS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading tags from localStorage:', error);
    return {};
  }
};

/**
 * Get array of tag names
 * @returns {string[]} Array of tag names
 */
export const getTagNames = () => {
  return Object.keys(getTags());
};

/**
 * Add a new tag with random color
 * @param {string} tagName - Name of the tag to add
 * @returns {boolean} Success status
 */
export const addTag = (tagName) => {
  if (!tagName || typeof tagName !== 'string') {
    console.error('Invalid tag name provided');
    return false;
  }

  const trimmedTag = tagName.trim();
  if (!trimmedTag) {
    console.error('Tag name cannot be empty');
    return false;
  }

  try {
    const tags = getTags();
    
    // Don't add if tag already exists
    if (tags[trimmedTag]) {
      console.warn(`Tag "${trimmedTag}" already exists`);
      return false;
    }

    const backgroundColor = getRandomColor();
    tags[trimmedTag] = {
      backgroundColor,
      textColor: getTextColor(backgroundColor),
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(TAGS_STORAGE_KEY, JSON.stringify(tags));
    return true;
  } catch (error) {
    console.error('Error adding tag to localStorage:', error);
    return false;
  }
};

/**
 * Remove a tag
 * @param {string} tagName - Name of the tag to remove
 * @returns {boolean} Success status
 */
export const removeTag = (tagName) => {
  if (!tagName || typeof tagName !== 'string') {
    console.error('Invalid tag name provided');
    return false;
  }

  try {
    const tags = getTags();
    
    if (!tags[tagName]) {
      console.warn(`Tag "${tagName}" does not exist`);
      return false;
    }

    delete tags[tagName];
    localStorage.setItem(TAGS_STORAGE_KEY, JSON.stringify(tags));
    return true;
  } catch (error) {
    console.error('Error removing tag from localStorage:', error);
    return false;
  }
};

/**
 * Get color information for a specific tag
 * @param {string} tagName - Name of the tag
 * @returns {Object|null} Color information or null if tag doesn't exist
 */
export const getTagColor = (tagName) => {
  const tags = getTags();
  return tags[tagName] || null;
};

/**
 * Parse comma-separated tag string and add new tags
 * @param {string} tagString - Comma-separated tag string
 * @returns {string[]} Array of parsed tag names
 */
export const parseAndAddTags = (tagString) => {
  if (!tagString || typeof tagString !== 'string') {
    return [];
  }

  const tagNames = tagString
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

  // Add new tags to storage
  tagNames.forEach(tagName => {
    const tags = getTags();
    if (!tags[tagName]) {
      addTag(tagName);
    }
  });

  return tagNames;
};

/**
 * Initialize default tags if no tags exist
 */
export const initializeDefaultTags = () => {
  const tags = getTags();
  
  if (Object.keys(tags).length === 0) {
    const defaultTags = ['HTML', 'CSS', 'JavaScript', 'ReactJS'];
    defaultTags.forEach(tag => addTag(tag));
  }
};
