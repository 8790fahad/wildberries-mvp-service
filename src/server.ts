import express from "express";
import { fetchWBTariffs } from "./api";
import { saveTariffsData } from "./db";
import bodyParser from "body-parser";
import cron from "node-cron";
import { exportRoutes } from "./routes/export";

const WB_API_KEY = process.env.WB_API_KEY!;

cron.schedule("0 * * * *", async () => {
  const data = await fetchWBTariffs(WB_API_KEY);
  if (data) {
    await saveTariffsData(new Date().toISOString().split("T")[0], data);
    console.log("Data updated successfully.");
  }
});

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));

exportRoutes(app);

app.listen(3000, () => console.log("Server running on port 3000"));
