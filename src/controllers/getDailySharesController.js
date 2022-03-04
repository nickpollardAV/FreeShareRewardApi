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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDailySharesController = void 0;
const tsoa_1 = require("tsoa");
const buyDailyShares_1 = require("../services/buyDailyShares");
const testBroker_1 = require("../../test/testBroker");
const testDatabase_1 = require("../../test/testDatabase");
let GetDailySharesController = class GetDailySharesController extends tsoa_1.Controller {
    getDailyShares(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const buyDailySharesApp = new buyDailyShares_1.BuyDailyShares(new testBroker_1.TestBroker({
                brokerTradableAssets: [
                    { tickerSymbol: "tickerId1", price: 10 },
                    { tickerSymbol: "tickerId2", price: 180 },
                    { tickerSymbol: "tickerId3", price: 2 },
                    { tickerSymbol: "tickerId4", price: 130 },
                    { tickerSymbol: "tickerId5", price: 60 },
                    { tickerSymbol: "tickerId6", price: 220 },
                    { tickerSymbol: "tickerId7", price: 180 },
                    { tickerSymbol: "tickerId8", price: 34 },
                    { tickerSymbol: "tickerId9", price: 111 },
                    { tickerSymbol: "tickerId10", price: 56 },
                    { tickerSymbol: "tickerId11", price: 30 },
                    { tickerSymbol: "tickerId12", price: 300 },
                    { tickerSymbol: "tickerId13", price: 22 }
                ],
                marketOpen: true
            }), new testDatabase_1.TestDatabase({
                totalSpentOnShares: 100,
                totalNumberOfSharesDistributed: 2
            }), 120);
            yield buyDailySharesApp.buyShares(requestBody.numberOfSharesToPurchase);
            this.setStatus(200); // set return status 201
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
