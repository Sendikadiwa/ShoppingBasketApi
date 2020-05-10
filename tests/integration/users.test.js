const request = require("supertest");
const { User } = require("../../models/User");

let server;

describe("/api/v1/users", () => {
  beforeEach(async () => {
    server = require("../../app");

    await User.deleteMany({});

    const user = new User({
      name: "Sendikadiwa",
      email: "sendi.stev@gmail.com",
      password: "@Std23_tr"
    });

    await user.save();
  });

  afterEach(async () => {
    server.close();

    await User.deleteMany({});
  });

  describe("POST /", () => {
    let name;
    let email;
    let password;

    beforeEach(async () => {});

    const exec = async () => {
      return await request(server)
        .post("/api/v1/users")
        .send({ name, email, password });
    };

    it("Should return 400 if user registers with username less than 3 characters", async () => {
      name = "a";
      email = "kats@example.com";
      password = "73&6ehehfkk";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("Should return 400 if user registers with username morethan 50 characters", async () => {
      name = new Array(54).join("w");
      email = "kats@example.com";
      password = "73&6ehehfkk";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("Should return 400 if user registers with empty spaces for username", async () => {
      name = "   ";
      email = "kats@example.com";
      password = "73&6ehehfkk";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("Should return 400 if user registers with an invalid email", async () => {
      name = "Namutebi";
      email = "kats.example";
      password = "73&6ehehfkk";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("Should return 400 if user registers with white spaces for email", async () => {
      name = "Namutebi";
      email = "  ";
      password = "73&6ehehfkk";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("Should return 400 if user registers with an email less than 10 characters", async () => {
      name = "Namutebi";
      email = "k@g.com";
      password = "73&6ehehfkk";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("Should return 400 if user registers with an email that already exists", async () => {
      name = "Namutebi";
      email = "sendi.stev@gmail.com";
      password = "73&6ehehfkk";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("Should return 400 if user registers with a password less than 5 characters", async () => {
      name = "Namutebi";
      email = "sendi.stev@gmail.com";
      password = "73";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("Should return 400 if user registers with white spaces for password", async () => {
      name = "Namutebi";
      email = "sendi.stev@gmail.com";
      password = "  ";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("Should save user if valid information is provided", async () => {
      name = "Namutebi";
      email = "namutebi21@gmail.com";
      password = "sa@ra23-na][";

      const res = await exec();

      expect(res.status).toBe(201);
    });

    it("Should return success message if signup sucess", async () => {
      const res = await exec();

      expect(res.body.msg).toBe("Congraturations! Signup success");
    });
  });
});
