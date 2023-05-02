import React, { useState, useEffect } from 'react';

import './App.css'

function Modal() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Set the modal to close after 5 seconds
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Instructions</h2>
        <p>Enter the registered name of the company in the stock exchange (e.g. TSLA for Tesla)</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
