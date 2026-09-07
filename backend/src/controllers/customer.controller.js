import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomersByOrganizationId,
  updateCustomer,
} from '../services/customer.service.js';

export const getCustomers = async (req, res) => {
  try {
    const customers = await getAllCustomers();
    if (customers) {
      return res.json(customers);
    } else {
      return res
        .status(404)
        .json({ success: false, message: 'No customers found' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const get_CustomerById = async (req, res) => {
  try {
    const customer = await getCustomerById(req.params.id);
    if (customer) {
      return res.json(customer);
    } else {
      return res
        .status(404)
        .json({ success: false, message: 'Customer not found' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const create_Customer = async (req, res) => {
  try {
    const customer = await createCustomer(req.body);
    if (customer === null) {
      return res.status(400).json({
        success: false,
        message: 'Customer with this email already exists',
      });
    }
    return res.status(201).json({ success: true, customer });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const update_Customer = async (req, res) => {
  try {
    const customer = await updateCustomer(req.params.id, req.body);
    if (customer === null) {
      return res
        .status(404)
        .json({ success: false, message: 'Customer not found' });
    }
    return res.json({ success: true, customer });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const delete_Customer = async (req, res) => {
  try {
    const customer = await deleteCustomer(req.params.id);
    if (customer === null) {
      return res
        .status(404)
        .json({ success: false, message: 'Customer not found' });
    }
    return res.json({ success: true, message: 'Customer deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const get_CustomersByOrganizationId = async (req, res) => {
  try {
    const customers = await getCustomersByOrganizationId(
      req.params.organizationId
    );
    if (customers) {
      return res.json(customers);
    } else {
      return res.status(404).json({
        success: false,
        message: 'No customers found for this organization',
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
