"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiptStore = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const receiptsRoutes_1 = __importDefault(require("./routes/receiptsRoutes"));
exports.receiptStore = new Map();
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.static("public"));
app.use(receiptsRoutes_1.default);
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
