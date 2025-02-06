import express from "express";
import { exportToGoogleSheet } from "./googleSheets";
import { fetchWBTariffs } from "./api";
import { saveTariffsData } from "./db";

const app = express();
app.use(express.json());

app.get("/export/:sheetId", async (req, res) => {
  try {
    const { sheetId } = req.params;
    const data = await fetchWBTariffs(process.env.WB_API_KEY!);
    await exportToGoogleSheet(sheetId, data);
    res.json({ message: "Export successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));