import {
  organizationSchema,
  updateOrganizationSchema,
} from '#validations/org.validations.js';
import {
  createOrg,
  getAllOrgs,
  getOrgById,
  updateOrg,
} from '#services/organization.service.js';
import logger from '#config/logger.js';

export const createOrganization = async (req, res) => {
  try {
    const validatedData = organizationSchema.safeParse(req.body);
    if (!validatedData.success) {
      logger.error('Invalid organization data:', validatedData.error);
      return res
        .status(400)
        .json({ success: false, message: 'Invalid organization data' });
    }
    const { name, slug, industry } = validatedData.data;
    const newOrg = await createOrg({ name, slug, industry });
    if (newOrg) {
      logger.info('Organization created successfully');
      res.status(201).json({
        success: true,
        message: 'Organization created successfully',
        organization: {
          id: newOrg.id,
          name: newOrg.name,
          slug: newOrg.slug,
          industry: newOrg.industry,
        },
      });
    } else {
      logger.error('Organization creation failed');
      res
        .status(400)
        .json({ success: false, message: 'Organization creation failed' });
    }
  } catch (error) {
    logger.error('Error creating organization:', error);
    res
      .status(500)
      .json({ success: false, message: 'Error creating organization' });
  }
};

export const getOrganizations = async (req, res) => {
  try {
    const orgs = await getAllOrgs();
    res.status(200).json({ success: true, organizations: orgs });
  } catch (error) {
    logger.error('Error fetching organizations:', error);
    res
      .status(500)
      .json({ success: false, message: 'Error fetching organizations' });
  }
};

export const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.query;
    const org = await getOrgById(id);
    if (org) {
      return res.status(200).json({ success: true, organization: org });
    } else {
      return res
        .status(404)
        .json({ success: false, message: 'Organization not found' });
    }
  } catch (error) {
    logger.error('Error fetching organization:', error);
    res
      .status(500)
      .json({ success: false, message: 'Error fetching organization' });
  }
};

export const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = updateOrganizationSchema.safeParse(req.body);
    if (!validatedData.success) {
      logger.error('Invalid organization data:', validatedData.error);
      return res
        .status(400)
        .json({ success: false, message: 'Invalid organization data' });
    }
    const { name, slug, industry } = validatedData.data;
    const updatedOrg = await updateOrg(id, { name, slug, industry });
    if (updatedOrg) {
      return res.status(200).json({
        success: true,
        message: 'Organization updated successfully',
        organization: updatedOrg,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: 'Organization not found' });
    }
  } catch (error) {
    logger.error('Error updating organization:', error);
    res
      .status(500)
      .json({ success: false, message: 'Error updating organization' });
  }
};
