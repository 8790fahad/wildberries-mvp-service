import { exportController } from "../controlers/export";

export const exportRoutes = (app: any) => {
  app.get("/export/:sheetId", exportController);
};
