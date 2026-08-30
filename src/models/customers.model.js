import { pgTable, uuid, varchar, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { organizations } from './organizations.model.js';
import { invoices } from './invoices.model.js';
import { relations } from 'drizzle-orm';
import { paymentMethods } from './paymentMethods.model.js';

export const customers = pgTable('customers', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  taxId: varchar('tax_id', { length: 100 }),
  country: varchar('country', { length: 100 }),
  state: varchar('state', { length: 100 }),
  billingAddress: jsonb('billing_address'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const customersRelations = relations(customers, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [customers.organizationId],
    references: [organizations.id],
  }),
  invoices: many(invoices),
  paymentMethods: many(paymentMethods),
}));