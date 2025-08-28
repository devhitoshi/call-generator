import React, { useState } from 'react';
import CallTable from './components/CallTable';
import ActionButtons from './components/ActionButtons';

function App() {
  const [songs, setSongs] = useState([
    {
      name: 'スタートライン！',
      calls: {
        '前奏': 'はい！はい！はい！はい！',
        'Aメロ': 'L・O・V・E・ラブリー・みくる！',
      }
    },
    {
      name: 'アイドル活動！',
      calls: {
        '間奏': 'タイガー！ファイヤー！サイバー！ファイバー！ダイバー！バイバー！ジャージャー！',
        'アウトロ': 'お疲れ様でした！',
      }
    }
  ]);

  const addSong = () => {
    // Get the structure of calls from the first song, if it exists
    const callKeys = songs.length > 0 ? Object.keys(songs[0].calls) : [];
    const newCalls = callKeys.reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});

    const newSong = {
      name: '新しい曲',
      calls: newCalls,
    };

    setSongs([...songs, newSong]);
  };

  const addPart = () => {
    const newPartName = window.prompt("新しいパート名を入力してください：");
    if (newPartName && newPartName.trim() !== '') {
      const trimmedPartName = newPartName.trim();
      const updatedSongs = songs.map(song => {
        // Create a new calls object with the new part
        const newCalls = {
          ...song.calls,
          [trimmedPartName]: ''
        };
        // Return a new song object
        return { ...song, calls: newCalls };
      });
      setSongs(updatedSongs);
    }
  };

  const handleCallChange = (songName, partName, newValue) => {
    const updatedSongs = songs.map(song => {
      if (song.name === songName) {
        const newCalls = {
          ...song.calls,
          [partName]: newValue
        };
        return { ...song, calls: newCalls };
      }
      return song;
    });
    setSongs(updatedSongs);
  };

  return (
    <div>
      <h1>Idol Call Chart Maker</h1>
      <CallTable songs={songs} handleCallChange={handleCallChange} />
      <ActionButtons addSong={addSong} addPart={addPart} />
    </div>
  );
}

export default App;
