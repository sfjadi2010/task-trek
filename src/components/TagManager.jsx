import React, { useState, useEffect } from "react";
import "./TagManager.css";
import Tag from "./Tag";
import {
  getTags,
  getTagNames,
  initializeDefaultTags,
} from "../utils/tagManager";

const TagManager = ({ selectedTags = [], onTagSelect }) => {
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    // Initialize default tags if none exist
    initializeDefaultTags();

    // Load tags from localStorage
    setAvailableTags(getTagNames());
  }, []);

  const handleTagSelect = (tagName) => {
    if (onTagSelect) {
      onTagSelect(tagName);
    }
  };

  return (
    <div className="tag-manager">
      <div className="tag-manager-label">Available Tags:</div>
      <div className="tag-list">
        {availableTags.map((tagName) => (
          <Tag
            key={tagName}
            tagName={tagName}
            selectTag={handleTagSelect}
            selected={selectedTags.includes(tagName)}
          />
        ))}
      </div>
      {availableTags.length === 0 && (
        <div className="no-tags-message">
          No tags available. Create some tags using the input above.
        </div>
      )}
    </div>
  );
};

export default TagManager;
