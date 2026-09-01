import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  date,
  numeric,
  text,
} from 'drizzle-orm/pg-core';
import { organizations } from './organizations.model.js';
import { customers } from './customers.model.js';
import { lineItems } from './lineItems.model.js';
import { payments } from './payments.model.js';
import { subscriptions } from './subscriptions.model.js';
import { relations } from 'drizzle-orm';

export const invoices = pgTable('invoices', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  customerId: uuid('customer_id')
    .notNull()
    .references(() => customers.id, { onDelete: 'restrict' }),
  invoiceNumber: varchar('invoice_number', { length: 100 }).notNull().unique(),
  invoiceDate: date('invoice_date').notNull(),
  dueDate: date('due_date').notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  subtotal: numeric('subtotal', { precision: 12, scale: 2 }).notNull(),
  taxAmount: numeric('tax_amount', { precision: 12, scale: 2 }).default('0.00'),
  totalAmount: numeric('total_amount', { precision: 12, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 10 }).default('USD').notNull(),
  paymentTerms: varchar('payment_terms', { length: 100 }),
  notes: text('notes'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [invoices.organizationId],
    references: [organizations.id],
  }),
  customer: one(customers, {
    fields: [invoices.customerId],
    references: [customers.id],
  }),
  lineItems: many(lineItems),
  payments: many(payments),
  subscriptions: many(subscriptions),
}));
