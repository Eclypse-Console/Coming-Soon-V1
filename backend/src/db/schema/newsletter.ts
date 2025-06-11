import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const newsletterUser = pgTable("newsletter_user", {
  srNo: serial("sr_no").primaryKey(),
  uid: varchar("uid", { length: 36 }).notNull(),
  email: text("email").notNull().unique(),
});
