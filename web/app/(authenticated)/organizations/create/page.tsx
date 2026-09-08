'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  DollarSign,
  Upload,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Briefcase,
  Users,
  FileText,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import Image from 'next/image';

export default function CreateOrganizationPage() {
  const router = useRouter();

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('1-10');
  const [currency, setCurrency] = useState('USD');
  const [taxId, setTaxId] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Status State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-generate slug from organization name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
    );
  };

  // Image Upload Handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Sends HTTP-only auth cookies automatically
        body: JSON.stringify({
          name,
          slug,
          industry,
          companySize,
          currency,
          taxId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create organization');
      }

      // Redirect to dashboard on success
      router.push(`/dashboard?org=${data.organization?.slug || slug}`);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 selection:bg-blue-500 selection:text-white flex flex-col items-center justify-center">
      <div className="max-w-xl w-full space-y-4">
        
        {/* Navigation & Header Toolbar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[11px] font-medium">
            <Sparkles className="w-3 h-3" />
            <span>Workspace Setup</span>
          </div>
        </div>

        {/* Form Card Header */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
          <div className="space-y-1">
            <h1 className="text-base sm:text-lg font-semibold text-white tracking-tight">
              Create your Organization
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Set up your team workspace to issue invoices, manage members, and process payments.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Logo Upload Box */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="relative group shrink-0">
                <div className="w-12 h-12 rounded-lg border border-dashed border-slate-700 bg-slate-900 flex items-center justify-center overflow-hidden transition-colors group-hover:border-blue-500">
                  {logoPreview ? (
                    <Image
                      src={logoPreview}
                      alt="Logo preview"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 rounded-lg cursor-pointer text-[10px] font-medium text-white transition-opacity">
                  <Upload className="w-3 h-3 mr-0.5" />
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>

              <div className="space-y-0.5">
                <h3 className="text-xs font-medium text-white">Organization Logo</h3>
                <p className="text-[11px] text-slate-400">
                  PNG or SVG, max 2MB. Appears on outgoing invoices.
                </p>
              </div>
            </div>

            {/* Organization Name */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Organization Name <span className="text-blue-400">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corporation"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Workspace URL Slug */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Workspace URL <span className="text-blue-400">*</span>
              </label>
              <div className="flex rounded-lg overflow-hidden border border-slate-800 bg-slate-950 focus-within:border-blue-500 transition-colors">
                <span className="inline-flex items-center px-2.5 bg-slate-900 border-r border-slate-800 text-xs font-mono text-slate-500 select-none">
                  invoixe.com/
                </span>
                <input
                  type="text"
                  required
                  placeholder="acme-corp"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  className="w-full px-2.5 py-2 bg-slate-950 text-white text-xs focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Industry & Company Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Industry <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <select
                    required
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="" disabled>Select Industry</option>
                    <option value="software">Software & Technology</option>
                    <option value="agency">Design & Marketing Agency</option>
                    <option value="freelance">Consulting & Services</option>
                    <option value="e-commerce">E-Commerce & Retail</option>
                    <option value="healthcare">Healthcare & Life Sciences</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Company Size
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <select
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="1">Solo / Freelancer (1)</option>
                    <option value="1-10">Small Team (2–10)</option>
                    <option value="11-50">Medium Business (11–50)</option>
                    <option value="50+">Enterprise (50+)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Currency & Tax ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Billing Currency <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <select
                    required
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="USD">USD ($) - US Dollar</option>
                    <option value="EUR">EUR (€) - Euro</option>
                    <option value="GBP">GBP (£) - British Pound</option>
                    <option value="PKR">PKR (Rs) - Pakistani Rupee</option>
                    <option value="CAD">CAD ($) - Canadian Dollar</option>
                    <option value="AUD">AUD ($) - Australian Dollar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Tax / VAT ID
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="e.g. US123456789"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors font-mono"
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
                    Creating Workspace...
                  </>
                ) : (
                  <>
                    Create Organization & Continue
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