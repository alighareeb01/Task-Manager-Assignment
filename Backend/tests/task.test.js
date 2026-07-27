import request from "supertest";
import app from "../src/app.js";
import { createUserAndGetToken } from "./utils/authHelper.js";

describe("Task API", () => {
  let token;
  let taskId;

  beforeEach(async () => {
    token = await createUserAndGetToken();
  });

  test("should create a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TEST TASK",
        description: "TEST DESCRIPTION",
        status: "To Do",
        priority: "High",
        dueDate: "2026-07-30",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("success");

    taskId = res.body.data.task._id;
  });

  test("should get all tasks", async () => {
    await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TASK ONE",
        description: "DESCRIPTION",
        status: "To Do",
        priority: "Medium",
      });

    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
  });

  test("should get a single task", async () => {
    const create = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "GET TASK",
        description: "DESCRIPTION",
        status: "To Do",
        priority: "Low",
      });

    taskId = create.body.data.task._id;

    const res = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");

    expect(res.body.data.task._id).toBe(taskId);
  });

  test("should update a task", async () => {
    const create = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "OLD TITLE",
        description: "DESCRIPTION",
        status: "To Do",
        priority: "Low",
      });

    taskId = create.body.data.task._id;

    const res = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "UPDATED TITLE",
        status: "Done",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");

    expect(res.body.data.task.title).toBe("UPDATED TITLE");

    expect(res.body.data.task.status).toBe("Done");
  });

  test("should delete a task", async () => {
    const create = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "DELETE TASK",
        description: "DESCRIPTION",
        status: "To Do",
        priority: "High",
      });

    taskId = create.body.data.task._id;

    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
