import { v4 as uuidv4 } from "uuid";

export const calculateRetailerPointsTestData = {
  id: uuidv4(),
  test: "One point for every alphanumeric character in the retailer name.",
  receipt: {
    retailer: "Walgreens",
    purchaseDate: "",
    purchaseTime: "",
    total: "",
    items: [
      { shortDescription: "", price: "" },
      { shortDescription: "", price: "" },
    ],
  },
};

export const calculateEvenDollarTotalPointsTestData = {
  id: uuidv4(),
  test: "50 points if the total is a round dollar amount with no cents.",
  receipt: {
    retailer: "",
    purchaseDate: "",
    purchaseTime: "",
    total: "2.00",
    items: [
      { shortDescription: "", price: "" },
      { shortDescription: "", price: "" },
    ],
  },
};

export const calculateQuarterDollarTotalPointsTestData = {
  id: uuidv4(),
  test: "25 points if the total is a multiple of 0.25.",
  receipt: {
    retailer: "",
    purchaseDate: "",
    purchaseTime: "",
    total: "2.25",
    items: [
      { shortDescription: "", price: "" },
      { shortDescription: "", price: "" },
    ],
  },
};

export const calculateEveryTwoItemsPointsTestData = {
  id: uuidv4(),
  test: "5 points for every two items on the receipt.",
  receipt: {
    retailer: "",
    purchaseDate: "",
    purchaseTime: "",
    total: "",
    items: [
      { shortDescription: "Pepsi - 12-oz", price: "1.25" },
      { shortDescription: "Dasani", price: "1.40" },
    ],
  },
};

export const calculateTrimmedItemDescriptionPointsTestData = {
  id: uuidv4(),
  test: "If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.",
  receipt: {
    retailer: "",
    purchaseDate: "",
    purchaseTime: "",
    total: "",
    items: [
      { shortDescription: "Pepsi - 12-oz", price: "1.25" },
      { shortDescription: "Dasani", price: "1.40" },
    ],
  },
};

export const calculateOddPurchaseDatePointsTestData = {
  id: uuidv4(),
  test: "6 points if the day in the purchase date is odd.",
  receipt: {
    retailer: "Walgreens",
    purchaseDate: "2022-01-02",
    purchaseTime: "08:13",
    total: "2.65",
    items: [
      { shortDescription: "Pepsi - 12-oz", price: "1.25" },
      { shortDescription: "Dasani", price: "1.40" },
    ],
  },
};

export const calculateAfternoonPurchaseTimePointsTestData = {
  id: uuidv4(),
  test: "10 points if the time of purchase is after 2:00pm and before 4:00pm.",
  receipt: {
    retailer: "Walgreens",
    purchaseDate: "2022-01-02",
    purchaseTime: "08:13",
    total: "2.65",
    items: [
      { shortDescription: "Pepsi - 12-oz", price: "1.25" },
      { shortDescription: "Dasani", price: "1.40" },
    ],
  },
};
