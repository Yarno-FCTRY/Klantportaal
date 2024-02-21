"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataController_1 = require("../controllers/dataController");
const multer_1 = __importDefault(require("multer"));
// Set up multer for handling form-data
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
router.post("/v1/data", upload.none(), dataController_1.processData);
router.post("/update-contact", upload.none(), dataController_1.updateMoneybirdContact);
router.post("/create-contact", upload.none(), dataController_1.createMoneybirdContact);
exports.default = router;
