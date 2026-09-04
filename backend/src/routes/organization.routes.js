import express from 'express';

const OrgRouter = express.Router();

OrgRouter.post('/create');

OrgRouter.get('/get-all');

OrgRouter.get('/get/:id');

export default OrgRouter;
