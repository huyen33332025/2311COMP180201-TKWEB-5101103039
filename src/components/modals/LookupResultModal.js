import React from 'react';

function LookupResultModal({ bookingData, error, onClose }) {
  
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const date = bookingData ? new Date(bookingData.date).toLocaleDateString('vi-VN') : '';

  return (
    <div className="modal fade" id="modalLookupResult" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Kết quả tra cứu</h5>
            <button 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="modal" 
              aria-label="Đóng"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {bookingData && (
              <div>
                <p><strong>Mã Booking:</strong> {bookingData.code}</p>
                <p><strong>Họ tên:</strong> {bookingData.name}</p>
                <p><strong>Ngày đi:</strong> {date}</p>
                <p><strong>Số lượng khách:</strong> {bookingData.qty}</p>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LookupResultModal;