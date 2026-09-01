import {
  pgTable,
  uuid,
  varchar,
  numeric,
  timestamp,
} from 'drizzle-orm/pg-core';
import { invoices } from './invoices.model.js';
import { paymentMethods } from './paymentMethods.model.js';
import { paymentRetries } from './paymentRetries.model.js';
import { relations } from 'drizzle-orm';

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  invoiceId: uuid('invoice_id')
    .notNull()
    .references(() => invoices.id, { onDelete: 'cascade' }),
  paymentMethodId: uuid('payment_method_id').references(
    () => paymentMethods.id,
    { onDelete: 'set null' }
  ),
  stripePaymentId: varchar('stripe_payment_id', { length: 255 }).unique(),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  paymentMethodType: varchar('payment_method_type', { length: 50 }),
  paymentDate: timestamp('payment_date', { mode: 'date' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const paymentsRelations = relations(payments, ({ one, many }) => ({
  invoice: one(invoices, {
    fields: [payments.invoiceId],
    references: [invoices.id],
  }),
  paymentMethod: one(paymentMethods, {
    fields: [payments.paymentMethodId],
    references: [paymentMethods.id],
  }),
  paymentRetries: many(paymentRetries),
}));
