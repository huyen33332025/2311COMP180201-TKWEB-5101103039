import React from 'react';

function SuccessModal({ bookingCode }) {
  
  const handleCloseAndReload = () => {
    window.location.reload();
  };

  return (
    <div className="modal fade" id="modalSuccess" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-sm modal-dialog-centered">
        <div className="modal-content text-center p-3">
          <div className="booking-success">
            <div className="success-icon"><i className="bi bi-check-lg"></i></div>
            <div>
              <h5 style={{ margin: '0 0 6px' }}>Đặt tour thành công</h5>
              <div style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>Chúng tôi sẽ liên hệ để xác nhận chi tiết.</div>
              <div style={{ marginTop: '8px', fontSize: '0.95rem' }}>Mã booking của bạn: <strong id="successBookingCode">{bookingCode}</strong></div>
            </div>
          </div>
          <div style={{ marginTop: '12px' }}>
            <button 
              className="btn btn-outline-primary btn-sm" 
              data-bs-dismiss="modal"
              onClick={handleCloseAndReload}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;