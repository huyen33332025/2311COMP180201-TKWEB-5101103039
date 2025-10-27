import React from 'react';

function Lightbox({ src, caption, onClose }) {

  return (
    <div 
      className="lightbox" 
      id="lightbox" 
      role="dialog" 
      aria-hidden={!src} 
      onClick={onClose} 
      style={{ display: src ? 'flex' : 'none' }}
    >
      {src && <img src={src} alt={caption} id="lightboxImg" />}
      <div className="caption" id="lightboxCaption">{caption}</div>
    </div>
  );
}

export default Lightbox;