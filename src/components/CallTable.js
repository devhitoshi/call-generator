import React, { useContext, useState } from 'react';
import './CallTable.css';
import { SongContext } from '../contexts/SongContext';
import Modal from './Modal';
import './Modal.css';
import { FaCog, FaTrash, FaTimes } from 'react-icons/fa';

function CallTable() {
  // Julesの変更（partsを追加）と、mainの変更（useStateなど）を両方取り込む
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

  const presetsMap = new Map(presets.map(p => [p.name, p.category]));

  const renderCellContent = (text) => {
    if (!text) return '';

    // Create a regex that finds any of the preset names
    const presetNames = Array.from(presetsMap.keys());
    // Escape special characters for regex
    const escapedPresetNames = presetNames.map(name => name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const regex = new RegExp(`(${escapedPresetNames.join('|')})`, 'g');

    const parts = text.split(regex);

    return parts.map((part, index) => {
      const category = presetsMap.get(part);
      if (category) {
        return (
          <span key={index} className={`call-tag call-tag-${category.toLowerCase()}`}>
            {part}
          </span>
        );
      }
      return part;
    });
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
          <tbody>
            {songs.map(song => (
              <tr key={song.id}>
                <td>{song.name}</td>
                {parts.map(part => (
                  <td key={part} onClick={() => openModal(song, part)}>
                    {renderCellContent(song.calls[part] || '')}
                  </td>
                ))}
                <td>
                  <button onClick={() => deleteSong(song.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
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