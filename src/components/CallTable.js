import React from 'react';
import './CallTable.css';

function CallTable({ songs, handleCallChange, presets }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Song</th>
          <th>Part</th>
          <th>Chant</th>
        </tr>
      </thead>
      <tbody>
        {songs.map(song => (
          Object.entries(song.calls).map(([part, chant]) => (
            <tr key={`${song.name}-${part}`}>
              <td>{song.name}</td>
              <td>{part}</td>
              <td>
                <input
                  type="text"
                  value={chant}
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
            </tr>
          ))
        ))}
      </tbody>
    </table>
  );
}

export default CallTable;
