import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/** Bearer token for moneybird */
const moneybird_api_token = process.env.MONEYBIRD_API_TOKEN;
/** app id of Moneybird (found in url moneybird.com/{APP-ID}/) */
const app_id = process.env.APP_ID;

/** gets the contact data of said user via either Memberstack id or company name */
export async function getContactData(mem_id: string, company_name: string) {
  try {

    let identifier;

    if(mem_id) {
        identifier = mem_id
    } else {
        identifier = company_name
    }

    const response = await axios.get(
      `https://moneybird.com/api/v2/${app_id}/contacts.json?query=${
        identifier
      }`,
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

/** Gets the invoices from said user */
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

/** Updates the contact data of said user */
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

/** created a new contact for in Moneybird */
export async function createContact(mem_id: string, first_name: string, last_name: string, company_name: string, email: string) {
    try {
        const contactData = {
            company_name: company_name,
            firstname: first_name,
            lastname: last_name,
            customer_id: mem_id,
            send_invoices_to_email: email,
            send_estimates_to_email: email
        };

        const response = await axios.post(
            `https://moneybird.com/api/v2/${app_id}/contacts.json`, {contact: contactData},
            {
                headers: {
                    Authorization: `Bearer ${moneybird_api_token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error("Error posting contact data to Moneybird API or User already exists");
    }
}
