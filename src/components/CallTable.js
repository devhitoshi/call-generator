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

  // return文以降は、mainブランチの完成された構造をそのまま使う
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
                    {song.calls[part] || ''}
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