import React, { useState } from 'react';
import './ActionButtons.css';

function ActionButtons({
  addSong,
  addPart,
  isAddingPart,
  toggleAddPartForm
}) {
  const [newPartName, setNewPartName] = useState('');

  const handleSavePart = () => {
    if (newPartName && newPartName.trim() !== '') {
      addPart(newPartName);
      setNewPartName(''); // Reset input
      toggleAddPartForm(); // Close form
    }
  };

  return (
    <div className="action-buttons">
      <button onClick={toggleAddPartForm}>パートを追加</button>
      <button onClick={addSong}>楽曲を追加</button>
      <button>画像として保存</button>

      {isAddingPart && (
        <div>
          <input
            type="text"
            value={newPartName}
            onChange={(e) => setNewPartName(e.target.value)}
            placeholder="新しいパート名"
          />
          <button onClick={handleSavePart}>保存</button>
        </div>
      )}
    </div>
  );
}

export default ActionButtons;
