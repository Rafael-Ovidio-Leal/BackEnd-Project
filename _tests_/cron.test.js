const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../src/app");

require("dotenv").config();

beforeEach(async () => {
    await mongoose.connect(process.env.DB_CONNECTION);
});

afterEach(async () => {
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe("GET /api/", () => {
    it("should return", async () => {
        const res = await request(app).get("/api/");
        expect(res.statusCode).toBe(200);
    });
});