import React from "react";
import "./Tag.css";
import { getTagColor } from "../utils/tagManager";

const Tag = ({ tagName, selectTag, selected }) => {
  const tagColor = getTagColor(tagName);

  const tagStyle =
    selected && tagColor
      ? {
          backgroundColor: tagColor.backgroundColor,
          color: tagColor.textColor,
          border: `1px solid ${tagColor.backgroundColor}`,
        }
      : {};

  return (
    <button
      type="button"
      className={`tag ${selected ? "tag-selected" : ""}`}
      style={tagStyle}
      onClick={() => selectTag(tagName)}
    >
      {tagName}
    </button>
  );
};

export default Tag;
