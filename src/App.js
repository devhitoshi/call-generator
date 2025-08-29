import React, { useRef, useContext, useState } from 'react';
import CallTable from './components/CallTable';
import ActionButtons from './components/ActionButtons';
import Layout from './components/Layout';
import { SongContext } from './contexts/SongContext';
import Modal from './components/Modal';

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
    parts
  } = useContext(SongContext);

  // State for Edit-Cell Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ song: null, part: null });

  // State for Add-Part Modal
  const [isAddPartModalOpen, setIsAddPartModalOpen] = useState(false);
  const [addPartIndex, setAddPartIndex] = useState(null);

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
      <h1>Idol Call Chart Maker</h1>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="グループ名"
        style={{ margin: '20px 0', padding: '10px', width: '300px' }}
      />
      <div ref={printRef}>
        <h2>{groupName}</h2>
        <CallTable
          onCellClick={openModal}
          renderCellContent={renderCellContent}
          onAddPartClick={openAddPartModal}
        />
      </div>
      <ActionButtons
        onExportClick={() => exportAsImage(printRef)}
        onAddPartClick={() => openAddPartModal(parts.length)}
      />
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
