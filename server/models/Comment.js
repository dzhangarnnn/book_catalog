const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
	{
		content: { type: String, required: true },
		// На чьей странице находится комментарий
		bookPageId: { type: String, required: true },
		// Кто оставил коммент
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
	},
	{
		timestamps: { createdAt: "created_at" }
	}
);

module.exports = model("Comment", commentSchema);
