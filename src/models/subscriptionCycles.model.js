import {
  pgTable,
  uuid,
  varchar,
  date,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';
import { subscriptions } from './subscriptions.model.js';
import { relations } from 'drizzle-orm';

export const subscriptionCycles = pgTable('subscription_cycles', {
  id: uuid('id').defaultRandom().primaryKey(),
  subscriptionId: uuid('subscription_id')
    .notNull()
    .references(() => subscriptions.id, { onDelete: 'cascade' }),
  cycleNumber: integer('cycle_number').notNull(),
  billingDate: date('billing_date').notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const subscriptionCyclesRelations = relations(
  subscriptionCycles,
  ({ one }) => ({
    subscription: one(subscriptions, {
      fields: [subscriptionCycles.subscriptionId],
      references: [subscriptions.id],
    }),
  })
);
