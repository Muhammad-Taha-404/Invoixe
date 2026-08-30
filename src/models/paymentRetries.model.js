import {
  pgTable,
  uuid,
  varchar,
  integer,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { payments } from './payments.model.js';
import { relations } from 'drizzle-orm';

export const paymentRetries = pgTable('payment_retries', {
  id: uuid('id').defaultRandom().primaryKey(),
  paymentId: uuid('payment_id')
    .notNull()
    .references(() => payments.id, { onDelete: 'cascade' }),
  attemptNumber: integer('attempt_number').notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  errorMessage: text('error_message'),
  retryAt: timestamp('retry_at', { mode: 'date' }),
  attemptedAt: timestamp('attempted_at', { mode: 'date' })
    .defaultNow()
    .notNull(),
});

export const paymentRetriesRelations = relations(paymentRetries, ({ one }) => ({
  payment: one(payments, {
    fields: [paymentRetries.paymentId],
    references: [payments.id],
  }),
}));
