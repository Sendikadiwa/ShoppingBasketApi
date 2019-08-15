const request = require("supertest");
const { User } = require("../../models/User");

let server;
let dummyUser;

describe("/api/v1/auth", () => {
  beforeEach(async () => {
    server = require("../../app");

    await User.deleteMany({});

    // Create a new user
    dummyUser = {
      name: "Sendi",
      email: "kadiwa@gmail.com",
      password: "ka34@diwa-"
    };
    await new User(dummyUser).save();
  });

  afterEach(async () => {
    server.close();
    await User.deleteMany({});
  });

  describe("POST /", () => {
    const exec = async () => {
      return await request(server)
        .post("/api/v1/auth")
        .send({ email: dummyUser.email, password: dummyUser.password });
    };

    it("Should return 400 if email address is invalid", async () => {
      dummyUser.email = "kadwa@gmail.com";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 400 if password is invalid", async () => {
      dummyUser.password = "tty";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 400 if password is does not match the existing password", async () => {
      dummyUser.password = "ka34@diwa";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 400 if user email does not exist", async () => {
      dummyUser.email = "tty@gmail.com";
      const res = await exec();
      const user = await User.findOne({ email: dummyUser.email });
      expect(res.status).toBe(400);
      expect(user).toBeNull();
    });
    it("Should login existing user if credentials are valid", async () => {
      const res = await exec();
      expect(res.status).toBe(200);

      const user = await User.findOne({ email: dummyUser.email });
      expect(user).not.toBeNull();
    });
  });
});
