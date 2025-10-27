const mongoose = require('mongoose');

let conn = null;

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

const BookingModel = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

const connectDB = async () => {
    if (conn) {
        console.log("Using existing DB connection.");
        return conn;
    }
    
    try {
        console.log("Attempting new DB connection. MONGODB_URI exists:", !!process.env.MONGODB_URI);
        conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000 
        });
        console.log("MongoDB connected successfully.");
        return conn;
    } catch (error) {
        console.error("Lỗi kết nối MongoDB:", error);
        throw new Error("Không thể kết nối DB");
    }
};

module.exports = {
    connectDB,
    BookingModel
};