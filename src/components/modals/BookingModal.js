import React, { useState } from 'react';
import { Modal } from 'bootstrap';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey); 

const generateBookingCode = () => {
    return 'BK' + Math.floor(Math.random() * 10000 + 1000);
};

function BookingModal({ onBookingSuccess }) {
  const [date, setDate] = useState('');
  const [qty, setQty] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const [isLoading, setIsLoading] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  const minDate = `${year}-${month}-${day}`;

  const tourPriceVND = 5290000;
  const currentQty = parseInt(qty, 10) || 1; 
  const totalPrice = tourPriceVND * currentQty;
  const realDeposit = totalPrice * 0.3;
  const testDeposit = 0; 

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const handleConfirm = async () => {
    if (!date || !name || !phone || !paymentMethod) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
      alert('Vui lòng nhập số điện thoại hợp lệ (10 số, bắt đầu bằng 0).');
      return;
    }
    
    if (currentQty < 1) {
      alert('Số lượng khách tối thiểu là 1 người.');
      return;
    }
    
    setIsLoading(true);

    const bookingCode = generateBookingCode();

    try {
        const { data, error } = await supabase
            .from('bookings') 
            .insert([
                {
                    code: bookingCode,
                    name: name,
                    phone: phone,
                    date: date,
                    qty: currentQty,
                    payment_method: paymentMethod, 
                    total_price: totalPrice,
                    deposit_amount: testDeposit
                }
            ])
            .select(); 

        if (error) {
            console.error('Supabase Error:', error);
            alert('Đặt tour thất bại: Lỗi cơ sở dữ liệu: ' + error.message);
            return;
        }

        onBookingSuccess(bookingCode);
        
        const currentModal = Modal.getInstance(document.getElementById('modalBooking'));
        if (currentModal) {
            currentModal.hide();
        }

        setTimeout(() => {
            const successModal = Modal.getOrCreateInstance(document.getElementById('modalSuccess'));
            if (successModal) {
                successModal.show();
            }
        }, 500); 

        setDate('');
        setQty(1);
        setName('');
        setPhone('');
        setPaymentMethod('cash');

    } catch (error) {
        console.error('Network error or unexpected:', error);
        alert('Lỗi hệ thống không xác định. Vui lòng thử lại sau.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="modal fade" id="modalBooking" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"><i className="bi bi-calendar3"></i> Chọn ngày khởi hành</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Đóng"></button>
          </div>
          <div className="modal-body">
            <label className="form-label">Ngày khởi hành</label>
            <input 
              type="date" 
              className="form-control mb-3" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={minDate}
              disabled={isLoading}
            />
            <label className="form-label">Số lượng khách (Tối thiểu 1)</label>
            <input 
              type="number" 
              className="form-control mb-3" 
              min="1" 
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              disabled={isLoading}
            />
            <label className="form-label">Họ tên liên hệ</label>
            <input 
              type="text" 
              className="form-control mb-3" 
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
            <label className="form-label">Số điện thoại (10 số, bắt đầu bằng 0)</label>
            <input 
              type="tel" 
              className="form-control mb-3" 
              placeholder="0..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
            />
            
            <div className="text-center mb-3">
                <div style={{fontSize: '1.1rem'}}>Tổng cộng: <strong>{formatter.format(totalPrice)}</strong></div>
                <div style={{fontSize: '0.9rem', color: 'var(--text-light)'}}>
                    (Đã bao gồm {currentQty} khách)
                </div>
            </div>

            <label className="form-label">Phương thức thanh toán</label>
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="radio" 
                name="paymentMethod" 
                id="paymentCash" 
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={isLoading}
              />
              <label className="form-check-label" htmlFor="paymentCash">
                Thanh toán tiền mặt (khi nhận tour)
              </label>
            </div>
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="radio" 
                name="paymentMethod" 
                id="paymentMomo" 
                value="momo_30_percent"
                checked={paymentMethod === 'momo_30_percent'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={isLoading}
              />
              <label className="form-check-label" htmlFor="paymentMomo">
                Đặt cọc 30% qua Momo
              </label>
            </div>

            {paymentMethod === 'momo_30_percent' && (
              <div className="alert alert-info mt-3" style={{fontSize: '0.9rem'}}>
                <p className="mb-1">Vui lòng chuyển khoản đặt cọc <strong>{formatter.format(realDeposit)}</strong> (30%) đến:</p>
                <p className="mb-0"><strong>Số tài khoản:</strong> 0328125354</p>
                <p className="mb-0"><strong>Tên:</strong> Nguyen Van Huyen</p>
                <hr/>
                <p className="mb-0" style={{fontWeight: 'bold'}}>
                  Số tiền thanh toán TEST: {formatter.format(testDeposit)}
                </p>
                <p className="mt-2 mb-0" style={{fontStyle: 'italic'}}>
                  (Nút "Xác nhận" bên dưới đồng nghĩa với việc bạn đã hoàn tất chuyển khoản)
                </p>
              </div>
            )}

            <div className="d-grid gap-2 mt-4">
              <button 
                className="btn btn-primary" 
                id="btnConfirm" 
                onClick={handleConfirm}
                disabled={isLoading} 
              >
                {isLoading ? (
                    <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span> Đang xử lý...</span>
                    </>
                ) : (
                    'Xác nhận đặt tour'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;