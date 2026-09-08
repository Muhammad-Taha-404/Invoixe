'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  FileText,
  Globe,
  MapPin,
  Home,
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle,
  Building2,
} from 'lucide-react';

export default function CreateCustomerPage() {
  const router = useRouter();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [taxId, setTaxId] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  
  // Billing Address JSON Fields
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Status State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      name,
      email: email || undefined,
      phone: phone || undefined,
      taxId: taxId || undefined,
      country: country || undefined,
      state: state || undefined,
      billingAddress: {
        street: street || undefined,
        city: city || undefined,
        postalCode: postalCode || undefined,
      },
    };

    try {
      // const res = await fetch('http://localhost:5000/api/customers', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   credentials: 'include',
      //   body: JSON.stringify(payload),
      // });

      // const data = await res.json();

      // if (!res.ok) {
      //   throw new Error(data.message || 'Failed to create customer');
      // }

      // router.push('/customers');

      // Mock redirect for testing
      setTimeout(() => {
        router.push('/customers');
      }, 500);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 selection:bg-blue-500 selection:text-white flex flex-col items-center justify-center">
      <div className="max-w-xl w-full space-y-4">
        
        {/* Navigation Toolbar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Customers
          </button>
        </div>

        {/* Card Header & Form */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
          <div className="space-y-1">
            <h1 className="text-base sm:text-lg font-semibold text-white tracking-tight">
              Add New Customer
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Create a new customer profile for issuing invoices and tracking payments.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Primary Details Header */}
            <div className="space-y-3">
              <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Basic Info
              </span>

              {/* Customer Name */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Customer Name <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Corporation or John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      placeholder="billing@acme.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Tax Info Header */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Location & Tax Info
              </span>

              {/* Tax ID, Country & State */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Tax / VAT ID
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="US12345678"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Country
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="United States"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    State / Region
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="California"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Address JSON Object Breakdown */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Billing Address Details
              </span>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Street Address
                </label>
                <div className="relative">
                  <Home className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="123 Tech Blvd, Suite 400"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="San Francisco"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Postal / Zip Code
                  </label>
                  <input
                    type="text"
                    placeholder="94105"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Saving Customer...
                  </>
                ) : (
                  <>
                    Save Customer
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}