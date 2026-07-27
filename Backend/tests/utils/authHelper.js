import request from "supertest";
import app from "../../src/app.js";

export const createUserAndGetToken = async () => {
  console.log("CREATING USER");

  const user = {
    name: "test user",
    email: `test${Date.now()}@gmail.com`,
    password: "test1234",
    confirmPassword: "test1234",
  };

  const register = await request(app).post("/api/auth/register").send(user);

  console.log("REGISTER STATUS:", register.statusCode);
  console.log(register.body);

  const login = await request(app).post("/api/auth/login").send({
    email: user.email,
    password: user.password,
  });

  console.log("LOGIN STATUS:", login.statusCode);

  return login.body.token;
};
