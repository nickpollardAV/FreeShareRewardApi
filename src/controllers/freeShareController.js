"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.FreeShareController = void 0;
const tsoa_1 = require("tsoa");
const getFreeShare_1 = require("../services/getFreeShare");
const testBroker_1 = require("../../test/testBroker");
const fs = __importStar(require("fs"));
const database_1 = require("../services/database");
let FreeShareController = class FreeShareController extends tsoa_1.Controller {
    constructor() {
        super();
        this.getFreeShareApp = new getFreeShare_1.GetFreeShareApp(new testBroker_1.TestBroker({ marketOpen: process.env.MARKET_OPEN === "true" }), new database_1.Database({
            totalSpentOnShares: 100,
            totalNumberOfSharesDistributed: 2,
            sharesAdded: JSON.parse(fs.readFileSync("./purchased-shares-for-rewards.json", "utf8")).shares
        }));
    }
    claimFreeShare(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const shareResponse = yield this.getFreeShareApp.getFreeShare(requestBody.userId);
            this.setStatus(200);
            return {
                shareId: shareResponse.shareId
            };
        });
    }
};
__decorate([
    (0, tsoa_1.SuccessResponse)("200", "Success"),
    (0, tsoa_1.Response)("400", "Bad Request"),
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)())
], FreeShareController.prototype, "claimFreeShare", null);
FreeShareController = __decorate([
    (0, tsoa_1.Route)("/claim-free-share")
], FreeShareController);
exports.FreeShareController = FreeShareController;
