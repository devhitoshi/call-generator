import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SongProvider } from '../contexts/SongContext';
import CallTable from './CallTable';

const mockUseSongs = {
  songs: [
    {
      id: 1,
      name: 'スタートライン！',
      calls: {
        '前奏': 'はい！はい！はい！はい！',
        'Aメロ': 'L・O・V・E・ラブリー・みくる！',
      }
    },
  ],
  parts: ['前奏', 'Aメロ'],
  handleCallChange: jest.fn(),
  presets: [],
  deleteSong: jest.fn(),
  deletePart: jest.fn(),
  reorderSongs: jest.fn(),
};

jest.mock('../hooks/useSongs', () => ({
  useSongs: () => mockUseSongs,
}));

describe('CallTable', () => {
  it('calls onCellClick when a cell is clicked', () => {
    const mockOnCellClick = jest.fn();
    render(
      <SongProvider>
        <CallTable onCellClick={mockOnCellClick} />
      </SongProvider>
    );

    const cell = screen.getByText('はい！はい！はい！はい！');
    fireEvent.click(cell);

    expect(mockOnCellClick).toHaveBeenCalledTimes(1);
    expect(mockOnCellClick).toHaveBeenCalledWith(
      mockUseSongs.songs[0],
      '前奏'
    );
  });
});
