import { db } from '../db.js';
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
      throw new Error('Organization with this slug already exists');
    } else {
      const newOrg = await db
        .insert(organizations)
        .values({ name, slug, industry });
      return newOrg;
    }
  } catch (error) {
    logger.error('Error creating organization:', error);
    throw new Error('Error creating organization: ' + error.message);
  }
};

export const getAllOrgs = async () => {
  try {
    const orgs = await db.select().from(organizations);
    return orgs;
  } catch (error) {
    logger.error('Error fetching organizations:', error);
    throw new Error('Error fetching organizations: ' + error.message);
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
      throw new Error('Organization not found');
    }
    return org[0];
  } catch (error) {
    logger.error('Error fetching organization by id:', error);
    throw new Error('Error fetching organization by id: ' + error.message);
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
      throw new Error('Organization not found');
    }
    await db
      .update(organizations)
      .set({ name, slug, industry })
      .where(eq(organizations.id, id));
    return { message: 'Organization updated successfully' };
  } catch (error) {
    logger.error('Error updating organization:', error);
    throw new Error('Error updating organization: ' + error.message);
  }
};

export const deleteOrg = async id => {
  try {
    const [existingOrg] = await getOrgById(id);
    if (!existingOrg) {
      logger.error(`Organization with id ${id} not found`);
      throw new Error('Organization not found');
    }
    await db.delete(organizations).where(eq(organizations.id, id));
    return { message: 'Organization deleted successfully' };
  } catch (error) {
    logger.error('Error deleting organization:', error);
    throw new Error('Error deleting organization: ' + error.message);
  }
};
