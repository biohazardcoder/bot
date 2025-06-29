import mongoose from "mongoose";

const CodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  used:{
    type: Boolean,
    default: false
  },
  user:{type: String}
},{
  timestamps: true
});

export default mongoose.model("Code", CodeSchema);
