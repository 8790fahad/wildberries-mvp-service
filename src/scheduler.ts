import { fetchWBTariffs } from "./api";
import { saveTariffsData } from "./db";
import cron from "node-cron";

const WB_API_KEY = process.env.WB_API_KEY!;

cron.schedule("0 * * * *", async () => {
  const data = await fetchWBTariffs(WB_API_KEY);
  if (data) {
    await saveTariffsData(new Date().toISOString().split("T")[0], data);
    console.log("Data updated successfully.");
  }
});
