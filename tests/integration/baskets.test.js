const request = require('supertest');
const { Basket } = require('../../models/basket');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('/api/v1/baskets', () => {
	let token;
	let user1;

	beforeEach(async () => {
		server = require('../../app');

		await Basket.deleteMany({});
		await User.deleteMany({});

		// create new user
		user1 = new User({
			name: 'Sendikadiwa',
			email: 'sendi.stev@gmail.com',
			password: 'stev30@K',
		});
		await user1.save();

		// Create a new basket
		basket = new Basket({
			category: 'Home Shopping',
			description: 'Buy items that can last for a month',
			user: user1._id,
		});
		await basket.save();
		token = new User(user1).generateAuthToken();
	});
	afterEach(async () => {
		server.close();
		await Basket.deleteMany({});
		await User.deleteMany({});
	});

	describe('GET /', () => {
		// token = new User().generateAuthToken();

		const exec = async () => {
			return await request(server)
				.get('/api/v1/baskets')
				.set('x-auth-token', token)
				.send();
		};

		it('Should get all baskets created by the user', async () => {
			const res = await exec();

			expect(res.status).toBe(200);
			expect(res.body).toHaveLength(1);
		});

		it('Should return 401 if user gets baskets when not logged in', async () => {
			token = '';
			const res = await exec();

			expect(res.status).toBe(401);
		});
	});
});
