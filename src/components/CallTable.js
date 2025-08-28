import React from 'react';
import './CallTable.css';


function CallTable({ songs }) {
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
              <td>{chant}</td>
            </tr>
          ))
        ))}
      </tbody>
    </table>
  );
}

export default CallTable;
