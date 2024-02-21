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
exports.createContact = exports.updateContact = exports.getInvoiceData = exports.getContactData = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/** Bearer token for moneybird */
const moneybirdApiToken = process.env.MONEYBIRD_API_TOKEN;
/** app id of Moneybird (found in url moneybird.com/{APP-ID}/) */
const appId = process.env.APP_ID;
/** gets the contact data of said user via either Memberstack id or company name */
function getContactData(mem_id, company_name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let identifier;
            if (mem_id) {
                identifier = mem_id;
            }
            else {
                identifier = company_name;
            }
            const response = yield axios_1.default.get(`https://moneybird.com/api/v2/${appId}/contacts.json?query=${identifier}`, {
                headers: {
                    Authorization: `Bearer ${moneybirdApiToken}`,
                },
            });
            return response.data;
        }
        catch (error) {
            throw new Error("Error fetching contact data from Moneybird API");
        }
    });
}
exports.getContactData = getContactData;
/** Gets the invoices from said user */
function getInvoiceData(contactId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://moneybird.com/api/v2/${appId}/sales_invoices.json?filter=contact_id:${contactId},state:open|pending_payment|late`, {
                headers: {
                    Authorization: `Bearer ${moneybirdApiToken}`,
                },
            });
            return response.data;
        }
        catch (error) {
            throw new Error("Error fetching invoice data from Moneybird API");
        }
    });
}
exports.getInvoiceData = getInvoiceData;
/** Updates the contact data of said user */
function updateContact(moneybirdUserId, companyName, email, firstName, lastName, address, zip, city, country) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.patch(`https://moneybird.com/api/v2/${appId}/contacts/${moneybirdUserId}.json`, {
                contact: {
                    company_name: companyName,
                    send_invoices_to_email: email,
                    send_estimates_to_email: email,
                    firstname: firstName,
                    lastname: lastName,
                    address1: address,
                    zipcode: zip,
                    city: city,
                    county: country,
                },
            }, {
                headers: {
                    Authorization: `Bearer ${moneybirdApiToken}`,
                },
            });
            return response.data;
        }
        catch (error) {
            throw new Error("Error updating contact in Moneybird API");
        }
    });
}
exports.updateContact = updateContact;
/** created a new contact for in Moneybird */
function createContact(memId, firstName, lastName, companyName, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contactData = {
                company_name: companyName,
                firstname: firstName,
                lastname: lastName,
                customer_id: memId,
                send_invoices_to_email: email,
                send_estimates_to_email: email,
            };
            const response = yield axios_1.default.post(`https://moneybird.com/api/v2/${appId}/contacts.json`, { contact: contactData }, {
                headers: {
                    Authorization: `Bearer ${moneybirdApiToken}`,
                },
            });
            return response.data;
        }
        catch (error) {
            throw new Error("Error posting contact data to Moneybird API or User already exists");
        }
    });
}
exports.createContact = createContact;
