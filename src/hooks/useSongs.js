import { useState } from 'react';

export const useSongs = () => {
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
    if (!trimmedPartName) return;

    const existingParts = songs.length > 0 ? Object.keys(songs[0].calls) : [];
    if (existingParts.some(part => part.toLowerCase() === trimmedPartName.toLowerCase())) {
      setPartNameError('このパート名は既に使用されています。');
      return;
    }

    const updatedSongs = songs.map(song => {
      const newCalls = {
        ...song.calls,
        [trimmedPartName]: ''
      };
      return { ...song, calls: newCalls };
    });
    setSongs(updatedSongs);
    toggleAddPartForm();
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

  const deleteSong = (songName) => {
    if (window.confirm(`本当にこの曲「${songName}」を削除しますか？`)) {
      setSongs(songs.filter(song => song.name !== songName));
    }
  };

  const deletePart = (partName) => {
    if (window.confirm(`本当にこのパート「${partName}」を削除しますか？`)) {
      const updatedSongs = songs.map(song => {
        const newCalls = { ...song.calls };
        delete newCalls[partName];
        return { ...song, calls: newCalls };
      });
      setSongs(updatedSongs);
    }
  };

  return {
    songs,
    isAddingPart,
    partNameError,
    presets,
    toggleAddPartForm,
    addSong,
    addPart,
    handleCallChange,
    deleteSong,
    deletePart,
  };
};
