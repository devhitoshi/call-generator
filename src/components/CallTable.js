import React, { useContext } from 'react';
import './CallTable.css';
import { SongContext } from '../contexts/SongContext';

function CallTable() {
  const { songs, parts, handleCallChange, presets, deleteSong, deletePart } = useContext(SongContext);

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
          <tr key={song.id}>
            <td>{song.name}</td>
            {parts.map(part => (
              <td key={part}>
                <input
                  type="text"
                  value={song.calls[part] || ''}
                  onChange={(e) => handleCallChange(song.id, part, e.target.value)}
                />
                {Object.entries(presets).map(([category, presetList]) => (
                  <div key={category} className="preset-category">
                    <strong>{category}: </strong>
                    {presetList.map(preset => (
                      <button
                        key={preset}
                        onClick={() => handleCallChange(song.id, part, preset)}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                ))}
              </td>
            ))}
            <td>
              <button onClick={() => deleteSong(song.id)}>削除</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CallTable;
