import React, { useState, useEffect } from 'react';
import './Modal.css';

function Modal({
  isOpen,
  onClose,
  onSave,
  mode,
  // Props for 'edit' mode
  song,
  part,
  presets,
  // Props for 'add' mode
  partNameError,
}) {
  const [call, setCall] = useState('');
  const [newPartName, setNewPartName] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && song && part) {
        setCall(song.calls[part] || '');
      } else if (mode === 'add') {
        setNewPartName('');
      }
    }
  }, [isOpen, mode, song, part]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    if (mode === 'edit') {
      onSave(song.id, part, call);
      onClose();
    } else if (mode === 'add') {
      onSave(newPartName);
      // The modal is closed by the caller in App.js if save is successful
    }
  };

  const renderEditMode = () => (
    <>
      <h2>{song.name} - {part}</h2>
      <textarea
        value={call}
        onChange={(e) => setCall(e.target.value)}
        rows="4"
      />
      <div className="presets">
        {presets && Object.keys(presets).length > 0 &&
          Object.entries(presets).map(([category, names]) => (
            <div key={category} className="preset-category">
              <h4 className="preset-category-title">{category}</h4>
              <div className="preset-buttons">
                {names.map(name => (
                  <button
                    key={name}
                    onClick={() => setCall(call + name)}
                    className={`preset-button preset-${category.toLowerCase()}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );

  const renderAddMode = () => (
    <>
      <h2>新しいパートを追加</h2>
      <input
        type="text"
        value={newPartName}
        onChange={(e) => setNewPartName(e.target.value)}
        placeholder="新しいパート名"
      />
      {partNameError && <p style={{ color: 'red' }}>{partNameError}</p>}
    </>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {mode === 'edit' ? renderEditMode() : renderAddMode()}
        <div className="modal-actions">
          <button onClick={handleSave}>保存</button>
          <button onClick={onClose}>キャンセル</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
