const mongoose = require('mongoose');

let conn = null;
const connectDB = async () => {
    if (conn) return conn;
    try {
        conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        return conn;
    } catch (error) {
        throw new Error("Không thể kết nối DB");
    }
};

const BookingSchema = new mongoose.Schema({
    code: { type: String },
    name: { type: String },
    phone: { type: String },
    date: { type: String },
    qty: { type: Number },
    paymentMethod: { type: String },
    totalPrice: { type: Number },
    depositAmount: { type: Number },
    bookedAt: { type: Date }
});
const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Chỉ hỗ trợ GET' });
    }
    
    const { code } = req.query; 

    try {
        await connectDB();
        
        if (!code) {
            return res.status(400).json({ success: false, message: 'Vui lòng cung cấp mã booking.' });
        }

        const booking = await Booking.findOne({ code: code.toLowerCase() });

        if (booking) {
            res.status(200).json({ success: true, booking: booking });
        } else {
            res.status(404).json({ success: false, message: 'Không tìm thấy mã booking này.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
    }
}