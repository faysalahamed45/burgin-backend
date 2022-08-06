// Requiring module
const mongoose = require("mongoose");

// serviceCategory Modal Schema
const serviceCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

const vendorServiceCategorieSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: [
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
  },
  { timestamps: true }
);

// vendorEducation Modal Schema
const vendorEducationSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // vendorId:{
    // 	type: String,
    // },
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
  },
  { timestamps: true }
);

// vendorWorkExperience Modal Schema
const vendorWorkExperience = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: [
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
  },
  { timestamps: true }
);

// VendorProfile Modal Schema
const vendorProfileSchema = new mongoose.Schema(
  {
	  vendorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "VendorServiceCategory",
      // required: true,
    },
    experience: {
      type: mongoose.Types.ObjectId,
      ref: "VendorWorkExperience",
      // required: true,
    },
    education: {
      type: mongoose.Types.ObjectId,
      ref: "VendorEducation",
      // required: true,
    },
    // image: {
    //   data: Buffer,
    //   contentType: String,
    // },
    // description: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

// Creating model objects
const ServiceCategory = mongoose.model(
  "ServiceCategory",
  serviceCategorySchema
);
const VendorServiceCategory = mongoose.model(
  "VendorServiceCategory",
  vendorServiceCategorieSchema
);
const VendorEducation = mongoose.model(
  "VendorEducation",
  vendorEducationSchema
);
const VendorWorkExperience = mongoose.model(
  "VendorWorkExperience",
  vendorWorkExperience
);
const VendorProfile = mongoose.model("VendorProfile", vendorProfileSchema);

// Exporting our model objects
module.exports = {
  ServiceCategory,
  VendorServiceCategory,
  VendorEducation,
  VendorWorkExperience,
  VendorProfile,
};
