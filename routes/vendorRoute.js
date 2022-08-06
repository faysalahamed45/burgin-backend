const express = require("express");
const {
// addServiceCategory,
addVendorServiceCategory,
addVendorEducation,
addVendorWorkExperience,
getVendorWorkExperience,
addVendorDetails,
getVendorDetails,
getVendorEducation,
getVendorProfile,
// getUserDetails,
updateProfile,
getVendorByLocation


} = require("../controllers/vendorController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// router.route("/category").post(isAuthenticatedUser,addServiceCategory);

router.route("/vendor/category").post(isAuthenticatedUser,addVendorServiceCategory);

router.route("/education").post(isAuthenticatedUser,addVendorEducation).get(isAuthenticatedUser,getVendorEducation);

router.route("/experience").post(isAuthenticatedUser,addVendorWorkExperience).get(isAuthenticatedUser, getVendorWorkExperience);


router.route("/vendor").post(isAuthenticatedUser, addVendorDetails).get(isAuthenticatedUser, getVendorProfile).put(isAuthenticatedUser,updateProfile);

router.route("/vendor/location").post(isAuthenticatedUser, getVendorByLocation)

// router.route("/vendor")



// router.route("/me/update").put(isAuthenticatedUser, updateProfile);

// router
//   .route("/admin/users")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

// router
//   .route("/admin/user/:id")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
