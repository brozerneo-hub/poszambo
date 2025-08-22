"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stores_controller_1 = require("../controllers/stores.controller");
const router = (0, express_1.Router)();
router.route('/')
    .get(stores_controller_1.getStores)
    .post(stores_controller_1.createStore);
router.route('/:id')
    .get(stores_controller_1.getStore)
    .put(stores_controller_1.updateStore)
    .delete(stores_controller_1.deleteStore);
exports.default = router;
//# sourceMappingURL=stores.routes.js.map