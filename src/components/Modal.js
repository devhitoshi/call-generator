import React, { useState, useEffect } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, song, part, onSave, presets }) {
  const [call, setCall] = useState('');

  useEffect(() => {
    if (isOpen && song && part) {
      setCall(song.calls[part] || '');
    }
  }, [isOpen, song, part]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave(song.id, part, call);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
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
        <div className="modal-actions">
          <button onClick={handleSave}>保存</button>
          <button onClick={onClose}>キャンセル</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
