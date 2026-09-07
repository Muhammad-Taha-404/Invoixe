import { db } from '../config/database.js';
import { organizations } from '../models/organizations.model.js';
import { eq } from 'drizzle-orm';
import logger from '#config/logger.js';

export const createOrg = async orgData => {
  try {
    const { name, slug, industry } = orgData;
    const existingOrg = await db
      .select()
      .from(organizations)
      .where(eq(organizations.slug, slug))
      .limit(1);
    if (existingOrg.length > 0) {
      logger.error(`Organization with slug ${slug} already exists`);
      return null;
    } else {
      const newOrg = await db
        .insert(organizations)
        .values({ name, slug, industry });
      return newOrg;
    }
  } catch (error) {
    logger.error('Error creating organization:', error);
    return null;
  }
};

export const getAllOrgs = async () => {
  try {
    const orgs = await db.select().from(organizations);
    return orgs;
  } catch (error) {
    logger.error('Error fetching organizations:', error);
    return null;
  }
};

export const getOrgById = async id => {
  try {
    const org = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, id))
      .limit(1);
    if (org.length === 0) {
      logger.error(`Organization with id ${id} not found`);
      return null;
    }
    return org[0];
  } catch (error) {
    logger.error('Error fetching organization by id:', error);
    return null;
  }
};

export const updateOrg = async (id, orgData) => {
  try {
    const { name, slug, industry } = orgData;
    const existingOrg = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, id))
      .limit(1);
    if (existingOrg.length === 0) {
      logger.error(`Organization with id ${id} not found`);

      return null;
    }
    await db
      .update(organizations)
      .set({ name, slug, industry })
      .where(eq(organizations.id, id));
    const updatedOrg = await getOrgById(id);
    return updatedOrg;
  } catch (error) {
    logger.error('Error updating organization:', error);
    return { error: 'Error updating organization: ' + error.message };
  }
};

export const deleteOrg = async id => {
  try {
    const [existingOrg] = await getOrgById(id);
    if (!existingOrg) {
      logger.error(`Organization with id ${id} not found`);
      return null;
    }
    await db.delete(organizations).where(eq(organizations.id, id));
    return true;
  } catch (error) {
    logger.error('Error deleting organization:', error);
    return null;
  }
};
