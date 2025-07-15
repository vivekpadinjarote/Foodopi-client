import React from 'react';
import './alertToast.css';

export default function AlertToast({ message, type = 'success', onClose }) {
  if (!message) return null;
  return (
    <div className={`alert-toast ${type}`}> 
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>&times;</button>
    </div>
  );
}
