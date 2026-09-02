import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { organizationMembers } from './users.model.js';
import { customers } from './customers.model.js';
import { invoices } from './invoices.model.js';
import { taxRates } from './taxRates.model.js';
import { relations } from 'drizzle-orm';

export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  industry: varchar('industry', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const organizationsRelations = relations(organizations, ({ many }) => ({
  members: many(organizationMembers),
  customers: many(customers),
  invoices: many(invoices),
  taxRates: many(taxRates),
}));
