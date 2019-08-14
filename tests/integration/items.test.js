const request = require("supertest");
const mongoose = require("mongoose");
const { Basket } = require("../../models/basket");
const { User } = require("../../models/user");

describe("/api/v1/baskets/bID/items", () => {
	let server;
	let basketId;
	let basket;
	let token;
	let item;
	let newUser;

	beforeEach(async () => {
		server = require("../../app");

		await Basket.deleteMany({});

		newUser = new User({
			name: "kamukama",
			email: "kam@gmail.com",
			password: "ka34dhdhchf3_dd",
		});

		await newUser.save();

		basket = new Basket({ category: "This is a category", user: newUser._id });

		token = new User(newUser).generateAuthToken();

		// create item
		item = {
			name: "Learn node",
		};
		basket.items.push(item);

		await basket.save();

		basketId = basket._id;
	});

	afterEach(async () => {
		await Basket.deleteMany({});
		await User.deleteMany({});
		server.close();
	});

	const exec = async () => {
		return await request(server)
			.post(`/api/v1/baskets/${basketId}/items`)
			.set("x-auth-token", token)
			.send(item);
	};

	describe("POST /:bID/items", () => {
		it("should save the item if info provided is valid", async () => {
			const res = await exec();
			expect(res.status).toBe(200);
			const mybasket = await Basket.findOne({ category: "This is a category" });
			expect(mybasket.items.body).not.toBeNull();
		});
		it("should return the item if valid", async () => {
			const res = await exec();
			// const mybasket = await Basket.findOne({ category: "This is a category" });
			expect(res.body).not.toBeNull();
		});
		it("should return 401 if user not logged in", async () => {
			token = "";
			const res = await exec();
			expect(res.status).toBe(401);
		});
		it("Should return 401 user is unauthorized", async () => {
			token = new User().generateAuthToken();
			const res = await exec();
			expect(res.status).toBe(401);
		});
		it("Should return 404 if basket ID is not found", async () => {
			basketId = mongoose.Types.ObjectId();
			const res = await exec();
			expect(res.status).toBe(404);
		});
		it("Should return 401 if basket ID is not found", async () => {
			basketId = mongoose.Types.ObjectId();
			const res = await exec();
			expect(res.status).toBe(404);
		});
		it("Should return 400 if name  is more than 50 characters", async () => {
			item.name = new Array(58).join("f");
			const res = await exec();
			expect(res.status).toBe(400);
		});
	});
	describe("DELETE /:bID/items/:item_id", () => {
		let token;
		let basket;
		let bId;
		let item_id;
		let item;

		const exec = async () => {
			return await request(server)
				.delete(`/api/v1/baskets/${bId}/items/${item_id}`)
				.set("x-auth-token", token)
				.send();
		};

		beforeEach(async () => {
			basket = new Basket({ category: "This is a category to delete", user: newUser._id });

			item = {
				name: "Item to delete",
			};
			basket.items.push(item);

			await basket.save();

			bId = basket._id;

			// -----------------
			item_id = basket.items[0]._id;

			token = new User(newUser).generateAuthToken();
		});
		it("Should return 404 if basket id is not found", async () => {
			bId = mongoose.Types.ObjectId();
			const res = await exec();
			expect(res.status).toBe(404);
		});
		it("Should return 404 if item id is not found", async () => {
			item_id = mongoose.Types.ObjectId();
			const res = await exec();
			expect(res.status).toBe(404);
		});
		it("should return 401 if user not logged in", async () => {
			token = "";
			const res = await exec();
			expect(res.status).toBe(401);
		});
		it("Should return 401 user is unauthorized", async () => {
			token = new User().generateAuthToken();
			const res = await exec();
			expect(res.status).toBe(401);
		});

		it("Should delete the item if valid", async () => {
			const res = await exec();
			expect(res.status).toBe(200);
		});
	});
});
