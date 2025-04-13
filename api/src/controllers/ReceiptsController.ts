import { v4 as uuidv4 } from 'uuid';
import { ReceiptData, ReceiptIdResponse, PointsResponse } from '../types/receiptTypes';
import { receiptStore } from '..';
//TODO: Change 'any' return values to dedicated types

export default class ReceiptsController {
  public async processReceipt(receiptData: ReceiptData): Promise<ReceiptIdResponse> {
    if (!receiptData.retailer || !receiptData.purchaseDate || !receiptData.purchaseTime || !receiptData.items || !receiptData.total) {
      throw new Error("Bad Request: Missing required fields.");
    }

    const receiptId = uuidv4();

    return {
      id: receiptId
    };
  }

  public async getPoints(id: string): Promise<PointsResponse> {
    // Calculate the points awarded for the receipt
    return { 
      "points": 32 
    };
  }
}
