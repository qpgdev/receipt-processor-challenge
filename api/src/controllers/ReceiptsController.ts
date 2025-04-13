import { v4 as uuidv4 } from "uuid";
import { ReceiptData, ReceiptIdResponse, PointsResponse } from "../types/receiptTypes";
import { receiptStore } from "..";


export default class ReceiptsController {
  public async processReceipt(receiptData: ReceiptData): Promise<ReceiptIdResponse> {
    const receiptId = uuidv4();

    receiptStore.set(receiptId, receiptData);

    return {
      id: receiptId
    };
  }

  public async getPoints(id: string): Promise<PointsResponse> {
    const receiptData = receiptStore.get(id);

    // TODO: Fix error handling
    if (!receiptData) {
      throw new Error('Receipt not found');
    }

    
    const { retailer, total, items, purchaseDate, purchaseTime } = receiptData;

    let points = 0;

    // TODO: Fix math here

    // One point for every alphanumeric character in the retailer name.
    points += retailer.replace(/[^a-zA-Z0-9]/g, '').length;

    // 50 points if the total is a round dollar amount with no cents.
    if (parseFloat(total) % 1 === 0) {
      points += 50;
    }

    // 25 points if the total is a multiple of 0.25.
    if (parseFloat(total) % 0.25 === 0) {
      points += 25;
    }

    // 5 points for every two items on the receipt.
    points += Math.floor(items.length / 2) * 5;

    //If the trimmed length of the item description is a multiple of 3, 
    // multiply the price by 0.2 and round up to the nearest integer. 
    // The result is the number of points earned.
    items.forEach(item => {
      const trimmedDescriptionLength = item.shortDescription.trim().length;
      if (trimmedDescriptionLength % 3 === 0) {
        const price = parseFloat(item.price);
        points += Math.ceil(price * 0.2);
      }
    });

    // 6 points if the day in the purchase date is odd.
    const purchaseDay = new Date(purchaseDate).getDate();
    if (purchaseDay % 2 !== 0) {
      points += 6;
    }

    // 10 points if the time of purchase is after 2:00pm and before 4:00pm.
    const purchaseHour = new Date(`1970-01-01T${purchaseTime}Z`).getHours();
    if (purchaseHour >= 14 && purchaseHour < 16) {
      points += 10;
    }

    return { points };
  }
}
