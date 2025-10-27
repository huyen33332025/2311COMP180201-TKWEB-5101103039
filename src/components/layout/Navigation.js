import React from 'react';

function Navigation({ isScrolled }) {
  
  const navClass = isScrolled ? 'nav-scroll scrolled' : 'nav-scroll';

  return (
    <nav className={navClass} data-aos="fade-down" aria-label="Navigation">
      <div className="container-inner d-flex justify-content-center">
        <ul className="nav nav-pills">
          <li className="nav-item"><a className="nav-link scroll-link active" href="#tongquan">Tổng quan</a></li>
          <li className="nav-item"><a className="nav-link scroll-link" href="#lichtrinh">Lịch trình</a></li>
          <li className="nav-item"><a className="nav-link scroll-link" href="#luuy">Lưu ý</a></li>
          <li className="nav-item"><a className="nav-link scroll-link" href="#reviews">Đánh giá</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;