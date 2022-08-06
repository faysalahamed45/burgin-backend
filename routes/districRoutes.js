const express = require("express");
// const {
//   registerUser,
//   getAllUser,
//   getSingleUser,
//   updateUserRole,
//   deleteUser,
// } = require("../controllers/adminController");
const {AddDistric,DistricThana} = require("../controllers/districtController")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/distric")
  .post(isAuthenticatedUser, AddDistric);
router
  .route("/districThana/:id")
  .post(isAuthenticatedUser, DistricThana);


module.exports = router;
