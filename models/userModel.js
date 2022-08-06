const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
 name: {
  type: String,
  required: [true, "Please Enter Your Name"],
  maxLength: [30, "Name cannot exceed 30 characters"],
  minLength: [4, "Name should have more than 4 characters"],
 },
 email: {
  type: String,
  trim: true,
  lowercase: true,
  required: [false, "Please Enter Your Email"],
  unique: true,
  validate: [validator.isEmail, "Please Enter a valid Email"],
 },
 phoneNumber: {
  type: String,
  required: [true, "Please Enter Your phone"],
  unique: true,
 },
 password: {
  type: String,
  required: [false, "Please Enter Your Password"],
  minLength: [8, "Password should be greater than 8 characters"],
  select: false,
 },
 // avatar: {
 //   public_id: {
 //     type: String,
 //     required: true,
 //   },
 //   url: {
 //     type: String,
 //     required: true,
 //   },
 // },
 serviceCategory: [
	{
		categoryId: {
			type: mongoose.Types.ObjectId,
			ref: "ServiceCategory",
			required: true,
		},
		description: {
			type: String,
		},
		status: {
			type: String,
			enum: ["on", "off"],
			default: "on",
		},
	},
],
education:[
	{
		degreeName: {
      type: String,
    },
    institute: {
      type: String,
    },
    board: {
      type: String,
    },
    roll: {
      type: String,
    },
    passingYear: {
      type: String,
    },
    cgpa: {
      type: String,
    },
	}
],
experinece: [
	{
		categoryId: {
			type: mongoose.Types.ObjectId,
			ref: "ServiceCategory",
			required: true,
		},
		employe: {
			type: String,
		},
		role: {
			type: String,
		},
		startDate: Date,
		endDate: Date,
	},
],
 role: {
  type: String,
	enum: ["user", "vendor","admin"],
	default:"user"
	// required: true
 },
 gender: {
  type: String,
 },
 districName:{
	type: String
 },
 thanaName: {
	type: String,
 },
 nidNo: {
  type: String,
 },
 nidFrontImg: {
  data: Buffer,
  contentType: String,
 },
 nidBackImg: {
  data: Buffer,
  contentType: String,
 },
 gender: {
  type: String,
  enum: ["Male", "Female"],
 },
 nationality: {
  type: String,
  enum: ["Banglageshi", "others"],
 },
 dateOfBirth: Date,
 status: {
  type: String,
  enum: ["on", "off"],
  default: "on",
 },
//  createdAt: {
//   type: Date,
//   default: Date.now,
//  },

 resetPasswordToken: String,
 resetPasswordExpire: Date,
},
{ timestamps: true }
);

userSchema.pre("save", async function (next) {
 if (!this.isModified("password")) {
  next();
 }

 this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
 return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRE,
 });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
 return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
 // Generating Token
 const resetToken = crypto.randomBytes(20).toString("hex");

 // Hashing and adding resetPasswordToken to userSchema
 this.resetPasswordToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

 this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

 return resetToken;
};

module.exports = mongoose.model("User", userSchema);
