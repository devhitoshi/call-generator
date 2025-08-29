import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SongProvider } from '../contexts/SongContext';
import CallTable from './CallTable';

const mockHandleCallChange = jest.fn();

jest.mock('../hooks/useSongs', () => ({
  useSongs: () => ({
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
    parts: ['前奏', 'Aメロ'], // Add this line
    handleCallChange: mockHandleCallChange,
    presets: [
      { "name": "スタンダードMIX", "category": "MIX", "category_name": "MIX" },
      { "name": "日本語MIX", "category": "MIX", "category_name": "MIX" },
      { "name": "振りコピ", "category": "Dousa", "category_name": "動作・ヲタ芸" },
      { "name": "ケチャ", "category": "Dousa", "category_name": "動作・ヲタ芸" }
    ],
    deleteSong: jest.fn(),
    deletePart: jest.fn(),
  }),
}));

describe('CallTable', () => {
  beforeEach(() => {
    // Clear mock history before each test
    mockHandleCallChange.mockClear();
  });

  it('opens a modal when a cell is clicked, and allows editing', () => {
    render(
      <SongProvider>
        <CallTable />
      </SongProvider>
    );

    // Cell content is the initial call
    const cell = screen.getByText('はい！はい！はい！はい！');
    fireEvent.click(cell);

    // Modal should be visible
    const modalTitle = screen.getByText('スタートライン！ - 前奏');
    expect(modalTitle).toBeInTheDocument();

    // Textarea should have the correct value
    const textarea = screen.getByDisplayValue('はい！はい！はい！はい！');
    expect(textarea).toBeInTheDocument();

    // Edit the call
    fireEvent.change(textarea, { target: { value: 'New Call!' } });
    expect(textarea.value).toBe('New Call!');

    // Save the changes
    const saveButton = screen.getByText('保存');
    fireEvent.click(saveButton);

    // Modal should be closed (we can't directly test for this easily without more setup)
    // But we can check if the handleCallChange function was called
    expect(mockHandleCallChange).toHaveBeenCalledWith(1, '前奏', 'New Call!');
  });
});
