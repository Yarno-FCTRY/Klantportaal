import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const moneybird_api_token = process.env.moneybird_api_token;
const app_id = process.env.app_id;

export async function getContactData(mem_id: string) {
    try {
        const response = await axios.get(
            `https://moneybird.com/api/v2/${app_id}/contacts.json?query=${mem_id}`,
            {
                headers: {
                    Authorization: `Bearer ${moneybird_api_token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error("Error fetching contact data from Moneybird API");
    }
}

export async function getInvoiceData(contact_id: string) {
    try {
        const response = await axios.get(
            `https://moneybird.com/api/v2/${app_id}/sales_invoices.json?filter=contact_id:${contact_id},state:open|pending_payment|late`,
            {
                headers: {
                    Authorization: `Bearer ${moneybird_api_token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error("Error fetching invoice data from Moneybird API");
    }
}
