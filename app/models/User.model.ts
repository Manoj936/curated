import bcrypt from "bcryptjs";
import mongoose, { models, Schema, model, Mongoose } from "mongoose";

const userEnum = ["user", "seller", "superuser"] as const;

export interface IUser {
  name: String;
  email: String;
  password:String;
  role: typeof userEnum[number];
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true, trim: true  },
    email: { type: String, required: true, trim: true, unique: true , index:true  },
    password:{type:String , required:true, },
    role: { type: String, enum: userEnum, required: true, default: "user" },
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
