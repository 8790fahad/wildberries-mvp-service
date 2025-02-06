import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!;

const auth = new JWT({
  email: SERVICE_ACCOUNT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function exportToGoogleSheet(sheetId: string, data: any) {
  const doc = new GoogleSpreadsheet(sheetId, auth);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["stocks_coefs"];
  await sheet.clear();
  await sheet.setHeaderRow(["Coefficient", "Date", "Data"]);

  const sortedData = data.sort((a: any, b: any) => a.coefficient - b.coefficient);
  await sheet.addRows(sortedData);
}
