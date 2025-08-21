"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const functions = __importStar(require("firebase-functions"));
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./api/routes/auth.routes"));
const products_routes_1 = __importDefault(require("./api/routes/products.routes"));
const sales_routes_1 = __importDefault(require("./api/routes/sales.routes"));
const status_routes_1 = __importDefault(require("./api/routes/status.routes"));
const stores_routes_1 = __importDefault(require("./api/routes/stores.routes"));
const main = (0, express_1.default)();
const apiRouter = (0, express_1.Router)();
main.use((0, cors_1.default)({ origin: true }));
main.use(express_1.default.json());
// Mount the specific routes on the apiRouter
apiRouter.use('/auth', auth_routes_1.default);
apiRouter.use('/products', products_routes_1.default);
apiRouter.use('/sales', sales_routes_1.default);
apiRouter.use('/status', status_routes_1.default);
apiRouter.use('/stores', stores_routes_1.default);
apiRouter.get('/test', (req, res) => res.send('API Test OK'));
// Mount the apiRouter under the /api path
main.use('/api', apiRouter);
exports.api = functions.https.onRequest(main);
//# sourceMappingURL=index.js.map