const mongoose = require("mongoose");
const { User } = require("../../../../models/User");
const auth = require("../../../../middleware/auth");

describe("auth middleware", () => {
  it("Should populate req.user with the payload of a valid jwt", async () => {
    const user = {
      _id: mongoose.Types.ObjectId().toHexString()
    };

    const token = new User(user).generateAuthToken();

    const req = {
      header: jest.fn().mockReturnValue(token)
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toMatchObject(user);
  });
});
