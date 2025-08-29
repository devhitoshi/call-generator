import React, { useContext, useState } from 'react';
import './CallTable.css';
import { SongContext } from '../contexts/SongContext';
import Modal from './Modal';
import './Modal.css';

function CallTable() {
  const { songs, handleCallChange, presets, deleteSong, deletePart } = useContext(SongContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ song: null, part: null });

  const parts = songs.length > 0 ? Object.keys(songs[0].calls) : [];

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
      <div className="table-container"> {/* Julesの変更を採用 */}
        <table>
          <thead>
            <tr>
              <th>Song</th>
              {parts.map(part => (
                <th key={part}>
                  {part}
                  <button onClick={() => deletePart(part)} style={{ marginLeft: '5px', cursor: 'pointer', padding: '2px 5px' }}>x</button>
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* mainブランチの完成されたtbodyを採用 */}
            {songs.map(song => (
              <tr key={song.id}>
                <td>{song.name}</td>
                {parts.map(part => (
                  <td key={part} onClick={() => openModal(song, part)}>
                    {song.calls[part] || ''}
                  </td>
                ))}
                <td>
                  <button onClick={() => deleteSong(song.id)}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* mainブランチのModalコンポーネントを採用 */}
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