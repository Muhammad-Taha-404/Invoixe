import {
  pgTable,
  uuid,
  varchar,
  date,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';
import { customers } from './customers.model.js';
import { payments } from './payments.model.js';
import { relations } from 'drizzle-orm';

export const paymentMethods = pgTable('payment_methods', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id')
    .notNull()
    .references(() => customers.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 50 }).notNull(),
  cardLast4: varchar('card_last4', { length: 4 }),
  cardBrand: varchar('card_brand', { length: 50 }),
  cardExpiry: date('card_expiry'),
  isDefault: boolean('is_default').default(false).notNull(),
  isDeleted: boolean('is_deleted').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const paymentMethodsRelations = relations(
  paymentMethods,
  ({ one, many }) => ({
    customer: one(customers, {
      fields: [paymentMethods.customerId],
      references: [customers.id],
    }),
    payments: many(payments),
  })
);
