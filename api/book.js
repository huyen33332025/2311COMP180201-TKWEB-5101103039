const { connectDB, BookingModel } = require('./db'); 

const generateBookingCode = () => {
    return 'BK' + Math.floor(Math.random() * 10000 + 1000);
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Chỉ hỗ trợ POST' });
    }

    try {
        await connectDB();
        const newBooking = req.body;
        
        if (
            !newBooking.name || 
            !newBooking.phone || 
            !newBooking.date || 
            !newBooking.paymentMethod ||
            (newBooking.qty !== undefined && newBooking.qty < 1)
        ) {
             if (newBooking.qty < 1) {
                 return res.status(400).json({ success: false, message: 'Số lượng khách tối thiểu là 1.' });
            }
            return res.status(400).json({ success: false, message: 'Thiếu thông tin.' });
        }

        const bookingCode = generateBookingCode();
        
        const record = new BookingModel({ 
            code: bookingCode,
            name: newBooking.name,
            phone: newBooking.phone,
            date: newBooking.date,
            qty: newBooking.qty,
            paymentMethod: newBooking.paymentMethod,
            totalPrice: newBooking.totalPrice,
            depositAmount: newBooking.depositAmount
        });

        await record.save();

        res.status(201).json({ success: true, bookingCode: bookingCode });

    } catch (error) {
        console.error('Lỗi trong API handler /api/book:', error);
        if (error.message === "Không thể kết nối DB") {
             res.status(500).json({ success: false, message: 'Lỗi máy chủ: Không thể kết nối DB' });
        } else if (error.code === 11000) {
             res.status(500).json({ success: false, message: 'Lỗi máy chủ: Mã booking bị trùng, vui lòng thử lại.' });
        } else {
             res.status(500).json({ success: false, message: 'Lỗi máy chủ khi xử lý: ' + error.message });
        }
    }
}