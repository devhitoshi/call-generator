import React, { useRef, useContext, useState } from 'react';
import CallTable from './components/CallTable';
import ActionButtons from './components/ActionButtons';
import Layout from './components/Layout';
import { SongContext } from './contexts/SongContext';
import Modal from './components/Modal';
import InputModal from './components/InputModal';

function App() {
  const printRef = useRef(null);
  const {
    exportAsImage,
    groupName,
    setGroupName,
    presets,
    handleCallChange,
    addPart,
    partNameError,
    parts,
    updateSongName,
    updatePartName,
  } = useContext(SongContext);

  // State for Edit-Cell Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ song: null, part: null });

  // State for Add-Part Modal
  const [isAddPartModalOpen, setIsAddPartModalOpen] = useState(false);
  const [addPartIndex, setAddPartIndex] = useState(null);

  // State for Group-Name-Edit Modal
  const [isGroupNameModalOpen, setIsGroupNameModalOpen] = useState(false);

  // State for Song-Name-Edit Modal
  const [isSongNameModalOpen, setIsSongNameModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  // State for Part-Name-Edit Modal
  const [isPartNameModalOpen, setIsPartNameModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);

  const openModal = (song, part) => {
    setSelectedCell({ song, part });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCell({ song: null, part: null });
  };

  const openAddPartModal = (index) => {
    setAddPartIndex(index);
    setIsAddPartModalOpen(true);
  };

  const closeAddPartModal = () => {
    setIsAddPartModalOpen(false);
    setAddPartIndex(null);
  };

  const handleSaveNewPart = (newPartName) => {
    const success = addPart(newPartName, addPartIndex);
    if (success) {
      closeAddPartModal();
    }
  };

  const handleGroupNameSave = (newName) => {
    setGroupName(newName);
    setIsGroupNameModalOpen(false);
  };

  const openSongNameModal = (song) => {
    setSelectedSong(song);
    setIsSongNameModalOpen(true);
  };

  const handleSongNameSave = (newName) => {
    if (selectedSong) {
      updateSongName(selectedSong.id, newName);
    }
    setIsSongNameModalOpen(false);
    setSelectedSong(null);
  };

  const openPartNameModal = (part) => {
    setSelectedPart(part);
    setIsPartNameModalOpen(true);
  };

  const handlePartNameSave = (newName) => {
    if (selectedPart) {
      updatePartName(selectedPart, newName);
    }
    setIsPartNameModalOpen(false);
    setSelectedPart(null);
  };

  const presetsMap = Array.isArray(presets) ? new Map(presets.map(p => [p.name, p.category])) : new Map();

  const renderCellContent = (text) => {
    if (!text) return '';

    const presetNames = Array.from(presetsMap.keys());
    if (presetNames.length === 0) return text;

    const escapedPresetNames = presetNames.map(name => name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const regex = new RegExp(`(${escapedPresetNames.join('|')})`, 'g');

    const parts = text.split(regex);

    return parts.map((part, index) => {
      const category = presetsMap.get(part);
      if (category) {
        return (
          <span key={index} className={`call-tag call-tag-${category.toLowerCase()}`}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <Layout>
      <div ref={printRef}>
        <div className="group-name-container" onClick={() => setIsGroupNameModalOpen(true)}>
          <h2 className="group-name-h2">{groupName || 'グループ名'}</h2>
        </div>
        <CallTable
          onCellClick={openModal}
          renderCellContent={renderCellContent}
          onAddPartClick={openAddPartModal}
          onSongNameClick={openSongNameModal}
          onPartNameClick={openPartNameModal}
        />
      </div>
      <ActionButtons
        onExportClick={() => exportAsImage(printRef)}
        onAddPartClick={() => openAddPartModal(parts.length)}
      />
      <InputModal
        isOpen={isGroupNameModalOpen}
        onClose={() => setIsGroupNameModalOpen(false)}
        onSave={handleGroupNameSave}
        title="グループ名編集"
        initialValue={groupName}
      />
      {selectedSong && (
        <InputModal
          isOpen={isSongNameModalOpen}
          onClose={() => setIsSongNameModalOpen(false)}
          onSave={handleSongNameSave}
          title="楽曲名編集"
          initialValue={selectedSong.name}
        />
      )}
      {selectedPart && (
        <InputModal
          isOpen={isPartNameModalOpen}
          onClose={() => setIsPartNameModalOpen(false)}
          onSave={handlePartNameSave}
          title="パート名編集"
          initialValue={selectedPart}
        />
      )}
      <Modal
        mode="edit"
        isOpen={modalIsOpen}
        onClose={closeModal}
        song={selectedCell.song}
        part={selectedCell.part}
        onSave={handleCallChange}
        presets={presets}
      />
      <Modal
        mode="add"
        isOpen={isAddPartModalOpen}
        onClose={closeAddPartModal}
        onSave={handleSaveNewPart}
        partNameError={partNameError}
      />
    </Layout>
  );
}

export default App;
