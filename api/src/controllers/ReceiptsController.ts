import { v4 as uuidv4 } from 'uuid';
import { receiptStore } from '..';
import {
    ReceiptData,
    ReceiptIdResponse,
    PointsResponse
} from '../types/receiptTypes';
import { BadRequestError, NotFoundError } from '../utils/error';


export default class ReceiptsController {
    public async processReceipt(
        receiptData: ReceiptData
    ): Promise<ReceiptIdResponse> {
        try {
            const receiptId = uuidv4();

            receiptStore.set(receiptId, receiptData);

            return {
                id: receiptId
            };
        } catch (error) {
            throw new BadRequestError('Failed to process receipt.');
        }
    }

    public async getPoints(id: string): Promise<PointsResponse> {
        try {
            const receiptData = receiptStore.get(id);

            if (!receiptData) {
                throw new NotFoundError('No receipt found for that ID.');
            }

            if (!this.isValidReceipt(receiptData)) {
                throw new BadRequestError('The receipt is invalid.');
            }

            const { retailer, total, items, purchaseDate, purchaseTime } =
                receiptData;

            let points = 0;

            points += this.calculateRetailerPoints(retailer);
            points += this.calculateEvenDollarTotalPoints(total);
            points += this.calculateQuarterDollarTotalPoints(total);
            points += this.calculateEveryTwoItemsPoints(items);
            points += this.calculateTrimmedItemDescriptionPoints(items);
            points += this.calculateOddPurchaseDatePoints(purchaseDate);
            points += this.calculateAfternoonPurchaseTimePoints(purchaseTime);

            return { points };
        } catch (error) {
            throw error;
        }
    }

    private isValidReceipt(receiptData: ReceiptData): boolean {
        return (
            typeof receiptData.retailer === 'string' &&
            typeof receiptData.total === 'string' &&
            Array.isArray(receiptData.items) &&
            receiptData.items.every(
                (item) =>
                    typeof item.shortDescription === 'string' &&
                    typeof item.price === 'string'
            ) &&
            typeof receiptData.purchaseDate === 'string' &&
            typeof receiptData.purchaseTime === 'string'
        );
    }

    private calculateRetailerPoints(retailer: string): number {
        return retailer.replace(/[^a-zA-Z0-9]/g, '').length;
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
        items: Array<{ shortDescription: string; price: string }>
    ): number {
        let points = Math.floor(items.length / 2) * 5;

        return points;
    }

    private calculateTrimmedItemDescriptionPoints(
        items: Array<{ shortDescription: string; price: string }>
    ): number {
        let points = 0;
        items.forEach((item) => {
            if (item.shortDescription.trim().length % 3 === 0) {
                points += Math.round(Number(item.price));
            }
        });

        return points;
    }

    private calculateOddPurchaseDatePoints(purchaseDate: string): number {
        const purchaseDay = new Date(purchaseDate).getDate();
        return purchaseDay % 2 !== 0 ? 6 : 0;
    }

    private calculateAfternoonPurchaseTimePoints(purchaseTime: string): number {
        const purchaseHour = new Date(`1970-01-01T${purchaseTime}Z`).getHours();
        return purchaseHour >= 14 && purchaseHour < 16 ? 10 : 0;
    }
}
