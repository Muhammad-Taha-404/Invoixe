import {
  getAllInvoices,
  createInvoice,
  deleteInvoice,
  getInvoiceById,
  getInvoicesByCustomerId,
  getInvoicesByOrganizationId,
  getInvoicesByStatus,
  getInvoicesbycustomerIdAndStatus,
  getInvoicesbyorganizationIdAndCustomerId,
  getInvoicesbyorganizationIdAndCustomerIdAndStatus,
  getInvoicesbyorganizationIdAndStatus,
  updateInvoice,
} from '#services/invoice.service.js';
import { logger } from '#config/logger.js';

export const create_Invoice = async (req, res) => {
  try {
    const invoice = await createInvoice(req.body);
    if (invoice === null) {
      logger.warn('Invoice with this number already exists');
      return res.status(400).json({
        success: false,
        message: 'Invoice with this number already exists',
      });
    }
    return res.status(201).json({ success: true, invoice });
  } catch (error) {
    logger.error(`Error creating invoice: ${error.message}`);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const get_Invoices = async (req, res) => {
  try {
    const invoices = await getAllInvoices();
    if (invoices) {
      return res.json({ success: true, invoices });
    } else {
      logger.warn('No invoices found');
      return res
        .status(404)
        .json({ success: false, message: 'No invoices found' });
    }
  } catch (error) {
    logger.error(`Error fetching invoices: ${error.message}`);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const get_InvoiceById = async (req, res) => {
  try {
    const invoice = await getInvoiceById(req.params.id);
    if (invoice) {
      return res.json({ success: true, invoice });
    } else {
      logger.warn('Invoice not found');
      return res
        .status(404)
        .json({ success: false, message: 'Invoice not found' });
    }
  } catch (error) {
    logger.error(`Error fetching invoice by ID: ${error.message}`);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const update_Invoice = async (req, res) => {
  try {
    const invoice = await updateInvoice(req.params.id, req.body);
    if (invoice === null) {
      logger.warn('Invoice not found');
      return res
        .status(404)
        .json({ success: false, message: 'Invoice not found' });
    }
    logger.info('Invoice updated successfully');
    return res.json({ success: true, invoice });
  } catch (error) {
    logger.error(`Error updating invoice: ${error.message}`);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const delete_Invoice = async (req, res) => {
  try {
    const invoice = await deleteInvoice(req.params.id);
    if (invoice === null) {
      logger.warn('Invoice not found');
      return res
        .status(404)
        .json({ success: false, message: 'Invoice not found' });
    }
    logger.info('Invoice deleted successfully');
    return res.json({ success: true, message: 'Invoice deleted' });
  } catch (error) {
    logger.error(`Error deleting invoice: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const get_InvoicesByCustomerId = async (req, res) => {
  try {
    const invoices = await getInvoicesByCustomerId(req.params.customerId);
    if (invoices) {
      return res.json({ success: true, invoices });
    } else {
      logger.warn('No invoices found for this customer');
      return res.status(404).json({
        success: false,
        message: 'No invoices found for this customer',
      });
    }
  } catch (error) {
    logger.error(`Error fetching invoices by customer ID: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const get_InvoicesByOrganizationId = async (req, res) => {
  try {
    const invoices = await getInvoicesByOrganizationId(
      req.params.organizationId
    );
    if (invoices) {
      return res.json({ success: true, invoices });
    } else {
      logger.warn('No invoices found for this organization');
      return res.status(404).json({
        success: false,
        message: 'No invoices found for this organization',
      });
    }
  } catch (error) {
    logger.error(
      `Error fetching invoices by organization ID: ${error.message}`
    );
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const get_InvoicesByStatus = async (req, res) => {
  try {
    const invoices = await getInvoicesByStatus(req.params.status);
    if (invoices) {
      return res.json({ success: true, invoices });
    } else {
      logger.warn('No invoices found with this status');
      return res.status(404).json({
        success: false,
        message: 'No invoices found with this status',
      });
    }
  } catch (error) {
    logger.error(`Error fetching invoices by status: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const get_InvoicesByCustomerIdAndStatus = async (req, res) => {
  try {
    const invoices = await getInvoicesbycustomerIdAndStatus(
      req.params.customerId,
      req.params.status
    );
    if (invoices) {
      return res.json({ success: true, invoices });
    } else {
      logger.warn('No invoices found for this customer with this status');
      return res.status(404).json({
        success: false,
        message: 'No invoices found for this customer with this status',
      });
    }
  } catch (error) {
    logger.error(
      `Error fetching invoices by customer ID and status: ${error.message}`
    );
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const get_InvoicesByOrganizationIdAndCustomerId = async (req, res) => {
  try {
    const invoices = await getInvoicesbyorganizationIdAndCustomerId(
      req.params.organizationId,
      req.params.customerId
    );
    if (invoices) {
      return res.json({ success: true, invoices });
    } else {
      logger.warn('No invoices found for this organization and customer');
      return res.status(404).json({
        success: false,
        message: 'No invoices found for this organization and customer',
      });
    }
  } catch (error) {
    logger.error(
      `Error fetching invoices by organization ID and customer ID: ${error.message}`
    );
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const get_InvoicesByOrganizationIdAndCustomerIdAndStatus = async (
  req,
  res
) => {
  try {
    const invoices = await getInvoicesbyorganizationIdAndCustomerIdAndStatus(
      req.params.organizationId,
      req.params.customerId,
      req.params.status
    );
    if (invoices) {
      return res.json({ success: true, invoices });
    } else {
      logger.warn(
        'No invoices found for this organization, customer and status'
      );
      return res.status(404).json({
        success: false,
        message: 'No invoices found for this organization, customer and status',
      });
    }
  } catch (error) {
    logger.error(
      `Error fetching invoices by organization ID, customer ID and status: ${error.message}`
    );
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const get_InvoicesByOrganizationIdAndStatus = async (req, res) => {
  try {
    const invoices = await getInvoicesbyorganizationIdAndStatus(
      req.params.organizationId,
      req.params.status
    );
    if (invoices) {
      return res.json({ success: true, invoices });
    } else {
      logger.warn('No invoices found for this organization and status');
      return res.status(404).json({
        success: false,
        message: 'No invoices found for this organization and status',
      });
    }
  } catch (error) {
    logger.error(
      `Error fetching invoices by organization ID and status: ${error.message}`
    );
    return res.status(500).json({ success: false, message: error.message });
  }
};
