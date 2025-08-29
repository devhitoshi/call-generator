import React, { useContext } from 'react';
import './CallTable.css';
import { SongContext } from '../contexts/SongContext';
import './Modal.css';
import { FaCog, FaTrash, FaTimes } from 'react-icons/fa';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableSongRow({ song, parts, onCellClick, deleteSong }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: song.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 'auto',
    position: 'relative',
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes}>
      <td {...listeners} style={{ cursor: 'grab', touchAction: 'none' }}>
        {song.name}
      </td>
      {parts.map(part => (
        <td key={part} onClick={() => onCellClick(song, part)}>
          {song.calls[part] || ''}
        </td>
      ))}
      <td>
        <button onClick={() => deleteSong(song.id)}><FaTrash /></button>
      </td>
    </tr>
  );
}

function CallTable({ onCellClick }) {
  const { songs, parts, deleteSong, deletePart, reorderSongs } = useContext(SongContext);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderSongs(active, over);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Song</th>
              {parts.map(part => (
                <th key={part}>
                  {part}
                  <button onClick={() => deletePart(part)} style={{ marginLeft: '5px', cursor: 'pointer', padding: '2px 5px' }}><FaTimes /></button>
                </th>
              ))}
              <th><FaCog /></th>
            </tr>
          </thead>
          <tbody>
            <SortableContext
              items={songs.map(s => s.id)}
              strategy={verticalListSortingStrategy}
            >
              {songs.map(song => (
                <SortableSongRow
                  key={song.id}
                  song={song}
                  parts={parts}
                  onCellClick={onCellClick}
                  deleteSong={deleteSong}
                />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </div>
    </DndContext>
  );
}

export default CallTable;