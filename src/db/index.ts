import { XataClient } from "./xata";

export const client = new XataClient({ apiKey: process.env.XATA_API_KEY });
