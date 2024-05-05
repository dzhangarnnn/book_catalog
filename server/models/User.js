const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		bookmarks: [
			{
				bookId: String,
				read: Boolean
			}
		],
		roles: [{ type: String, ref: "Role" }]
	},
	{
		timestamps: true
	}
);

module.exports = model("User", userSchema);
