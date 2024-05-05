const express = require("express");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Token = require("../models/Token");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
	try {
		const users = await User.find();

		const list = users.map((user) => ({
			_id: user._id,
			name: user.name,
			email: user.email,
			bookmarks: user.bookmarks,
			roles: user.roles
		}));
		res.json(list);
	} catch (e) {
		res.status(500).json({
			message: "На сервере произошла ошибка. Попробуйте позже"
		});
	}
});

router
	.route("/:userId")
	.patch(auth, async (req, res) => {
		try {
			const { userId } = req.params;
			if (userId === req.user._id) {
				const { bookmarks, email, name } = req.body;
				const updatedUser = await User.findByIdAndUpdate(
					userId,
					{ bookmarks, email, name },
					{ new: true }
				);

				res.json({
					_id: updatedUser._id,
					name: updatedUser.name,
					email: updatedUser.email,
					roles: updatedUser.roles,
					bookmarks: updatedUser.bookmarks
				});
			} else {
				res.status(401).json({ message: "Пользователь не авторизован" });
			}
		} catch (e) {
			res.status(500).json({
				message: "На сервере произошла ошибка. Попробуйте позже"
			});
		}
	})
	.get(auth, async (req, res) => {
		try {
			const { userId } = req.params;

			if (userId === req.user._id) {
				const user = await User.findById(userId);
				res.json({
					_id: user._id,
					email: user.email,
					name: user.name,
					bookmarks: user.bookmarks,
					roles: user.roles
				});
			} else {
				res.status(401).json({ message: "Unauthorized" });
			}
		} catch (e) {
			res.status(500).json({
				message: "На сервере произошла ошибка. Попробуйте позже"
			});
		}
	})
	.delete(role(["ADMIN"]), async (req, res) => {
		try {
			const { orderBy, equalTo } = req.query;

			await Comment.deleteMany({ [orderBy]: equalTo });
			await Token.deleteOne({ user: equalTo });
			await User.deleteOne({ _id: equalTo });

			return res.send(null);
		} catch (e) {
			res.status(500).json({
				message: "На сервере произошла ошибка. Попробуйте позже"
			});
		}
	});

module.exports = router;
