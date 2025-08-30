import mongoose from "mongoose";
import bcrypt from "bcrypt";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // contact only, not login
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "doctor"], required: true },
  // specialization: { type: String, required: true },
  // experience: { type: Number, required: true }, // years of experience
  // hospital: { type: String }, // clinic/hospital name
  // availability: { type: [String], default: [] }, // e.g. ["Mon 9-12", "Wed 2-6"]
  // qualifications: { type: [String], default: [] }, // e.g. ["MBBS", "MD"]
  // address: { type: String }, // optional
});

const Doctor = mongoose.model("Doctor", doctorSchema);

doctorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
export default Doctor;
