import request from "supertest";
import app from "../src/app.js";

describe("Authentication API", () => {
  const user = {
    name: "test user",
    password: "test1234",
    email: `test${Date.now()}@gmail.com`,
    confirmPassword: "test1234",
  };

  beforeAll(async () => {
    await request(app).post("/api/auth/register").send(user);
  });

  test("should login successfully", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
  });

  test("should reject wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.status).toBe("fail");
  });
});
