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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ReceiptsController_1 = __importDefault(require("../controllers/ReceiptsController"));
const router = express_1.default.Router();
router.post("/receipts/process", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new ReceiptsController_1.default();
    const response = yield controller.processReceipt(req.body);
    res.send(response);
    return;
}));
router.get("/receipts/:id/points", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const controller = new ReceiptsController_1.default();
    //const controller = new ReceiptsController(req.params.id);
    const response = yield controller.getPoints(id);
    res.send(response);
    return;
}));
exports.default = router;
