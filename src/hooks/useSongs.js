import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

export const useSongs = () => {
  // mainブランチのgroupName機能を採用
  const [groupName, setGroupName] = useState('グループ名');

  // JulesのJSON化機能を採用
  const [songs, setSongs] = useState([]);
  const [parts, setParts] = useState([]);
  const [presets, setPresets] = useState({});

  // 共通のstate
  const [isAddingPart, setIsAddingPart] = useState(false);
  const [partNameError, setPartNameError] = useState('');

  // Julesが実装した、外部JSONを読み込むロジックを丸ごと採用
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partsRes, presetsRes] = await Promise.all([
          fetch('/data/defaultParts.json'),
          fetch('/data/presets.json')
        ]);
        const defaultParts = await partsRes.json();
        const callPresets = await presetsRes.json();

        setParts(defaultParts);
        setPresets(callPresets);

        const initialCalls = defaultParts.reduce((acc, part) => {
          acc[part] = '';
          return acc;
        }, {});

        setSongs([{
          id: 1,
          name: 'サンプル曲',
          calls: initialCalls
        }]);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };
    fetchData();
  }, []);

  // 以下、残りの関数はmainブランチとJulesのブランチで変更がないため、
  // どちらか一方（基本的にはmainブランチ側）のものをそのままコピーすればOK
  const toggleAddPartForm = () => {
    setPartNameError('');
    setIsAddingPart(!isAddingPart);
  };

  const addSong = () => {
    const newCalls = parts.reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    const newSong = {
      id: Date.now(),
      name: '新しい曲',
      calls: newCalls,
    };
    setSongs([...songs, newSong]);
  };

  const addPart = (newPartName, index) => {
    const trimmedPartName = newPartName.trim();
    if (!trimmedPartName) {
      // It's better to handle this validation in the component
      return false;
    }

    if (parts.some(part => part.toLowerCase() === trimmedPartName.toLowerCase())) {
      setPartNameError('このパート名は既に使用されています。');
      return false;
    }

    const newParts = [...parts];
    if (index === undefined || index === null || index < 0 || index > parts.length) {
      newParts.push(trimmedPartName);
    } else {
      newParts.splice(index, 0, trimmedPartName);
    }
    setParts(newParts);

    const updatedSongs = songs.map(song => {
      const newCalls = {
        ...song.calls,
        [trimmedPartName]: ''
      };
      return { ...song, calls: newCalls };
    });
    setSongs(updatedSongs);

    setPartNameError('');
    return true;
  };

  const handleCallChange = (songId, partName, newValue) => {
    const updatedSongs = songs.map(song => {
      if (song.id === songId) {
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

  const deleteSong = (songId) => {
    const songToDelete = songs.find(song => song.id === songId);
    if (songToDelete && window.confirm(`本当にこの曲「${songToDelete.name}」を削除しますか？`)) {
      setSongs(songs.filter(song => song.id !== songId));
    }
  };

  const exportAsImage = async (elementRef) => {
    if (elementRef.current) {
      const canvas = await html2canvas(elementRef.current);
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${groupName || 'idol'}-call-chart.png`; // グループ名をファイル名に利用
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const deletePart = (partName) => {
    if (window.confirm(`本当にこのパート「${partName}」を削除しますか？`)) {
      const newParts = parts.filter(p => p !== partName);
      setParts(newParts);

      const updatedSongs = songs.map(song => {
        const newCalls = { ...song.calls };
        delete newCalls[partName];
        return { ...song, calls: newCalls };
      });
      setSongs(updatedSongs);
    }
  };

  const reorderSongs = (active, over) => {
    setSongs((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = Array.from(items);
      const [removed] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, removed);

      return newItems;
    });
  };

  return {
    groupName,
    setGroupName,
    songs,
    parts,
    isAddingPart,
    partNameError,
    presets,
    toggleAddPartForm,
    addSong,
    addPart,
    handleCallChange,
    deleteSong,
    deletePart,
    exportAsImage,
    reorderSongs,
  };
};