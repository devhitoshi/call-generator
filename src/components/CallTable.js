import React, { useContext } from 'react';
import './CallTable.css';
import { SongContext } from '../contexts/SongContext';

function CallTable() {
  const { songs, handleCallChange, presets } = useContext(SongContext);

  // Determine the column headers from the parts of the first song.
  // This assumes all songs have the same parts structure.
  const parts = songs.length > 0 ? Object.keys(songs[0].calls) : [];

  return (
    <table>
      <thead>
        <tr>
          <th>Song</th>
          {parts.map(part => (
            <th key={part}>{part}</th>
          ))}
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CallTable;
