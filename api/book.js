const mongoose = require('mongoose');

let conn = null;
const connectDB = async () => {
    if (conn) {
        return conn;
    }
    try {
        conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
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
    qty: { type: Number, required: true },
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
            !newBooking.paymentMethod
        ) {
            return res.status(400).json({ success: false, message: 'Thiếu thông tin.' });
        }

        const bookingCode = generateBookingCode();
        
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

        await record.save();

        res.status(201).json({ success: true, bookingCode: bookingCode });

    } catch (error) {
        console.error('Lỗi khi lưu booking:', error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ: ' + error.message });
    }
}