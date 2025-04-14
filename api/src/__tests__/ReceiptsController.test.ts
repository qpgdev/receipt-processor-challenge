import request from "supertest";
import { v4 as _uuidv4, validate as validateUUID } from "uuid";
import { app } from "../index";

const sampleReceipt = {
  retailer: "Walgreens",
  purchaseDate: "2022-01-02",
  purchaseTime: "08:13",
  total: "2.65",
  items: [
    { shortDescription: "Pepsi - 12-oz", price: "1.25" },
    { shortDescription: "Dasani", price: "1.40" },
  ],
};

request(app)
  .post("/receipts/process")
  .send(sampleReceipt)
  .expect(200)
  .expect("Content-Type", /json/)
  .expect((res) => {
    if (!res.body.id) throw new Error("Response does not have an id property");
    if (!validateUUID(res.body.id))
      throw new Error("Response id is not a valid UUID");
  })
  .end((err, res) => {
    if (err) throw err;
    console.log("Test passed: Response contains a valid UUID id property");
  });
