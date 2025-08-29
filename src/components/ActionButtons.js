import React, { useState, useEffect, useContext } from 'react';
import './ActionButtons.css';
import { SongContext } from '../contexts/SongContext';
import { FaPlus, FaMusic, FaImage } from 'react-icons/fa';

function ActionButtons({ onExportClick }) {
  const {
    addSong,
    addPart,
    isAddingPart,
    toggleAddPartForm,
    partNameError
  } = useContext(SongContext);

  const [newPartName, setNewPartName] = useState('');

  // When the form is closed, clear the input field for a better UX.
  useEffect(() => {
    if (!isAddingPart) {
      setNewPartName('');
    }
  }, [isAddingPart]);

  const handleSavePart = () => {
    addPart(newPartName);
  };

  return (
    <div className="action-buttons">
      <button onClick={toggleAddPartForm}><FaPlus /></button>
      <button onClick={addSong}><FaMusic /></button>
      <button onClick={onExportClick}><FaImage /></button>

      {isAddingPart && (
        <div>
          <input
            type="text"
            value={newPartName}
            onChange={(e) => setNewPartName(e.target.value)}
            placeholder="新しいパート名"
          />
          <button onClick={handleSavePart}>保存</button>
          {partNameError && <p style={{color: 'red'}}>{partNameError}</p>}
        </div>
      )}
    </div>
  );
}

export default ActionButtons;
