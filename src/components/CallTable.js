import React, { useContext, useState } from 'react';
import './CallTable.css';
import { SongContext } from '../contexts/SongContext';
import Modal from './Modal';
import './Modal.css';
import { FaCog, FaTrash, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function CallTable() {
  const { songs, parts, handleCallChange, presets, deleteSong, deletePart } = useContext(SongContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ song: null, part: null });

  const openModal = (song, part) => {
    setSelectedCell({ song, part });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCell({ song: null, part: null });
  };

  return (
    <>
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
                    <td key={part} onClick={() => openModal(song, part)}>
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
      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        song={selectedCell.song}
        part={selectedCell.part}
        onSave={handleCallChange}
        presets={presets}
      />
    </>
  );
}

export default CallTable;