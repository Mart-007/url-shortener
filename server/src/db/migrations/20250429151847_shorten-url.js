const {
  createOnUpdateTrigger,
  dropOnUpdateTrigger,
} = require("../util/db-util");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  if (!(await knex.schema.hasTable("shorten_urls"))) {
    await knex.schema.createTable("shorten_urls", (t) => {
      t.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
      t.text("originalUrl").notNullable();
      t.string("shortCode", 20).notNullable().unique();
      t.timestamp("createdAt").defaultTo(knex.fn.now());
      t.timestamp("updatedAt").defaultTo(knex.fn.now());
      t.timestamp("expiresAt").nullable();
      t.timestamps(true, true, true);
      t.integer("clickCount").defaultTo(0);
      t.string("utmSource", 255).nullable();
      t.string("utmMedium", 255).nullable();
      t.string("utmCampaign", 255).nullable();
      t.string("utmTerm", 255).nullable();
      t.string("utmContent", 255).nullable();
      t.index("shortCode");
    });

    return await createOnUpdateTrigger(knex, "shorten_urls");
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  if (await knex.schema.hasTable("shorten_urls")) {
    await knex.schema.dropTable("shorten_urls");
    return await dropOnUpdateTrigger(knex, "shorten_urls");
  }
};
