import { pgTable, uuid, varchar, text, timestamp, primaryKey, pgEnum, integer } from 'drizzle-orm/pg-core';
import { organizations } from './organizations.model.js';
import { relations } from 'drizzle-orm';

// --- ENUMS ---
export const accountTypeEnum = pgEnum('account_type', ['oauth', 'oidc', 'email']);

// --- USERS TABLE ---
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  // Made password_hash NULLABLE so OAuth users can sign up without a password
  password_hash: varchar('password_hash', { length: 255 }), 
  isActive: varchar('is_active', { length: 50 }).notNull().default('true'),
  isVerified: varchar('is_verified', { length: 50 }).notNull().default('false'),
  resetPasswordToken: varchar('reset_password_token', { length: 255 }),
  resetPasswordExpires: timestamp('reset_password_expires'),
  verificationToken: varchar('verification_token', { length: 255 }),
  verificationTokenExpires: timestamp('verification_token_expires'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// --- ORGANIZATION MEMBERS TABLE ---
export const organizationMembers = pgTable('organization_members', {
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 50 }).notNull().default('user'),
}, (table) => ({
  pk: primaryKey({ columns: [table.userId, table.organizationId] }),
}));

// --- ACCOUNTS TABLE ---
export const accounts = pgTable(
  'accounts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: accountTypeEnum('type').notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
    // Changed long token fields from varchar to text to prevent truncation errors
    refreshToken: text('refresh_token'),
    accessToken: text('access_token'),
    expiresAt: integer('expires_at'),
    tokenType: varchar('token_type', { length: 255 }),
    scope: text('scope'),
    idToken: text('id_token'),
    sessionState: text('session_state'),
  }
  // Removed duplicate primaryKey() config here since `id` is already the primary key
);

// --- SESSIONS TABLE ---
export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  // Removed .primaryKey() here since `id` above is already primaryKey
  sessionToken: varchar('session_token', { length: 255 }).unique().notNull(), 
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

// --- RELATIONS ---
export const usersRelations = relations(users, ({ many }) => ({
  memberships: many(organizationMembers),
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const organizationMembersRelations = relations(organizationMembers, ({ one }) => ({
  user: one(users, {
    fields: [organizationMembers.userId],
    references: [users.id],
  }),
  organization: one(organizations, {
    fields: [organizationMembers.organizationId],
    references: [organizations.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));