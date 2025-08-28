import React from 'react';
import './ActionButtons.css';

function ActionButtons({ addSong }) {
  return (
    <div className="action-buttons">
      <button>パートを追加</button>
      <button onClick={addSong}>楽曲を追加</button>
      <button>画像として保存</button>
    </div>
  );
}

export default ActionButtons;
