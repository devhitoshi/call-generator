import React, { createContext } from 'react';
import { useSongs } from '../hooks/useSongs';

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const songData = useSongs();

  return (
    <SongContext.Provider value={songData}>
      {children}
    </SongContext.Provider>
  );
};
