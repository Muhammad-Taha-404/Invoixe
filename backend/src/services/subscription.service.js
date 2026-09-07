import { subscriptions } from '#models/subscriptions.model.js';
import { db } from '#config/database.js';
import { eq } from 'drizzle-orm';
import logger from '#config/logger.js';

export const createSubscription = async subscriptionData => {
  try {
    const existingSubscription = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.invoiceId, subscriptionData.invoiceId))
      .first();
    if (existingSubscription) {
      logger.error('Subscription already exists');
      return null;
    }
    const subscription = await db
      .insert(subscriptions)
      .values(subscriptionData)
      .returning();
    return subscription[0];
  } catch (error) {
    logger.error('Error creating subscription:', error);
    return null;
  }
};
