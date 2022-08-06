const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const {Distric,
	DistricThana} = require("../models/districtModel");



//Add All Distric
exports.AddDistric = catchAsyncErrors(async (req, res, next) => {
	const {districName}=req.body;
	const data = await Distric.create({districName})
	 res.status(200).json({
		 success: true,
		 data,
	 });
});

// AddVendorServiceCategory
exports.DistricThana = catchAsyncErrors(async (req, res, next) => {

  const {  districId,thanaName} = req.body;

  const thanaNames = {
		thanaName
  };
  const Districs = await DistricThana.find({});

  const isDistric = Districs.find(
    (rev) => rev.
		districId
		.toString() ===districId
  );

  if (isDistric) {
		Districs.forEach((rev) => {
			if(rev.districId
			.toString() === districId){
				rev.thana.push(thanaNames);
				rev.save();
				// res.end();
			}else{
				// console.log("error")
				return next(new ErrorHander("Distric not matched"))
			}
		})
  } else {
    DistricThana.create({
      // adminId: req.user._id,
			districId:districId,
      thana: [
        {
          thanaName
        },
      ],
    });
  }
  res.status(200).json({
    success: true,
    Districs: Districs,
  });
});