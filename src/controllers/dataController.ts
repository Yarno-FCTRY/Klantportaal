import {Request, Response} from "express";
import {
    getContactData,
    getInvoiceData,
    createContact,
    updateContact,
} from "../models/moneybird";

/** Get invoices from said user. */
export async function processData(req: Request, res: Response) {
  try {
    const data = req.body;
    const memId = data.memberstack_id;
    const companyName = data.company_name;
    if (memId || companyName) {
      const contactData = await getContactData(memId, companyName);
      const moneybirdUserId = contactData[0].id;
      if (moneybirdUserId) {
        const invoiceData = await getInvoiceData(moneybirdUserId);
        res.send("MONEYBIRD INVOICE DATA:" + JSON.stringify(invoiceData));
      }
    } else {
      res.send("No valid Company name or Memberstack id given")
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(400).send("Error processing request");
  }
}

/** Update Moneybird Contact from said user. */
export async function updateMoneybirdContact(req: Request, res: Response) {
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
      const contactData = await getContactData(memId, companyName);
      const moneybirdUserId = contactData[0].id;
      if (moneybirdUserId) {
        const updateContactData = await updateContact(
          moneybirdUserId,
          companyName,
          email,
          firstName,
          lastName,
          address,
          zip,
          city,
          country
        );
        res.send("MONEYBIRD INVOICE DATA:" + JSON.stringify(updateContactData));
      }
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(400).send("Error processing request");
  }
}

/** Creates a Moneybird contact */
export async function createMoneybirdContact(req: Request, res: Response) {
    try {
        const data = req.body;

        if (data) {
            const memId = data.memberstack_id;
            const firstName = data.first_name;
            const lastName = data.last_name;
            const companyName = data.company_name;
            const email = data.email;
            if (memId) {
                const createContactRequest = await createContact(
                  memId,
                  firstName,
                  lastName,
                  companyName,
                  email
                );
                res.send(
                    "MONEYBIRD INVOICE DATA:" + JSON.stringify(createContactRequest)
                );
            }
        }
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(400).send("Error processing request");
    }
}

