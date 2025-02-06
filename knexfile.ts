import type { Knex } from "knex";
export const config: Knex.Config = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  migrations: { directory: "./migrations" }
};
export default config;

export async function up(knex: Knex) {
  return knex.schema.createTable("wb_data", (table) => {
    table.increments("id").primary();
    table.date("date").notNullable();
    table.json("data").notNullable();
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable("wb_data");
}