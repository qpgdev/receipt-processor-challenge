export type Item = {
  shortDescription: string;
  price: string;
};

export type ReceiptData = {
  retailer: string;
  purchaseDate: string;
  purchaseTime: string;
  items: Item[];
  total: string;
};

export type ReceiptIdResponse = {
  id: string;
};

export type PointsResponse = {
  points: number;
};
