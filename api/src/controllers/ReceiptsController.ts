interface ReceiptResponse {
  message: string;
}

export default class ReceiptsController {
  public async processReceipt(): Promise<ReceiptResponse> {
    // Assign an ID to the receipt
    // Return the ID assigned to the receipt
    return {
      message: "pong",
    };
  }
}
