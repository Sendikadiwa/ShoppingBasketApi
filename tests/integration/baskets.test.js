const request = require("supertest");
const mongoose = require("mongoose");
const { Basket } = require("../../models/Basket");
const { User } = require("../../models/User");

let server;

describe("/api/v1/baskets", () => {
  let token;
  let user1;
  let basket;
  beforeEach(async () => {
    server = require("../../app");

    await Basket.deleteMany({});
    await User.deleteMany({});

    // create new user
    user1 = new User({
      name: "Sendikadiwa",
      email: "sendi.stev@gmail.com",
      password: "stev30@K"
    });
    await user1.save();

    // Create a new basket
    basket = new Basket({
      category: "Home Shopping",
      description: "Buy items that can last for a month",
      user: user1._id
    });
    await basket.save();
    token = new User(user1).generateAuthToken();
  });
  afterEach(async () => {
    server.close();
    await Basket.deleteMany({});
    await User.deleteMany({});
  });

  describe("GET /", () => {
    // token = new User().generateAuthToken();

    const exec = async () => {
      return await request(server)
        .get("/api/v1/baskets")
        .set("x-auth-token", token)
        .send();
    };

    it("Should get all baskets created by the user", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
    });

    it("Should return 401 if user gets baskets when not logged in", async () => {
      token = "";
      const res = await exec();

      expect(res.status).toBe(401);
    });
  });

  describe("POST /", () => {
    let category;
    let description;

    const exec = async () => {
      return await request(server)
        .post("/api/v1/baskets")
        .set("x-auth-token", token)
        .send({ category, description });
    };
    beforeEach(() => {
      token = new User(user1).generateAuthToken();
      category = "This is my category";
      description = "This is a basket description";
    });

    it("Should return 400 if category is less than 3 characters", async () => {
      category = "c";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 400 if category is morethan than 50 characters", async () => {
      category = new Array(56).join("c");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 400 if description is morethan than 50 characters", async () => {
      description = new Array(56).join("c");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 401 if user is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });
    it("Should return 400 if user creates a duplicate basket", async () => {
      await exec();
      // duplicate basket
      const res = await request(server)
        .post("/api/v1/baskets")
        .set("x-auth-token", token)
        .send({
          category: "This is my category",
          description: "This is a basket description"
        });

      expect(res.status).toBe(400);
    });
    it("Should save the basket if it is valid", async () => {
      const res = await exec();
      expect(res.status).toBe(201);

      basket = await Basket.findOne({ category: "This is my category" });
      expect(basket).not.toBeNull();
    });
    it("Should return the basket if it is valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("category");
    });
  });

  describe("DELETE /:id", () => {
    let id;
    let user2;

    // create a global function
    const exec = async () => {
      return await request(server)
        .delete(`/api/v1/baskets/${id}`)
        .set("x-auth-token", token)
        .send();
    };

    beforeEach(async () => {
      basket = new Basket({
        category: "Category to delete",
        description: "Description to delete",
        completed: true,
        user: user1._id
      });
      await basket.save();

      id = basket._id;
      token = new User(user1).generateAuthToken();

      // create user2
      user2 = new User({
        name: "Mugabi",
        email: "mugabi2019@gmail.com",
        password: "muG20aBiz-=t"
      });
      await user2.save();
    });

    it("Should return 401 if user is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });
    it("Should return 404 if the id passed doesnot exist", async () => {
      id = 1;

      const res = await exec();
      expect(res.status).toBe(404);
    });
    it("Should return 404 if an invalid id is passed", async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();
      expect(res.status).toBe(404);
    });
    it("Should return 401 if user is an authorized to delete basket", async () => {
      token = new User(user2).generateAuthToken();

      const res = await exec();
      expect(res.status).toBe(401);
    });
    it("Should delete a basket if a valid id is passed", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      basket = await Basket.findOne({ category: "Category to delete" });
      expect(basket).toBeNull();
    });
    it("Should return a deleted basket", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id", basket._id.toHexString());
      expect(res.body).toHaveProperty("category", basket.category);
    });
  });

  describe("PUT /:id", () => {
    let user3;
    let id;
    let newcategory;
    let newdescription;
    let newcompleted;

    beforeEach(async () => {
      basket = new Basket({
        category: "This is the old category",
        description: "This is a description is the old one",
        completed: true,
        user: user1._id
      });
      await basket.save();

      user3 = new User({
        name: "Robert",
        email: "rob@gmail.com",
        password: "ribG20aBiz-=t"
      });
      await user3.save();

      id = basket._id;

      token = new User(user1).generateAuthToken();

      newcategory = "This category is updated";
      newdescription = "This description is updated";
      newcompleted = false;
    });

    const exec = async () => {
      return await request(server)
        .put(`/api/v1/baskets/${id}`)
        .set("x-auth-token", token)
        .send({
          category: newcategory,
          description: newdescription,
          completed: newcompleted
        });
    };

    it("Should return 400 if category is less than 3 characters", async () => {
      newcategory = "b";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 400 if category is morethan than 50 characters", async () => {
      newcategory = new Array(56).join("b");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 400 if description is less than than 10 characters", async () => {
      newdescription = "desc";
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 400 if category is morethan than 50 characters", async () => {
      newdescription = new Array(56).join("b");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("Should return 401 if user is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });
    it("Should return 401 if user updates a basket that he didnt create", async () => {
      token = new User(user3).generateAuthToken();
      const res = await exec();
      expect(res.status).toBe(401);
    });
    it("Should return 404 id passed doesnot exist", async () => {
      id = mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(404);
    });
    it("Should return 404 an invalid id is passed", async () => {
      id = 1;
      const res = await exec();
      expect(res.status).toBe(404);
    });
    it("Should save the basket if valid", async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("_id", basket._id.toHexString());
    });
  });
});
