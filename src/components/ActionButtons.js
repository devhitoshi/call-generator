import React, { useContext } from 'react';
import './ActionButtons.css';
import { SongContext } from '../contexts/SongContext';
import { FaPlus, FaMusic, FaImage } from 'react-icons/fa';

function ActionButtons({ onExportClick, onAddPartClick }) {
  const { addSong } = useContext(SongContext);

  return (
    <div className="action-buttons">
      <button onClick={onAddPartClick}>
        <FaPlus />
        <span>パートを追加</span>
      </button>
      <button onClick={addSong}>
        <FaMusic />
        <span>楽曲を追加</span>
      </button>
      <button onClick={onExportClick}>
        <FaImage />
        <span>画像として保存</span>
      </button>
    </div>
  );
}

export default ActionButtons;
