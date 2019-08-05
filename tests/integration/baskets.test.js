const request = require('supertest');
const { Basket } = require('../../models/basket');

let server;

describe('/api/v1/baskets', () => {
	beforeEach(() => {
		server = require('../../app');
	});
	afterEach(async () => {
		await server.close();
	});

	describe('POST /', () => {
		it('should return 400 if basket category is less than 3 characters', async () => {
			const res = await request(server).post('/api/vi/baskets');

			expect(res.status).toBe(404);
		});
	});
});
