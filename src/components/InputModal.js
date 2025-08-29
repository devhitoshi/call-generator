import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InputModal.css';

const InputModal = ({ isOpen, onClose, title, initialValue, onSave }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (isOpen) {
      setValue(initialValue);
    }
  }, [isOpen, initialValue]);

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      scale: 0.95,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="input-modal-overlay"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="input-modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{title}</h2>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="input-modal-input"
            />
            <div className="input-modal-actions">
              <button onClick={handleSave} className="input-modal-save-button">
                保存
              </button>
              <button onClick={onClose} className="input-modal-cancel-button">
                キャンセル
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InputModal;
