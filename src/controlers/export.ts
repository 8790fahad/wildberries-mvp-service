import { fetchWBTariffs } from "../api";
import { exportToGoogleSheet } from "../googleSheets";
import { Request, Response } from "express";
export const exportController = async (req: Request, res: Response) => {
  try {
    const { sheetId } = req.params;
    const data = await fetchWBTariffs(process.env.WB_API_KEY!);
    await exportToGoogleSheet(sheetId, data);
    res.json({ message: "Export successful" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
