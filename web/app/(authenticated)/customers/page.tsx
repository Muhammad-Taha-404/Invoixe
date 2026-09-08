'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  FileText,
  Loader2,
  ArrowLeft,
  MoreHorizontal,
  Building2,
  Trash2,
  Edit3,
} from 'lucide-react';

interface BillingAddress {
  street?: string;
  city?: string;
  postalCode?: string;
}

interface Customer {
  id: string;
  organizationId: string;
  name: string;
  email?: string;
  phone?: string;
  taxId?: string;
  country?: string;
  state?: string;
  billingAddress?: BillingAddress;
  createdAt: string;
}

export default function CustomersPage() {
  const router = useRouter();

  // State
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch Customers
  useEffect(() => {
    async function fetchCustomers() {
      // try {
      //   const res = await fetch('http://localhost:5000/api/customers', {
      //     credentials: 'include',
      //   });
      //   if (res.ok) {
      //     const data = await res.json();
      //     setCustomers(data.customers || []);
      //   }
      // } catch (err) {
      //   console.error('Failed to fetch customers:', err);
      // } finally {
      //   setLoading(false);
      // }

      // Mock Data for Testing
      setCustomers([
        {
          id: '1',
          organizationId: 'org-123',
          name: 'Acme Software Solutions',
          email: 'billing@acme.com',
          phone: '+1 (555) 019-2834',
          taxId: 'US-987654321',
          country: 'United States',
          state: 'California',
          billingAddress: { street: '123 Tech Blvd', city: 'San Francisco', postalCode: '94105' },
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          organizationId: 'org-123',
          name: 'Nexus Digital Agency',
          email: 'contact@nexusdigital.io',
          phone: '+44 20 7946 0912',
          taxId: 'GB-123456789',
          country: 'United Kingdom',
          state: 'London',
          billingAddress: { street: '45 Oxford St', city: 'London', postalCode: 'W1D 2DZ' },
          createdAt: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }

    fetchCustomers();
  }, []);

  // Filtered List
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.country?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 selection:bg-blue-500 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-4">
        
        {/* Top Navigation & Header Toolbar */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-slate-400" />
            <div>
              <h1 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Customers
              </h1>
              <p className="text-[11px] text-slate-500">
                Manage customer billing details and contact profiles
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push('/customers/create')}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Customer
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by customer name, email, or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Customers Table / Empty State */}
        {filteredCustomers.length === 0 ? (
          <div className="py-12 px-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center max-w-md mx-auto space-y-2">
            <p className="text-xs text-slate-400">No customers found</p>
            <p className="text-[11px] text-slate-500">
              Create your first customer profile to start generating invoices.
            </p>
          </div>
        ) : (
          <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    <th className="py-2.5 px-3.5">Customer</th>
                    <th className="py-2.5 px-3.5">Contact</th>
                    <th className="py-2.5 px-3.5">Location</th>
                    <th className="py-2.5 px-3.5">Tax ID</th>
                    <th className="py-2.5 px-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-800/30 transition-colors">
                      {/* Name & ID */}
                      <td className="py-2.5 px-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-[11px] font-bold shrink-0">
                            {customer.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-white text-xs">{customer.name}</p>
                            <p className="text-[10px] text-slate-500 font-mono">{customer.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Email & Phone */}
                      <td className="py-2.5 px-3.5">
                        <div className="space-y-0.5 text-[11px]">
                          {customer.email && (
                            <div className="flex items-center gap-1.5 text-slate-300">
                              <Mail className="w-3 h-3 text-slate-500" />
                              <span>{customer.email}</span>
                            </div>
                          )}
                          {customer.phone && (
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <Phone className="w-3 h-3 text-slate-500" />
                              <span>{customer.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-2.5 px-3.5">
                        <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                          <span>
                            {[customer.state, customer.country].filter(Boolean).join(', ') || 'N/A'}
                          </span>
                        </div>
                      </td>

                      {/* Tax ID */}
                      <td className="py-2.5 px-3.5 font-mono text-[11px] text-slate-400">
                        {customer.taxId || '—'}
                      </td>

                      {/* Actions */}
                      <td className="py-2.5 px-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            title="Edit Customer"
                            className="p-1 text-slate-400 hover:text-white rounded transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            title="Delete Customer"
                            className="p-1 text-slate-400 hover:text-red-400 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}