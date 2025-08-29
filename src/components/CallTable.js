import React, { useContext } from 'react';
import './CallTable.css';
import { SongContext } from '../contexts/SongContext';
import './Modal.css';
import { FaCog, FaTrash, FaTimes } from 'react-icons/fa';

function CallTable({ onCellClick, renderCellContent }) {
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
        <tbody>
          {songs.map(song => (
            <tr key={song.id}>
              <td>{song.name}</td>
              {parts.map(part => (
                <td key={part} onClick={() => onCellClick(song, part)}>
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
  );
}

export default CallTable;