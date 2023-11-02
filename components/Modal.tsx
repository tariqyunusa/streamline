import React from "react";
import { Button } from "."; // Import your Button component or use a built-in one

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal_content">
        {/* Your modal content goes here */}
        <p>Modal Content Goes Here</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
