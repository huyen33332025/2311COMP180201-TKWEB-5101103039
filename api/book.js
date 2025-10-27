// File: /api/book.js
const mongoose = require('mongoose');

let conn = null;
const connectDB = async () => {
    console.log("Attempting DB connection. MONGODB_URI exists:", !!process.env.MONGODB_URI);

    if (conn) {
        return conn;
    }
    try {
        conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("MongoDB connected successfully for booking");
        return conn;
    } catch (error) {
        console.error("Lỗi kết nối MongoDB:", error);
        throw new Error("Không thể kết nối DB");
    }
};

const BookingSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    qty: { type: Number, required: true, min: 1 },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    depositAmount: { type: Number, required: true },
    bookedAt: { type: Date, default: Date.now }
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

const generateBookingCode = () => {
    return 'BK' + Math.floor(Math.random() * 10000 + 1000);
};

export default async function handler(req, res) {
    // === THÊM LOG Ở ĐÂY ===
    console.log(`[${new Date().toISOString()}] Received request for /api/book, Method: ${req.method}`);
    // === KẾT THÚC THÊM LOG ===

    if (req.method !== 'POST') {
        console.log("Method Not Allowed:", req.method);
        return res.status(405).json({ message: 'Chỉ hỗ trợ POST' });
    }

    try {
        console.log("Request body:", req.body); // In ra dữ liệu nhận được
        await connectDB();
        const newBooking = req.body;
        
        if (
            !newBooking.name || 
            !newBooking.phone || 
            !newBooking.date || 
            !newBooking.paymentMethod ||
            (newBooking.qty !== undefined && newBooking.qty < 1)
        ) {
             console.log("Validation failed. Missing info or qty < 1. Qty:", newBooking.qty);
             if (newBooking.qty < 1) {
                 return res.status(400).json({ success: false, message: 'Số lượng khách tối thiểu là 1.' });
            }
            return res.status(400).json({ success: false, message: 'Thiếu thông tin.' });
        }

        const bookingCode = generateBookingCode();
        console.log("Generated booking code:", bookingCode);
        
        const record = new Booking({
            code: bookingCode,
            name: newBooking.name,
            phone: newBooking.phone,
            date: newBooking.date,
            qty: newBooking.qty,
            paymentMethod: newBooking.paymentMethod,
            totalPrice: newBooking.totalPrice,
            depositAmount: newBooking.depositAmount
        });

        console.log("Attempting to save record...");
        await record.save();
        console.log("Record saved successfully.");

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