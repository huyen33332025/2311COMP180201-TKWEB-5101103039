const mongoose = require('mongoose');

let connLookup = null;
const connectDBLookup = async () => {
    if (connLookup) return connLookup;
    try {
        connLookup = await mongoose.connect(process.env.MONGODB_URI, {
             serverSelectionTimeoutMS: 5000
        });
        console.log("MongoDB connected successfully for lookup");
        return connLookup;
    } catch (error) {
         console.error("Lỗi kết nối MongoDB (lookup):", error);
        throw new Error("Không thể kết nối DB");
    }
};

const BookingLookupSchema = new mongoose.Schema({
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

const BookingLookup = mongoose.models.Booking || mongoose.model('Booking', BookingLookupSchema);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Chỉ hỗ trợ GET' });
    }
    
    const { code } = req.query; 

    try {
        await connectDBLookup();
        
        if (!code) {
            return res.status(400).json({ success: false, message: 'Vui lòng cung cấp mã booking.' });
        }
        
        const booking = await BookingLookup.findOne({ code: { $regex: new RegExp(`^${code}$`, 'i') } });

        if (booking) {
            res.status(200).json({ success: true, booking: booking });
        } else {
            res.status(404).json({ success: false, message: 'Không tìm thấy mã booking này.' });
        }
    } catch (error) {
        console.error('Lỗi trong API handler /api/lookup:', error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
    }
}