import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
},{
  timestamps: true
});

export default mongoose.model("User", UserSchema);
