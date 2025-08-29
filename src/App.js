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

  const [isAddingPart, setIsAddingPart] = useState(false);
  const [partNameError, setPartNameError] = useState('');
  const presets = ['スタンダードMIX', '日本語MIX', '振りコピ', 'ケチャ'];

  const toggleAddPartForm = () => {
    setPartNameError(''); // Clear error when toggling form
    setIsAddingPart(!isAddingPart);
  };

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

  const addPart = (newPartName) => {
    const trimmedPartName = newPartName.trim();
    if (!trimmedPartName) return; // Ignore empty input

    // Check for duplicates
    const existingParts = songs.length > 0 ? Object.keys(songs[0].calls) : [];
    if (existingParts.some(part => part.toLowerCase() === trimmedPartName.toLowerCase())) {
      setPartNameError('このパート名は既に使用されています。');
      return;
    }

    // If unique, add the part
    const updatedSongs = songs.map(song => {
      const newCalls = {
        ...song.calls,
        [trimmedPartName]: ''
      };
      return { ...song, calls: newCalls };
    });
    setSongs(updatedSongs);
    toggleAddPartForm(); // Close form on success
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
      <CallTable songs={songs} handleCallChange={handleCallChange} presets={presets} />
      <ActionButtons
        addSong={addSong}
        addPart={addPart}
        isAddingPart={isAddingPart}
        toggleAddPartForm={toggleAddPartForm}
        partNameError={partNameError}
      />
    </div>
  );
}

export default App;
