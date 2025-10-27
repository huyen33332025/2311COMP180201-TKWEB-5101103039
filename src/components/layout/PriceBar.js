import React from 'react';

function PriceBar() {
  return (
    <div className="price-bar" aria-hidden="false">
      <div className="price-left">
        <small style={{ opacity: '.95' }}>Mã chương trình: <strong>NDSGN574</strong></small>
        <div className="price">5.290.000 ₫ / Khách</div>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <button className="btn btn-outline-light" title="Gửi yêu cầu" data-bs-toggle="modal" data-bs-target="#modalContact">
          <i className="bi bi-envelope-fill"></i>
        </button>
        <button className="btn btn-light text-primary" data-bs-toggle="modal" data-bs-target="#modalBooking">
          <i className="bi bi-calendar3"></i> Chọn ngày khởi hành
        </button>
      </div>
    </div>
  );
}

export default PriceBar;