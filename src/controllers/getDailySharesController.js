"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.GetDailySharesController = void 0;
const tsoa_1 = require("tsoa");
const buyDailyShares_1 = require("../services/buyDailyShares");
const testBroker_1 = require("../../test/testBroker");
const testDatabase_1 = require("../../test/testDatabase");
const fs_1 = __importDefault(require("fs"));
let GetDailySharesController = class GetDailySharesController extends tsoa_1.Controller {
    constructor() {
        super();
        this.buyDailySharesApp = new buyDailyShares_1.BuyDailyShares(new testBroker_1.TestBroker({
            brokerTradableAssets: JSON.parse(fs_1.default.readFileSync("./example-broker-assets.json", "utf8")).brokerAssets,
            marketOpen: process.env.MARKET_OPEN === "true"
        }), new testDatabase_1.TestDatabase({
            totalSpentOnShares: +(process.env.TARGET_CPA || "100"),
            totalNumberOfSharesDistributed: 1
        }), +(process.env.TARGET_CPA || "100"), +(process.env.MINIMUM_SHARE_PRICE || "0"), +(process.env.MAXIMUM_SHARE_PRICE || "1000"));
    }
    getDailyShares(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buyDailySharesApp.buyShares(requestBody.numberOfSharesToPurchase);
            this.setStatus(200);
            return {
                success: true
            };
        });
    }
};
__decorate([
    (0, tsoa_1.SuccessResponse)("200", "Success"),
    (0, tsoa_1.Response)("400", "Bad Request"),
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)())
], GetDailySharesController.prototype, "getDailyShares", null);
GetDailySharesController = __decorate([
    (0, tsoa_1.Route)("/get-daily-shares")
], GetDailySharesController);
exports.GetDailySharesController = GetDailySharesController;
