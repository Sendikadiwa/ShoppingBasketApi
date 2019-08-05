const { User } = require('../../models/user');
const request = require('supertest');
let server;

describe('/api/v1/users', () => {
	beforeEach(async () => {
		server = require('../../app');

		await User.deleteMany({});

		const user = new User({
			name: 'Sendikadiwa',
			email: 'sendi.stev@gmail.com',
			password: '@Std23_tr',
		});

		await user.save();
	});

	afterEach(async () => {
		server.close();

		await User.deleteMany({});
	});

	describe('POST /', () => {
		let name;
		let email;
		let password;

		beforeEach(async () => {});

		const exec = async () => {
			return await request(server)
				.post('/api/v1/users')
				.send({ name, email, password });
		};

		it('Should return 400 if user registers with invalid username', async () => {
			name = 'a';
			email = 'kats@example.com';
			password = '73&6ehehfkk';

			const res = await exec();

			expect(res.status).toBe(400);
		});
	});
});
