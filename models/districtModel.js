const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema(
	{
				districName: {
					type: String,
				},
	},
  { timestamps: true }
);
const districThanaSchema = new mongoose.Schema(
	{
		// adminId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
		districId: {
      type: mongoose.Types.ObjectId,
      ref: "Distric",
      required: true,
    },
		thana: [
			{
				thanaName: {
					type: String,
				},
			},
		],
	},
  { timestamps: true }
);

const Distric = mongoose.model("Distric", districtSchema);
const DistricThana = mongoose.model("DistricThana", districThanaSchema);

module.exports ={
	Distric,
	DistricThana
};
