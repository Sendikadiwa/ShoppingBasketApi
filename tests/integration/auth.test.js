const { User } = require('../../models/user');
const request = require('supertest');

let server;
let dummyUser;

describe('/api/v1/auth', () => {
	beforeEach(async () => {
		server = require('../../app');

		await User.deleteMany({});

		// Create a new user
		dummyUser = {
			name: 'Sendi',
			email: 'kadiwa@gmail.com',
			password: 'ka34@diwa-',
		};
		await new User(dummyUser).save();
	});

	afterEach(async () => {
		server.close();
		await User.deleteMany({});
	});

	describe('POST /', () => {
		let email;
		let password;

		const exec = async () => {
			return await request(server)
				.post('/api/v1/auth')
				.send({ email, password });
		};

		it('Should return 400 if email address is invalid', async () => {
			email = '';
			const res = await exec();
			expect(res.status).toBe(400);
		});
		it('Should return 400 if password is invalid', async () => {
			password = 'tty';
			const res = await exec();
			expect(res.status).toBe(400);
		});
		it('Should return 400 if user email does not exist', async () => {
			email = 'tty@gmail.com';
			const res = await exec();
			const user = await User.findOne({ email: email });
            expect(res.status).toBe(400);
            expect(user).toBeNull()
		});
		it('Should login existing user if credentials are valid', async () => {
			email = dummyUser.email;
			password = dummyUser.password;
			const res = await exec();
			expect(res.status).toBe(200);
            
            const user = await User.findOne({ email: email });
            expect(user).not.toBeNull()

		});
	});
});
