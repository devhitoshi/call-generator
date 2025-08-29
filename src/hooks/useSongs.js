import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

export const useSongs = () => {
  const [songs, setSongs] = useState([]);
  const [parts, setParts] = useState([]);
  const [presets, setPresets] = useState({});
  const [isAddingPart, setIsAddingPart] = useState(false);
  const [partNameError, setPartNameError] = useState('');

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

  const addPart = (newPartName) => {
    const trimmedPartName = newPartName.trim();
    if (!trimmedPartName) return;

    if (parts.some(part => part.toLowerCase() === trimmedPartName.toLowerCase())) {
      setPartNameError('このパート名は既に使用されています。');
      return;
    }

    const newParts = [...parts, trimmedPartName];
    setParts(newParts);

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
      link.download = 'idol-call-chart.png';
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

  return {
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
  };
};
