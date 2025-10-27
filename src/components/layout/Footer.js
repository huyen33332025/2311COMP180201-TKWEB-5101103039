import React, { useState } from 'react';
import { projectInfo } from '../../data/tourData';
import LookupResultModal from '../modals/LookupResultModal';
import { Modal } from 'bootstrap';

const ProjectInfo = () => (
    <div style={{ 
        maxWidth: '1100px', 
        margin: '2rem auto 0', 
        padding: '1rem',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--white)',
        textAlign: 'center'
    }}>
        <h5 style={{ 
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
            color: 'var(--primary)',
            fontSize: '1rem',
            fontWeight: 700
        }}>
            {projectInfo.title}
        </h5>
        <hr style={{ borderColor: 'var(--border-color)', margin: '0.5rem 0' }} />
        <h6 style={{ 
            color: 'var(--text-light)', 
            fontSize: '0.9rem',
            fontWeight: 500
        }}>
            {projectInfo.instructor}
        </h6>
    </div>
);

function Footer() {
  const [bookingCode, setBookingCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState(null);

  const handleLookup = async () => {
    if (!bookingCode) {
      alert('Vui lòng nhập mã booking.');
      return;
    }
    setIsLoading(true);

    let resultModal;
    try {
      resultModal = Modal.getOrCreateInstance(document.getElementById('modalLookupResult'));
      const response = await fetch(`http://localhost:3001/api/lookup/${bookingCode}`);
      
      if (response.ok) {
        const result = await response.json();
        setLookupResult(result.booking);
        setLookupError(null);
      } else {
        const errorResult = await response.json();
        setLookupResult(null);
        setLookupError(errorResult.message || 'Không tìm thấy booking.');
      }
    } catch (error) {
      console.error('Lỗi tra cứu:', error);
      setLookupResult(null);
      setLookupError('Không thể kết nối đến máy chủ. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
      if (resultModal) {
        resultModal.show();
      }
    }
  };

  const handleCloseModal = () => {
    setLookupResult(null);
    setLookupError(null);
  };

  return (
    <>
      <footer>
        <div className="container-inner text-center">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <h5 style={{ fontWeight: '800' }}>Tra cứu Booking</h5>
              <div className="input-group mb-3 mt-2">
                <input 
                  id="lookupCode" 
                  className="form-control" 
                  placeholder="Nhập mã booking của quý khách" 
                  aria-label="Mã booking"
                  value={bookingCode}
                  onChange={(e) => setBookingCode(e.target.value)}
                  disabled={isLoading}
                />
                <button 
                  id="lookupBtn" 
                  className="btn btn-outline-primary" 
                  onClick={handleLookup}
                  disabled={isLoading}
                >
                  {isLoading ? (
                      <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          <span> Đang tìm...</span>
                      </>
                  ) : (
                      'Tìm kiếm'
                  )}
                </button>
              </div>
              <p style={{ marginTop: '10px' }}>
                <strong>280 An Dương Vương, P.Chợ Quán, Quận 5, TP.HCM</strong><br />
                0923 089 558 &nbsp;|&nbsp; k51sptina.cnthongtin@gmail.com
              </p>

              <div style={{ marginTop: '10px' }}>
                <a className="btn btn-danger rounded-pill" href="tel:0923089558"><i className="bi bi-telephone"></i> 0923 089 558</a>
              </div>
              
              <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#444' }}>Bản quyền © K51.SPTINA. Ghi rõ nguồn khi sử dụng thông tin.</p>
            </div>
          </div>
        </div>
        
        <ProjectInfo />
      </footer>

      <LookupResultModal 
        bookingData={lookupResult}
        error={lookupError}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default Footer;