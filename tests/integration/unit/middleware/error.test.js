const error = require("../../../../middleware/error");

describe("Error handler middleware", () => {
	let req;

	let res;

	const next = jest.fn();

	/**
	 * Reset the `req` and `res` object before each test is ran.
	 */
	beforeEach(() => {
		req = {
			params: {},
			body: {},
		};

		res = {
			data: null,
			code: null,
			status(status) {
				this.code = status;
				return this;
			},
			send(payload) {
				this.data = payload;
			},
		};

		next.mockClear();
	});

	it("should handle error", () => {
		error(new Error(), req, res, next);

		expect(res.code).toBeDefined();
		expect(res.code).toBe(500);

		expect(res.data).toBeDefined();
		expect(res.data).toBe("Something broke!");
	});
});
