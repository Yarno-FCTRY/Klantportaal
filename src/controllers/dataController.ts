import { Request, Response } from "express";
import { getContactData, getInvoiceData } from "../models/moneybird";

export async function processData(req: Request, res: Response) {
  try {
    //console.log("Received raw JSON data:", req.body);
    const data = req.body;
    const mem_id = data.memberstack_id;
    if (mem_id) {
      //console.log("MEMBER ID:", mem_id);
      const contactData = await getContactData(mem_id);
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
