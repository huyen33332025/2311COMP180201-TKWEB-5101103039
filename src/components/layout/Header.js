import React from 'react';
import { tourHeader } from '../../data/tourData';

function Header() {
  return (
    <header className="title-tour" data-aos="fade-down">
      <h1>
        {tourHeader.title}
      </h1>
    </header>
  );
}

export default Header;