import { invoices } from '../models/invoices.model.js';
import { db } from '../config/database.js';
import { and, eq } from 'drizzle-orm';

export const getAllInvoices = async () => {
  const invoices = await db.select().from(invoices);
  if (!invoices || invoices.length === 0) {
    return null;
  }
  return invoices;
};

export const getInvoiceById = async id => {
  const invoice = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, id))
    .first();
  if (!invoice) {
    return null;
  }
  return invoice;
};

export const createInvoice = async invoiceData => {
  const existingInvoice = await db
    .select()
    .from(invoices)
    .where(eq(invoices.invoiceNumber, invoiceData.invoiceNumber))
    .first();
  if (existingInvoice) {
    return null;
  }
  const newInvoice = await db.insert(invoices).values(invoiceData).returning();
  return newInvoice[0];
};

export const updateInvoice = async (id, invoiceData) => {
  const existingInvoice = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, id))
    .first();
  if (existingInvoice) {
    const updatedInvoice = await db
      .update(invoices)
      .set(invoiceData)
      .where(eq(invoices.id, id))
      .returning();
    return updatedInvoice[0];
  }
  return null;
};

export const deleteInvoice = async id => {
  const existingInvoice = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, id))
    .first();
  if (existingInvoice) {
    await db.delete(invoices).where(eq(invoices.id, id));
    return existingInvoice;
  }
  return null;
};

export const getInvoicesByOrganizationId = async organizationId => {
  const invoicesList = await db
    .select()
    .from(invoices)
    .where(eq(invoices.organizationId, organizationId));
  if (!invoicesList || invoicesList.length === 0) {
    return null;
  }
  return invoicesList;
};

export const getInvoicesByCustomerId = async customerId => {
  const invoicesList = await db
    .select()
    .from(invoices)
    .where(eq(invoices.customerId, customerId));
  if (!invoicesList || invoicesList.length === 0) {
    return null;
  }
  return invoicesList;
};

export const getInvoicesByStatus = async status => {
  const invoicesList = await db
    .select()
    .from(invoices)
    .where(eq(invoices.status, status));
  if (!invoicesList || invoicesList.length === 0) {
    return null;
  }
  return invoicesList;
};

export const getInvoicesbyorganizationIdAndStatus = async (
  organizationId,
  status
) => {
  const invoicesList = await db
    .select()
    .from(invoices)
    .where(
      and(
        eq(invoices.organizationId, organizationId),
        eq(invoices.status, status)
      )
    );
  if (!invoicesList || invoicesList.length === 0) {
    return null;
  }
  return invoicesList;
};

export const getInvoicesbycustomerIdAndStatus = async (customerId, status) => {
  const invoicesList = await db
    .select()
    .from(invoices)
    .where(
      and(eq(invoices.customerId, customerId), eq(invoices.status, status))
    );
  if (!invoicesList || invoicesList.length === 0) {
    return null;
  }
  return invoicesList;
};

export const getInvoicesbyorganizationIdAndCustomerId = async (
  organizationId,
  customerId
) => {
  const invoicesList = await db
    .select()
    .from(invoices)
    .where(
      and(
        eq(invoices.organizationId, organizationId),
        eq(invoices.customerId, customerId)
      )
    );
  if (!invoicesList || invoicesList.length === 0) {
    return null;
  }
  return invoicesList;
};

export const getInvoicesbyorganizationIdAndCustomerIdAndStatus = async (
  organizationId,
  customerId,
  status
) => {
  const invoicesList = await db
    .select()
    .from(invoices)
    .where(
      and(
        eq(invoices.organizationId, organizationId),
        eq(invoices.customerId, customerId),
        eq(invoices.status, status)
      )
    );
  if (!invoicesList || invoicesList.length === 0) {
    return null;
  }
  return invoicesList;
};
