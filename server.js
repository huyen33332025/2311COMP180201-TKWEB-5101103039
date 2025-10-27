const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const dbPath = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

const generateBookingCode = () => {
    return 'BK' + Math.floor(Math.random() * 10000 + 1000);
};

app.post('/api/book', (req, res) => {
    try {
        const newBooking = req.body;
        if (
            !newBooking.name || 
            !newBooking.phone || 
            !newBooking.date || 
            !newBooking.paymentMethod ||
            newBooking.totalPrice === undefined ||
            newBooking.depositAmount === undefined
        ) {
            return res.status(400).json({ success: false, message: 'Thiếu thông tin.' });
        }

        const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
        
        const bookingCode = generateBookingCode();
        const record = {
            code: bookingCode,
            name: newBooking.name,
            phone: newBooking.phone,
            date: newBooking.date,
            qty: newBooking.qty,
            paymentMethod: newBooking.paymentMethod,
            totalPrice: newBooking.totalPrice,
            depositAmount: newBooking.depositAmount,
            bookedAt: new Date().toISOString()
        };

        dbData.bookings.push(record);
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

        console.log('Đã lưu booking:', record);
        res.status(201).json({ success: true, bookingCode: bookingCode });

    } catch (error)
    {
        console.error('Lỗi khi lưu booking:', error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
    }
});

app.get('/api/lookup/:code', (req, res) => {
    try {
        const { code } = req.params;
        if (!code) {
            return res.status(400).json({ success: false, message: 'Vui lòng cung cấp mã booking.' });
        }

        const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
        const booking = dbData.bookings.find(b => b.code.toLowerCase() === code.toLowerCase());

        if (booking) {
            res.status(200).json({ success: true, booking: booking });
        } else {
            res.status(404).json({ success: false, message: 'Không tìm thấy mã booking này.' });
        }
    } catch (error) {
        console.error('Lỗi khi tra cứu:', error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});