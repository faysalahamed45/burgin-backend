const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const {
  ServiceCategory,
  VendorServiceCategory,
  VendorEducation,
  VendorWorkExperience,
  VendorProfile,
} = require("../models/vendorModel");
const User = require("../models/userModel");
// const sendToken = require("../utils/jwtToken");
// const sendEmail = require("../utils/sendEmail");
// const crypto = require("crypto");
const cloudinary = require("cloudinary");

// AddServiceCategory
exports.addServiceCategory = catchAsyncErrors(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });

  const { name, status, image } = req.body;

  const user = await ServiceCategory.create({
    name,
    status,
    image,
    // avatar: {
    //   public_id: myCloud.public_id,
    //   url: myCloud.secure_url,
    // },
  });
  res.status(200).json({
    success: true,
    user,
  });
  // sendToken(user, 201, res);
});

// AddVendorServiceCategory
exports.addVendorServiceCategory = catchAsyncErrors(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });

  const { categoryId, description, status } = req.body;
  const category = {
    categoryId,
    description,
    status,
  };
  const ServiceCategory = await User.find({});

  const isVendorId = ServiceCategory.find(
    (rev) => rev._id.toString() === req.user._id.toString()
  );

  if (isVendorId) {
		ServiceCategory.forEach((rev) => {
			if(rev._id.toString() === req.user._id.toString()){
				rev.
				serviceCategory
				.push(category);
				rev.save();
			}
		})
  } else {
		return next(new ErrorHander("User in not valid"))
  }

  // avatar: {
  //   public_id: myCloud.public_id,
  //   url: myCloud.secure_url,
  // },
  // });
  res.status(200).json({
    success: true,
    ServiceCategory,
  });
});

// AddVendorEducation



exports.addVendorEducation = catchAsyncErrors(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });

  const { degreeName, institute, board, passingYear, cgpa } = req.body;
	const educationDetail = {
		degreeName, institute, board, passingYear, cgpa
	}
  const VendorEducation = await User.find({});

  const isVendorId = VendorEducation.find(
    (rev) => rev._id.toString() === req.user._id.toString()
  );

  if (isVendorId) {
		VendorEducation.forEach((rev) => {
			if(rev._id.toString() === req.user._id.toString()){
				rev.
				education
				.push(educationDetail);
				rev.save();
			}
		})
  } else {
		return next(new ErrorHander("User in not valid"))
  }

  // avatar: {
  //   public_id: myCloud.public_id,
  //   url: myCloud.secure_url,
  // },
  // });
  res.status(200).json({
    success: true,
    VendorEducation,
  });
});

// getVendorEducation
exports.getVendorEducation = catchAsyncErrors(async (req, res, next) => {
  let user = await VendorEducation.find({ vendorId: req.user._id }).populate(
    "vendorId"
  );
  // user = await user.populate('User')

  res.status(200).json({
    success: true,
    user,
  });
});

// AddVendorWorkExperience
exports.addVendorWorkExperience = catchAsyncErrors(async (req, res, next) =>{
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });

  const { categoryId, employe, role } = req.body;
  const experineceDetail = {
    categoryId, employe, role,
  };
  const WorkExperience = await User.find({});
  const isVendorId = WorkExperience.find(
    (rev) => rev._id.toString() === req.user._id.toString()
  );

  if (isVendorId) {
		WorkExperience.forEach((rev) => {
			if(rev._id.toString() === req.user._id.toString()){
				rev.experinece.push(experineceDetail);
				rev.save();
			}
		})

  } else {
  	return next(new ErrorHander("User in not valid"));
  }

  // avatar: {
  //   public_id: myCloud.public_id,
  //   url: myCloud.secure_url,
  // },
  // });
  res.status(200).json({
    success: true,
    WorkExperience,
  });
});

// getVendorWorkExperience
exports.getVendorWorkExperience = catchAsyncErrors(async (req, res, next) =>{
	// findOne({ _id: id })
	const VendorWork = await VendorWorkExperience.find({
		vendorId:req.user._id});
  res.status(200).json({
    success: true,
    VendorWork,
  });
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find({});

  res.status(200).json({
    success: true,
    user,
  });
});

// Get User Detail
exports.addVendorDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await VendorProfile.create({vendorId: req.user._id});
  // populate("User","ServiceCategory","VendorWorkExperience,Vendor

  console.log(user);

  res.status(200).json({
    success: true,
    user,
  });
});

// Get User Detail
exports.getVendorDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await VendorProfile.findById(req.user._id)
    .populate("vendorId")
    .populate("category")
    .populate("experience")
    .populate("education")
    .exec();
  // populate("User","ServiceCategory","VendorWorkExperience,Vendor

  console.log(user);

  res.status(200).json({
    success: true,
    user,
  });
});

//get vendor profile
exports.getVendorProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    // email: req.body.email,
  };

  // if (req.body.avatar !== "") {
  //   const user = await User.findById(req.user.id);

  //   const imageId = user.avatar.public_id;

  //   await cloudinary.v2.uploader.destroy(imageId);

  //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //     folder: "avatars",
  //     width: 150,
  //     crop: "scale",
  //   });

  //   newUserData.avatar = {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   };
  // }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// find location wise vendor profile
exports.getVendorByLocation = catchAsyncErrors(async (req, res, next) => {
	const {districName,thanaName,categoryId}= req.body;
  const user = await User.find({districName,thanaName});



  // if (isVendorId) {
	// 	WorkExperience.forEach((rev) => {
	// 		if(rev._id.toString() === req.user._id.toString()){
	// 			rev.experinece.push(experineceDetail);
	// 			rev.save();
	// 		}
	// 	})
   let conditions = [];

	 const newUser = user.map(rev=>{
		const category = categoryId;
		let isCheck=false;
		const iscategory= rev.serviceCategory.find(rev2=>rev2.categoryId.toString()===category

		)
		// console.log(isCheck);
		if(iscategory){
			conditions.push(rev);
			// return next(new ErrorHander("category is not found"))
		}

	 })

	 console.log(conditions);
	// const findUser = user.filter(rev=>{
	// 	const id  = rev.serviceCategory._id;
	// 	id.find(rev=>rev._id)
	// 	if(id===categoryId){
	// 		return rev
	// 	}
	// }
	// )

	// const Distric = user.find(distric=>distric.districName===districName);

	// const Thana = Distric.map(distric=>{
	// 	return distric.thanaName===thanaName});

	// if (Thana) {
	// 	Thana.forEach((rev) => {

	// 		const selecUser = rev.find(user=>{
	// 			return user.serviceCategory.categoryId===categoryId;
	// 		})
	// 	})}

// console.log(findUser);

  // if (!user) {
  //   return next(
  //     new ErrorHander(`User does not exist with Id: ${req.params.id}`)
  //   );
  // }

  res.status(200).json({
    success: true,
    conditions,
  });
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});
