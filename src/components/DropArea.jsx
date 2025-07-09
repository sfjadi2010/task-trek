import React, { useState } from "react";
import "./DropArea.css";

const DropArea = ({onDrop}) => {
  const [showDropArea, setShowDropArea] = useState(false);

  return (
    <>
      <section
        className={showDropArea ? "drop_area" : "hide_drop_area"}
        onDragEnter={() => setShowDropArea(true)}
        onDragLeave={() => setShowDropArea(false)}
        onDrop={() => {
            onDrop();
            setShowDropArea(false);
        }}
        onDragOver={(e) => {
            e.preventDefault();            
        }}
      >
        {showDropArea ? "Release to drop" : "Drag and drop here"}
      </section>
    </>
  );
};

export default DropArea;
