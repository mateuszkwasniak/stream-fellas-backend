const app = require("../index.js");
const request = require("supertest");
const mongoose = require("mongoose");

describe("GET /streamers", () => {
  it("should return all streamers", async () => {
    const result = await request(app).get("/streamers");

    expect(result.statusCode).toBe(200);
    expect(result.body.length).toBeGreaterThan(0);
  });
});

describe("GET /streamer/:streamerId", () => {
  it("should return a streamer with a given id if exists", async () => {
    const validTestIds = [
      "649c638ba9a08332f8798238",
      "649c63c4a9a08332f8798240",
      "649c63a9a9a08332f879823c",
    ];

    for (const testId of validTestIds) {
      const result = await request(app).get(`/streamer/${testId}`);

      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("_id", testId);
      expect(result.body).toHaveProperty("name");
      expect(result.body).toHaveProperty("platform");
      expect(result.body).toHaveProperty("description");
      expect(result.body).toHaveProperty("upvotes");
      expect(result.body).toHaveProperty("downvotes");
    }
  });

  it("should return status code 404 if a streamer with a given id does not exist", async () => {
    const invalidTestIds = [
      "549c638ba9a08332f8798235",
      "549c63c4a9a08332f8798244",
      "549c63a9a9a08332f8798233",
    ];

    for (const testId of invalidTestIds) {
      const result = await request(app).get(`/streamer/${testId}`);

      expect(result.status).toBe(404);
    }
  });
});

describe("POST /streamers", () => {
  it("should return updated list of all users after successfuly creating new one", async () => {
    const result = await request(app).post("/streamers").send({
      name: "Test",
      description:
        "This is some random description of a newly created streamer",
      platform: "YouTube",
    });

    expect(result.statusCode).toBe(201);
    expect(result.body.length).toBeGreaterThan(0);
  });

  it("should return status code 403 if added streamer already exists", async () => {
    const result = await request(app).post("/streamers").send({
      name: "Test",
      description:
        "This is some random description of a newly created streamer",
      platform: "YouTube",
    });

    expect(result.statusCode).toBe(403);
  });

  it("should return status code 400 if provided data format is invalid", async () => {
    const result = await request(app).post("/streamers").send({
      name: "X",
      description: "X",
      platform: "X",
    });

    expect(result.statusCode).toBe(400);
  });
});

describe("PUT /streamers/:streamerId/vote", () => {
  const testId = "649fed646c34d75e0d6b17e9";

  it("should increase the number of streamer's upvotes when type of vote is 'upvote'", async () => {
    const result = await request(app).get(`/streamer/${testId}`);
    const upvotes = result.body.upvotes;
    const resultSec = await request(app).put(`/streamers/${testId}/vote`).send({
      type: "upvote",
    });
    expect(resultSec.body.upvotes).toBe(upvotes + 1);
  });

  it("should increase the number of streamer's downvotes when type of vote is 'downvote'", async () => {
    const result = await request(app).get(`/streamer/${testId}`);
    const downvotes = result.body.downvotes;
    const resultSec = await request(app).put(`/streamers/${testId}/vote`).send({
      type: "downvote",
    });
    expect(resultSec.body.downvotes).toBe(downvotes + 1);
  });

  it("should decrease the number of streamer's upvotes when type of vote is 'resetUpvote'", async () => {
    const result = await request(app).get(`/streamer/${testId}`);
    const upvotes = result.body.upvotes;
    const resultSec = await request(app).put(`/streamers/${testId}/vote`).send({
      type: "resetUpvote",
    });
    expect(resultSec.body.upvotes).toBe(upvotes - 1);
  });

  it("should decrease the number of streamer's downvotes when type of vote is 'resetDownvote'", async () => {
    const result = await request(app).get(`/streamer/${testId}`);
    const downvotes = result.body.downvotes;
    const resultSec = await request(app).put(`/streamers/${testId}/vote`).send({
      type: "resetDownvote",
    });
    expect(resultSec.body.downvotes).toBe(downvotes - 1);
  });

  it("should increase the number of streamer's upvotes and decrase the number of streamer's downvotes when type of vote is 'togglePos'", async () => {
    const result = await request(app).get(`/streamer/${testId}`);
    const upvotes = result.body.upvotes;
    const downvotes = result.body.downvotes;
    const resultSec = await request(app).put(`/streamers/${testId}/vote`).send({
      type: "togglePos",
    });
    expect(resultSec.body.upvotes).toBe(upvotes + 1);
    expect(resultSec.body.downvotes).toBe(downvotes - 1);
  });

  it("should increase the number of streamer's downvotes and decrase the number of streamer's upvotes when type of vote is 'toggleNeg'", async () => {
    const result = await request(app).get(`/streamer/${testId}`);
    const upvotes = result.body.upvotes;
    const downvotes = result.body.downvotes;
    const resultSec = await request(app).put(`/streamers/${testId}/vote`).send({
      type: "toggleNeg",
    });
    expect(resultSec.body.upvotes).toBe(upvotes - 1);
    expect(resultSec.body.downvotes).toBe(downvotes + 1);
  });

  it("should return status code 400 when type of vote is invalid", async () => {
    const result = await request(app).put(`/streamers/${testId}/vote`).send({
      type: "unknown",
    });
    expect(result.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
