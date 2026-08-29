import { pgTable,serial,varchar,timestamp } from 'drizzle-orm/pg-core';

export const organizations = pgTable('organizations', {
  id : serial('id').primaryKey(),
  name : varchar('name', {length: 255}).notNull(),
  slug : varchar('slug', {length: 255}).notNull(),
  industry : varchar('industry', {length: 255}).notNull(),
  created_at : timestamp('created_at').defaultNow().notNull(),
  updated_at : timestamp('updated_at').defaultNow().notNull()
});