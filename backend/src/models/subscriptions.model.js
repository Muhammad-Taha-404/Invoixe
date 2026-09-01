import {
  pgTable,
  uuid,
  varchar,
  numeric,
  boolean,
  date,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';
import { invoices } from './invoices.model.js';
import { subscriptionCycles } from './subscriptionCycles.model.js';
import { relations } from 'drizzle-orm';

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  invoiceId: uuid('invoice_id').references(() => invoices.id, {
    onDelete: 'set null',
  }),
  billingCycle: varchar('billing_cycle', { length: 50 }).notNull(),
  recurringAmount: numeric('recurring_amount', {
    precision: 12,
    scale: 2,
  }).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  nextBillingDate: date('next_billing_date'),
  retryCount: integer('retry_count').default(0).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const subscriptionsRelations = relations(
  subscriptions,
  ({ one, many }) => ({
    invoice: one(invoices, {
      fields: [subscriptions.invoiceId],
      references: [invoices.id],
    }),
    subscriptionCycles: many(subscriptionCycles, {
      fields: [subscriptions.id],
      references: [subscriptionCycles.subscriptionId],
    }),
  })
);
