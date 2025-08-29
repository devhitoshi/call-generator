import React, { useContext } from 'react';
import './CallTable.css';
import { SongContext } from '../contexts/SongContext';

function CallTable() {
  const { songs, handleCallChange, presets, deleteSong, deletePart } = useContext(SongContext);

  const parts = songs.length > 0 ? Object.keys(songs[0].calls) : [];

  return (
    <table>
      <thead>
        <tr>
          <th>Song</th>
          {parts.map(part => (
            <th key={part}>
              {part}
              <button onClick={() => deletePart(part)} style={{marginLeft: '5px', cursor: 'pointer', padding: '2px 5px'}}>x</button>
            </th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {songs.map(song => (
          <tr key={song.name}>
            <td>{song.name}</td>
            {parts.map(part => (
              <td key={part}>
                <input
                  type="text"
                  value={song.calls[part] || ''}
                  onChange={(e) => handleCallChange(song.name, part, e.target.value)}
                />
                {presets.map(preset => (
                  <button
                    key={preset}
                    onClick={() => handleCallChange(song.name, part, preset)}
                  >
                    {preset}
                  </button>
                ))}
              </td>
            ))}
            <td>
              <button onClick={() => deleteSong(song.name)}>削除</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CallTable;
