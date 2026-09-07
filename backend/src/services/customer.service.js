import { customers } from '#models/customers.model.js';
import logger from '#config/logger.js';
import { db } from '#config/database.js';

export const getAllCustomers = async () => {
  try {
    const allCustomers = await db.select().from(customers);
    return allCustomers;
  } catch (error) {
    logger.error('Error fetching customers:', error);
    return null;
  }
};

export const getCustomersByOrganizationId = async organizationId => {
  try {
    const organizationCustomers = await db
      .select()
      .from(customers)
      .where({ organizationId });
    if (organizationCustomers.length === 0) {
      logger.error(`No customers found for organization ID: ${organizationId}`);
      return null; // Return null if no customers are found for the given organization ID
    }
    return organizationCustomers;
  } catch (error) {
    logger.error('Error fetching customers by organization ID:', error);
    return null;
  }
};

export const getCustomerById = async customerId => {
  try {
    const customer = await db
      .select()
      .from(customers)
      .where({ id: customerId })
      .first();
    if (!customer) {
      logger.error('Customer not found with ID:', customerId);
      return null; // Return null if the customer is not found
    }
    return customer;
  } catch (error) {
    logger.error('Error fetching customer:', error);
    return null;
  }
};

export const createCustomer = async customerData => {
  try {
    const existingCustomer = await db
      .select()
      .from(customers)
      .where({ email: customerData.email })
      .first();
    if (existingCustomer) {
      logger.error(
        'Customer with this email already exists:',
        customerData.email
      );
      return null; // Return null if the customer already exists
    }
    const newCustomer = await db
      .insert(customers)
      .values(customerData)
      .returning('*');
    return newCustomer;
  } catch (error) {
    logger.error('Error creating customer:', error);
    return null;
  }
};

export const updateCustomer = async (customerId, updatedData) => {
  try {
    const existingCustomer = await db
      .select()
      .from(customers)
      .where({ id: customerId })
      .first();
    if (!existingCustomer) {
      logger.error('Customer not found with ID:', customerId);
      return null; // Return null if the customer is not found
    }
    const updatedCustomer = await db
      .update(customers)
      .set(updatedData)
      .where({ id: customerId })
      .returning('*');
    return updatedCustomer;
  } catch (error) {
    logger.error('Error updating customer:', error);
    return null;
  }
};

export const deleteCustomer = async customerId => {
  try {
    const existingCustomer = await db
      .select()
      .from(customers)
      .where({ id: customerId })
      .first();
    if (!existingCustomer) {
      logger.error('Customer not found with ID:', customerId);
      return null; // Return null if the customer is not found
    }
    const deletedCustomer = await db
      .delete()
      .from(customers)
      .where({ id: customerId })
      .returning('*');
    return deletedCustomer;
  } catch (error) {
    logger.error('Error deleting customer:', error);
    return null;
  }
};
