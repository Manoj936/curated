import bcrypt from "bcryptjs";
import mongoose, { models, Schema, model } from "mongoose";

const userEnum = ["user", "seller", "superuser"] as const;

export interface IUser {
  name: String;
  email: String;
  password: String;
  role: (typeof userEnum)[number];
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  isAccountAcitve : Boolean,
  // Razorpay-specific fields for sellers
  razorpayContactId?: string;
  razorpayFundAccountId?: string;
  bankDetails?: {
    accountNumber: string;
    ifsc: string;
    bankName?: string;
    accountHolderName: string;
  };
  
}
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: userEnum, required: true, default: "user" },
    isAccountAcitve : {type:Boolean , required : true , default:true},
    // Razorpay fields (only required for sellers)
    razorpayContactId: { type: String },
    razorpayFundAccountId: { type: String },
    bankDetails: {
      accountNumber: { type: String },
      ifsc: { type: String },
      bankName: { type: String },
      accountHolderName: { type: String },
    },
  
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(this.password as string, 10);
    this.password = hashedPassword;
  }
  next();
});
const UserModel = models?.User || model<IUser>("User", UserSchema);

export default UserModel;
