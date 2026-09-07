import express from 'express';
import {
  getCustomers,
  create_Customer,
  delete_Customer,
  get_CustomerById,
  update_Customer,
} from '#controllers/customer.controller.js';
const router = express.Router();

router.get('/customers', getCustomers);

router.get('/customers/:id', get_CustomerById);

router.post('/customers', create_Customer);

router.put('/customers/:id', update_Customer);

router.delete('/customers/:id', delete_Customer);
