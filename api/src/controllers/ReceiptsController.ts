interface ReceiptResponse {
  message: string;
}

export default class ReceiptsController {
  public async getMessage(): Promise<ReceiptResponse> {
    return {
      message: "pong",
    };
  }
}
