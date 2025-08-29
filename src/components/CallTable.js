import React, { useContext } from 'react';
import './CallTable.css';
import { SongContext } from '../contexts/SongContext';
import './Modal.css';
import { FaCog, FaTrash, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// mainブランチの最新の構造を採用
function CallTable({ onCellClick }) {
  const { songs, parts, deleteSong, deletePart } = useContext(SongContext);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Song</th>
            {parts.map(part => (
              <th key={part}>
                {part}
                <button onClick={() => deletePart(part)} style={{ marginLeft: '5px', cursor: 'pointer', padding: '2px 5px' }}><FaTimes /></button>
              </th>
            ))}
            <th><FaCog /></th>
          </tr>
        </thead>
        {/* Julesのアニメーション機能を採用 */}
        <motion.tbody layout>
          <AnimatePresence>
            {songs.map(song => (
              <motion.tr
                key={song.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <td>{song.name}</td>
                {parts.map(part => (
                  <td key={part} onClick={() => onCellClick(song, part)}>
                    {/* mainブランチ側のrenderCellContentは削除し、直接表示する形に戻す */}
                    {song.calls[part] || ''}
                  </td>
                ))}
                <td>
                  <button onClick={() => deleteSong(song.id)}><FaTrash /></button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </motion.tbody>
      </table>
    </div>
  );
}

export default CallTable;