import { v4 as uuidv4 } from "uuid";
import { receiptStore } from "..";
import {
  ReceiptData,
  ReceiptIdResponse,
  PointsResponse,
} from "../types/receiptTypes";


export default class ReceiptsController {
  public async processReceipt(
    receiptData: ReceiptData,
  ): Promise<ReceiptIdResponse> {
    const receiptId = uuidv4();

    receiptStore.set(receiptId, receiptData);

    return {
      id: receiptId,
    };
  }

  public async getPoints(id: string): Promise<PointsResponse> {
    const receiptData = receiptStore.get(id);
    console.log("receiptData", receiptData);

    if (!receiptData) {
      throw new Error("No receipt found for that ID.");
    }

    if (!this.isValidReceipt(receiptData)) {
      throw new Error("The receipt is invalid.");
    }

    const { retailer, total, items, purchaseDate, purchaseTime } = receiptData;

    let points = 0;

    points += this.calculateRetailerPoints(retailer);
    points += this.calculateEvenDollarTotalPoints(total);
    points += this.calculateQuarterDollarTotalPoints(total);
    points += this.calculateEveryTwoItemsPoints(items);
    points += this.calculateTrimmedItemDescriptionPoints(items);
    points += this.calculateOddPurchaseDatePoints(purchaseDate);
    points += this.calculateAfternoonPurchaseTimePoints(purchaseTime);

    return { points };
  }

  private isValidReceipt(receiptData: ReceiptData): boolean {
    return (
      typeof receiptData.retailer === "string" &&
      typeof receiptData.total === "string" &&
      Array.isArray(receiptData.items) &&
      receiptData.items.every(
        (item) =>
          typeof item.shortDescription === "string" &&
          typeof item.price === "string",
      ) &&
      typeof receiptData.purchaseDate === "string" &&
      typeof receiptData.purchaseTime === "string"
    );
  }

  private calculateRetailerPoints(retailer: string): number {
    return retailer.replace(/[^a-zA-Z0-9]/g, "").length;
  }

  private calculateEvenDollarTotalPoints(total: string): number {
    let points = 0;
    const totalValue = parseFloat(total);

    if (totalValue % 1 === 0) {
      points += 50;
    }

    return points;
  }

  private calculateQuarterDollarTotalPoints(total: string): number {
    let points = 0;
    const totalValue = parseFloat(total);

    if (totalValue % 0.25 === 0) {
      points += 25;
    }

    return points;
  }

  private calculateEveryTwoItemsPoints(
    items: Array<{ shortDescription: string; price: string }>,
  ): number {
    let points = Math.floor(items.length / 2) * 5;

    return points;
  }

  private calculateTrimmedItemDescriptionPoints(
    items: Array<{ shortDescription: string; price: string }>,
  ): number {
    let points = 0;

    // Logic goes here

    return points;
  }

  private calculateOddPurchaseDatePoints(purchaseDate: string): number {
    // Check logic
    const purchaseDay = new Date(purchaseDate).getDate();
    return purchaseDay % 2 !== 0 ? 6 : 0;
  }

  private calculateAfternoonPurchaseTimePoints(purchaseTime: string): number {
    // Check logic
    const purchaseHour = new Date(`1970-01-01T${purchaseTime}Z`).getHours();
    return purchaseHour >= 14 && purchaseHour < 16 ? 10 : 0;
  }
}
