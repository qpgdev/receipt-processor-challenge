"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const __1 = require("..");
class ReceiptsController {
    processReceipt(receiptData) {
        return __awaiter(this, void 0, void 0, function* () {
            const receiptId = (0, uuid_1.v4)();
            __1.receiptStore.set(receiptId, receiptData);
            return {
                id: receiptId
            };
        });
    }
    getPoints(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const receiptData = __1.receiptStore.get(id);
            if (!receiptData) {
                throw new Error('Receipt not found');
            }
            const { retailer, total, items, purchaseDate, purchaseTime } = receiptData;
            let points = 0;
            points += retailer.replace(/[^a-zA-Z0-9]/g, '').length;
            if (parseFloat(total) % 1 === 0) {
                points += 50;
            }
            if (parseFloat(total) % 0.25 === 0) {
                points += 25;
            }
            points += Math.floor(items.length / 2) * 5;
            items.forEach(item => {
                const trimmedDescriptionLength = item.shortDescription.trim().length;
                if (trimmedDescriptionLength % 3 === 0) {
                    const price = parseFloat(item.price);
                    points += Math.ceil(price * 0.2);
                }
            });
            const purchaseDay = new Date(purchaseDate).getDate();
            if (purchaseDay % 2 !== 0) {
                points += 6;
            }
            const purchaseHour = new Date(`1970-01-01T${purchaseTime}Z`).getHours();
            if (purchaseHour >= 14 && purchaseHour < 16) {
                points += 10;
            }
            return { points };
        });
    }
}
exports.default = ReceiptsController;
