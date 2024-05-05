const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next();
	}

	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const accessToken = authorizationHeader.split(" ")[1];
		if (!accessToken) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const data = tokenService.validateAccess(accessToken);
		if (!data) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		req.user = data;

		next();
	} catch (e) {
		res.status(401).json({ message: "Unauthorized" });
	}
};
