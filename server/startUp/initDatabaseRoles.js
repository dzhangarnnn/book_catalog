const Role = require("../models/Role");

const rolesArr = [{ value: "ADMIN" }, { value: "USER" }];

module.exports = async () => {
	const roles = await Role.find();
	if (roles.length !== rolesArr) {
		await createInitialEntity(Role, rolesArr);
	}
};

async function createInitialEntity(Model, data) {
	await Model.collection.drop();
	return Promise.all(
		data.map(async (item) => {
			try {
				const newItem = new Model(item);
				await newItem.save();
				return newItem;
			} catch (e) {
				return e;
			}
		})
	);
}
