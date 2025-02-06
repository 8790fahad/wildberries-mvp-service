import knex from "knex";
import config from "../knexfile";

const db = knex(config);

export async function saveTariffsData(date: string, data: any) {
  return db("wb_data")
    .insert({ date, data: JSON.stringify(data) })
    .onConflict("date")
    .merge();
}
