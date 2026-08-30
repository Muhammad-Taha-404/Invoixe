import {
  pgTable,
  uuid,
  varchar,
  numeric,
  timestamp,
} from 'drizzle-orm/pg-core';
import { organizations } from './organizations.model.js';
import { relations } from 'drizzle-orm';

export const taxRates = pgTable('tax_rates', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  country: varchar('country', { length: 100 }),
  state: varchar('state', { length: 100 }),
  taxRate: numeric('tax_rate', { precision: 5, scale: 2 }).notNull(),
  taxType: varchar('tax_type', { length: 50 }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});


export const taxRatesRelations = relations(taxRates, ({ one }) => ({
  organization: one(organizations, {
    fields: [taxRates.organizationId],
    references: [organizations.id],
  }),
}));