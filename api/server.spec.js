const server = require("./server");
const request = require("supertest");
const db = require("../database/dbConfig");
const bcryptjs = require("bcryptjs");
const hashed = bcryptjs.hashSync("12345", 12);
beforeEach(async () => {
  await db("users").truncate();
  await db("users").insert([
    { username: "test1", password: hashed },
    { username: "test2", password: hashed },
    { username: "test3", password: hashed }
  ]);
});

describe("POST /api/auth/register", () => {
  it("returns 201 on correct request", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "test4", password: "12345" });
    expect(res.status).toBe(201);
  });
  it("returns new user data on valid request", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "test4", password: "12345" });
    expect(res.body).toMatchObject({ username: "test4", id: 4 });
  });
});

describe("POST /api/auth/login", () => {
  it("returns 200 on correct request", () => {
    request(server)
      .post("/api/auth/login")
      .send({ username: "test1", password: "12345" })
      .expect(200);
  });
  it("returns new user data on valid request", () => {
    request(server)
      .post("/api/auth/login")
      .send({ username: "test1", password: "12345" })
      .expect({ id: 1, username: "", token: "" });
  });
});

describe("GET /api/jokes", () => {
  var token = null;

  beforeEach(function(done) {
    request(server)
      .post("/api/auth/login")
      .send({ username: "test1", password: "12345" })
      .end(function(err, res) {
        token = res.body.token; // Or something
        done();
      });
  });

  it("should get a valid token for user: test1", function() {
    request(server)
      .get("/api/jokes")
      .set("Authorization", token)
      .expect(200);
  });
  it("should return an array of jokes", function() {
    request(server)
      .get("/api/jokes")
      .set("Authorization", token)
      .expect(res=>{
          if(!(res.body.length>0)) throw new Error("doesn't return an array")
          
      });
  });
});
