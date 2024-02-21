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
exports.createMoneybirdContact = exports.updateMoneybirdContact = exports.processData = void 0;
const moneybird_1 = require("../models/moneybird");
/** Get invoices from said user. */
function processData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const memId = data.memberstack_id;
            const companyName = data.company_name;
            if (memId || companyName) {
                const contactData = yield (0, moneybird_1.getContactData)(memId, companyName);
                const moneybirdUserId = contactData[0].id;
                if (moneybirdUserId) {
                    const invoiceData = yield (0, moneybird_1.getInvoiceData)(moneybirdUserId);
                    res.send("MONEYBIRD INVOICE DATA:" + JSON.stringify(invoiceData));
                }
            }
            else {
                res.send("No valid Company name or Memberstack id given");
            }
        }
        catch (error) {
            console.error("Error processing request:", error);
            res.status(400).send("Error processing request");
        }
    });
}
exports.processData = processData;
/** Update Moneybird Contact from said user. */
function updateMoneybirdContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const memId = data.memberstack_id;
            const companyName = data.company;
            const email = data.email;
            const firstName = data.first_name;
            const lastName = data.last_name;
            const address = data.address;
            const zip = data.zip;
            const city = data.city;
            const country = data.country;
            if (data && memId) {
                const contactData = yield (0, moneybird_1.getContactData)(memId, companyName);
                const moneybirdUserId = contactData[0].id;
                if (moneybirdUserId) {
                    const updateContactData = yield (0, moneybird_1.updateContact)(moneybirdUserId, companyName, email, firstName, lastName, address, zip, city, country);
                    res.send("MONEYBIRD INVOICE DATA:" + JSON.stringify(updateContactData));
                }
            }
        }
        catch (error) {
            console.error("Error processing request:", error);
            res.status(400).send("Error processing request");
        }
    });
}
exports.updateMoneybirdContact = updateMoneybirdContact;
/** Creates a Moneybird contact */
function createMoneybirdContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            if (data) {
                const memId = data.memberstack_id;
                const firstName = data.first_name;
                const lastName = data.last_name;
                const companyName = data.company_name;
                const email = data.email;
                if (memId) {
                    const createContactRequest = yield (0, moneybird_1.createContact)(memId, firstName, lastName, companyName, email);
                    res.send("MONEYBIRD INVOICE DATA:" + JSON.stringify(createContactRequest));
                }
            }
        }
        catch (error) {
            console.error("Error processing request:", error);
            res.status(400).send("Error processing request");
        }
    });
}
exports.createMoneybirdContact = createMoneybirdContact;
