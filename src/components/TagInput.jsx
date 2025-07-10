import React, { useState } from "react";
import "./TagInput.css";

const TagInput = ({ onTagsChange, selectedTags = [] }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      processTags();
    }
  };

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      processTags();
    }
  };

  const processTags = () => {
    if (!inputValue.trim()) return;

    // Parse comma-separated tags
    const newTags = inputValue
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0 && !selectedTags.includes(tag));

    if (newTags.length > 0) {
      onTagsChange([...selectedTags, ...newTags]);
    }

    setInputValue("");
  };

  const removeTag = (tagToRemove) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="tag-input-container">
      <div className="tag-input-field">
        {selectedTags.map((tag) => (
          <span key={tag} className="tag-chip">
            {tag}
            <button
              type="button"
              className="tag-remove"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag} tag`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          placeholder={selectedTags.length === 0 ? "Add tags (comma separated)..." : ""}
          className="tag-text-input"
        />
      </div>
      <div className="tag-input-hint">
        Press Enter or comma to add tags
      </div>
    </div>
  );
};

export default TagInput;
