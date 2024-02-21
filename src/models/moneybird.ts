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

export async function updateContact(moneybird_user_id: string, company_name: string, email: string, first_name: string, last_name: string, address: string, zip: string, city: string, country: string) {
    try {
        const response = await axios.patch(
            `https://moneybird.com/api/v2/${app_id}/contacts/${moneybird_user_id}.json`,
            {
                contact: {
                    company_name: company_name,
                    send_invoices_to_email: email,
                    send_estimates_to_email: email,
                    firstname: first_name,
                    lastname: last_name,
                    address1: address,
                    zipcode: zip,
                    city: city,
                    county: country,
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${moneybird_api_token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error("Error updating contact in Moneybird API");
    }
}
