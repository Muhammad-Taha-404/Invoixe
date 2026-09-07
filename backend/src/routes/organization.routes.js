import express from 'express';
import {
  createOrganization,
  getAllOrganizations,
  getOrganization,
} from '../controllers/organization.controller.js';
import { get_CustomersByOrganizationId } from '#controllers/customer.controller.js';

const OrgRouter = express.Router();

OrgRouter.post('/create', createOrganization);

OrgRouter.get('/get-all', getAllOrganizations);

OrgRouter.get('/get', getOrganization);

OrgRouter.get('/:organizationId/customers', get_CustomersByOrganizationId);

export default OrgRouter;
