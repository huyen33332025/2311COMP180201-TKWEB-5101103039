import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Modal } from 'bootstrap';

function ContactModal() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          setSuccessMessage('Gửi phản hồi thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
          form.current.reset();
          
          setTimeout(() => {
            const modal = Modal.getInstance(document.getElementById('modalContact'));
            if(modal) {
                modal.hide();
            }
            setSuccessMessage(null);
          }, 3000);

      }, (error) => {
          setErrorMessage('Gửi phản hồi thất bại. Vui lòng thử lại sau.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="modal fade" id="modalContact" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"><i className="bi bi-envelope"></i> Gửi nội dung phản hồi</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
          </div>
          <div className="modal-body">
            
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <form id="contactForm" ref={form} onSubmit={handleContactSubmit}>
              <div className="mb-3">
                <label className="form-label">Họ và tên</label>
                <input type="text" className="form-control" name="name" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Số điện thoại</label>
                <input type="tel" className="form-control" name="phone" />
              </div>
              <div className="mb-3">
                <label className="form-label">Nội dung phản hồi</label>
                <textarea 
                  className="form-control" 
                  name="message" 
                  rows="4" 
                  required 
                  defaultValue="Tôi quan tâm đến tour du lịch mã NDSGN574 và muốn biết thêm thông tin chi tiết."
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary" id="submitBtn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span> Đang gửi...</span>
                    </>
                  ) : (
                    <span className="btn-text">Gửi phản hồi</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;