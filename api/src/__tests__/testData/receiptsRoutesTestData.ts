import { v4 as uuidv4 } from 'uuid';


export const sampleReceipt = {
    retailer: 'Walgreens',
    purchaseDate: '2022-01-02',
    purchaseTime: '08:13',
    total: '2.65',
    items: [
        { shortDescription: 'Pepsi - 12-oz', price: '1.25' },
        { shortDescription: 'Dasani', price: '1.40' }
    ]
};

export const getPointsTestData = {
    id: uuidv4(),
    receipt: sampleReceipt
};
