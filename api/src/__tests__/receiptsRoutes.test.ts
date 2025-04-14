import request from "supertest";
import { v4 as _uuidv4, validate as validateUUID } from "uuid";
import {
  sampleReceipt,
  getPointsTestData,
} from "./testData/receiptsRoutesTestData";

import { app } from "../index";
import { receiptStore } from "..";
import { ReceiptData } from "../types/receiptTypes";
import ReceiptsRouter from "../routes/receiptsRoutes";
import express, { Application } from "express";

// TODO: Change to a testApp and testReceiptStore
// TODO: Use both example receipts given

// Tests for Process Receipts endpoint
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
  .end((err, _res) => {
    if (err) throw err;
    console.log("Test passed: Response contains a valid UUID id property");
  });

// Tests for Get Points endpoint
receiptStore.set(getPointsTestData.id, getPointsTestData.receipt);

request(app)
  .get(`/receipts/${getPointsTestData.id}/points`)
  .expect(200)
  .expect("Content-Type", /json/)
  .expect((res) => {
    if (!res.body.points)
      throw new Error("Response does not have points property");
  })
  .end((err, res) => {
    if (err) {
      console.error("Error response:", res.body);
      console.error("Response status:", res.status);
      throw err;
    }

    console.log(
      `Test passed for ID ${getPointsTestData.id}: Response contains points property`,
    );
  });
