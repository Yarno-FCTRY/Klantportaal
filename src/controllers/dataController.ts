import { Request, Response } from "express";
import {
  getContactData,
  getInvoiceData,
  createContact,
  updateContact,
} from "../models/moneybird";

export async function processData(req: Request, res: Response) {
  try {
    //console.log("Received raw JSON data:", req.body);
    const data = req.body;
    const mem_id = data.memberstack_id;
    const company_name = data.company_name;
    if (mem_id) {
      //console.log("MEMBER ID:", mem_id);
      const contactData = await getContactData(mem_id, company_name);
      const moneybird_user_id = contactData[0].id;
      if (moneybird_user_id) {
        //console.log("MONEYBIRD ID: ", moneybird_user_id);
        const invoiceData = await getInvoiceData(moneybird_user_id);
        res.send("MONEYBIRD INVOICE DATA:" + JSON.stringify(invoiceData));
      }
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(400).send("Error processing request");
  }
}

export async function updateMoneybirdContact(req: Request, res: Response) {
    try {
        const data = req.body;
        const mem_id = data.memberstack_id;
        const company_name = data.company;
        const email = data.email;
        const first_name = data.first_name;
        const last_name = data.last_name;
        const address = data.address;
        const zip = data.zip;
        const city = data.city;
        const country = data.country;

        if (data && mem_id) {
            //console.log("MEMBER ID:", mem_id);
            const contactData = await getContactData(mem_id);
            const moneybird_user_id = contactData[0].id;
            if (moneybird_user_id) {
                //console.log("MONEYBIRD ID: ", moneybird_user_id);
                const updatecontactdata = await updateContact(moneybird_user_id, company_name, email, first_name, last_name, address, zip, city, country);
                res.send("MONEYBIRD INVOICE DATA:" + JSON.stringify(updatecontactdata));
            }
        }


    } catch (error) {
        console.error("Error processing request:", error);
        res.status(400).send("Error processing request");
    }
}

export async function createMoneybirdContact(req: Request, res: Response) {
  try {
    const data = req.body;

    if (data) {
      const mem_id = data.memberstack_id;
      const first_name = data.first_name;
      const last_name = data.last_name;
      const company_name = data.company_name;
      const email = data.email;
      if (mem_id) {
        const createContactRequest = await createContact(
          mem_id,
          first_name,
          last_name,
          company_name,
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

