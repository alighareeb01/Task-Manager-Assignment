import { jest } from "@jest/globals";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });

jest.setTimeout(15000);

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DATABASE);

  console.log("TEST DATABASE CONNECTED");
});

afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();

  console.log("TEST DATABASE CLOSED");
});
