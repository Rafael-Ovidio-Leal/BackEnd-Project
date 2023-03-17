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

describe("GET /api/products/:code", () => {
    it("should return a product", async () => {
        const res = await request(app).get(
            "/api/products/0000000000017"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/products/:code", () => {
    it("should return a product", async () => {
        const res = await request(app).get(
            "/api/products/?page=1&pageSize=20"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("PUT  /api/products/:code", () => {
    it("should update a product", async () => {
        const res = await request(app)
            .put("/api/products/0000000000017")
            .send({
                "code": "0000000000017",
                "status": "published",
                "imported_t": "2023-03-17T03:31:24.851Z",
                "url": "http://world-en.openfoodfacts.org/product/0000000000017/vitoria-crackers",
                "creator": "kiliweb",
                "created_t": 1529059080,
                "last_modified_t": 1561463718,
                "product_name": "Vitória crackers",
                "quantity": "25",
                "brands": "test",
                "categories": "new",
                "labels": "test",
                "cities": "test",
                "purchase_places": "test",
                "stores": "test",
                "ingredients_text": "test",
                "traces": "test",
                "serving_size": "test",
                "serving_quantity": "test",
                "nutriscore_score": null,
                "nutriscore_grade": "test",
                "main_category": "test",
                "image_url": "https://static.openfoodfacts.org/images/products/000/000/000/0017/front_fr.4.400.jpg"
            });
        expect(res.statusCode).toBe(200);
    });
});

describe("DELETE /api/products/:id", () => {
    it("should delete a product", async () => {
      const res = await request(app).delete(
        "/api/products/0000000000017"
      );
      expect(res.statusCode).toBe(200);
    });
  })