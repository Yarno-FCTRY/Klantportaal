import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/** Bearer token for moneybird */
const moneybirdApiToken = process.env.MONEYBIRD_API_TOKEN;
/** app id of Moneybird (found in url moneybird.com/{APP-ID}/) */
const appId = process.env.APP_ID;

/** gets the contact data of said user via either Memberstack id or company name */
export async function getContactData(mem_id: string, company_name: string) {
  try {
    let identifier;

    if (mem_id) {
      identifier = mem_id;
    } else {
      identifier = company_name;
    }

    const response = await axios.get(
      `https://moneybird.com/api/v2/${appId}/contacts.json?query=${identifier}`,
      {
        headers: {
          Authorization: `Bearer ${moneybirdApiToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching contact data from Moneybird API");
  }
}

/** Gets the invoices from said user */
export async function getInvoiceData(contactId: string) {
  try {
    const response = await axios.get(
      `https://moneybird.com/api/v2/${appId}/sales_invoices.json?filter=contact_id:${contactId},state:open|pending_payment|late`,
      {
        headers: {
          Authorization: `Bearer ${moneybirdApiToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching invoice data from Moneybird API");
  }
}

/** Updates the contact data of said user */
export async function updateContact(
  moneybirdUserId: string,
  companyName: string,
  email: string,
  firstName: string,
  lastName: string,
  address: string,
  zip: string,
  city: string,
  country: string
) {
  try {
    const response = await axios.patch(
      `https://moneybird.com/api/v2/${appId}/contacts/${moneybirdUserId}.json`,
      {
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
      },
      {
        headers: {
          Authorization: `Bearer ${moneybirdApiToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error updating contact in Moneybird API");
  }
}

/** created a new contact for in Moneybird */
export async function createContact(
  memId: string,
  firstName: string,
  lastName: string,
  companyName: string,
  email: string
) {
  try {
    const contactData = {
      company_name: companyName,
      firstname: firstName,
      lastname: lastName,
      customer_id: memId,
      send_invoices_to_email: email,
      send_estimates_to_email: email,
    };

    const response = await axios.post(
      `https://moneybird.com/api/v2/${appId}/contacts.json`,
      { contact: contactData },
      {
        headers: {
          Authorization: `Bearer ${moneybirdApiToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      "Error posting contact data to Moneybird API or User already exists"
    );
  }
}
