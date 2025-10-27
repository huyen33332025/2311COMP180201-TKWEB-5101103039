const { connectDB, BookingModel } = require('./db'); 

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
        
        const booking = await BookingModel.findOne({ code: { $regex: new RegExp(`^${code}$`, 'i') } });

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