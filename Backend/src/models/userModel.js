import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name IS REQUIRED"],
    },
    email: {
      type: String,
      required: [true, "email IS REQUIRED"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password IS REQUIRED"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      minlength: 8,
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Password do not match",
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

userSchema.methods.comparePassword = async function (
  currentPassord,
  userPassword,
) {
  return await bcrypt.compare(currentPassord, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
