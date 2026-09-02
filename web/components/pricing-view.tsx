'use client';

import React, { useState } from 'react';
import { Check, Zap, Building2, HelpCircle } from 'lucide-react';


export default function PricingView() {
  const [isYearly, setIsYearly] = useState(true);
  return (
     <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white py-24 px-4 sm:px-6 lg:px-8">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />
    
          <div className="max-w-7xl mx-auto relative">
            {/* --- HEADER --- */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">
                Predictable Pricing
              </h2>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
                Scale Your Billing Without Surprises
              </h1>
              <p className="mt-4 text-lg text-slate-400">
                Start processing invoices and managing subscriptions in minutes. Upgrade as your multi-tenant organization grows.
              </p>
    
              {/* Monthly / Yearly Billing Toggle */}
              <div className="mt-10 flex items-center justify-center gap-4">
                <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-slate-400'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className="relative w-14 h-8 rounded-full bg-slate-800 border border-slate-700 transition-colors p-1 flex items-center"
                  aria-label="Toggle billing interval"
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-indigo-500 shadow-md transform transition-transform ${
                      isYearly ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium flex items-center gap-2 ${isYearly ? 'text-white' : 'text-slate-400'}`}>
                  Yearly
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Save 20%
                  </span>
                </span>
              </div>
            </div>
    
            {/* --- PRICING CARDS --- */}
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              
              {/* Starter Plan */}
              <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Starter</h3>
                    <span className="p-2 rounded-lg bg-slate-800 text-slate-400"><Zap className="w-5 h-5" /></span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">Perfect for early-stage startups & freelancers.</p>
                  
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      {isYearly ? '$15' : '$19'}
                    </span>
                    <span className="text-slate-400 text-sm">/month</span>
                  </div>
    
                  <ul className="mt-8 space-y-4 text-sm text-slate-300">
                    <PricingFeature text="Up to 50 active recurring invoices" />
                    <PricingFeature text="Single Organization workspace" />
                    <PricingFeature text="Stripe & JazzCash integration" />
                    <PricingFeature text="Automated GST & VAT calculation engine" />
                    <PricingFeature text="Standard email templates with retries" />
                    <PricingFeature text="7-day revenue metrics retention" />
                  </ul>
                </div>
    
                <button className="mt-8 w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all border border-slate-700">
                  Start Free Trial
                </button>
              </div>
    
              {/* Growth / Pro Plan (Highlighted) */}
              <div className="relative rounded-2xl bg-slate-900/90 border-2 border-indigo-500/80 p-8 flex flex-col justify-between shadow-2xl shadow-indigo-500/10">
                {/* Popular Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold tracking-wide uppercase shadow-md">
                  Most Popular
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Growth</h3>
                    <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <Zap className="w-5 h-5" />
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">For scaling SMEs requiring custom billing & webhooks.</p>
                  
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      {isYearly ? '$49' : '$59'}
                    </span>
                    <span className="text-slate-400 text-sm">/month</span>
                  </div>
    
                  <ul className="mt-8 space-y-4 text-sm text-slate-200">
                    <PricingFeature text="Unlimited invoices & dynamic subscriptions" highlight />
                    <PricingFeature text="Multi-tenant member seats (Up to 10 users)" highlight />
                    <PricingFeature text="Idempotent webhook engine & event logs" highlight />
                    <PricingFeature text="Usage-based metering & proration engine" highlight />
                    <PricingFeature text="Real-time MRR, Churn & AR metrics dashboard" highlight />
                    <PricingFeature text="Custom email templates & automated dunning" highlight />
                  </ul>
                </div>
    
                <button className="mt-8 w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25">
                  Get Started Now
                </button>
              </div>
    
              {/* Enterprise Plan */}
              <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Enterprise</h3>
                    <span className="p-2 rounded-lg bg-slate-800 text-slate-400"><Building2 className="w-5 h-5" /></span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">Dedicated multi-tenant isolation & regulatory compliance.</p>
                  
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">Custom</span>
                  </div>
    
                  <ul className="mt-8 space-y-4 text-sm text-slate-300">
                    <PricingFeature text="Strict row/schema database data isolation" />
                    <PricingFeature text="Immutable audit trails for financial compliance" />
                    <PricingFeature text="Dedicated webhooks throughput & custom SLA" />
                    <PricingFeature text="Custom tax rule configuration & regional rails" />
                    <PricingFeature text="Unlimited organization member seats" />
                    <PricingFeature text="Dedicated account manager & 24/7 priority support" />
                  </ul>
                </div>
    
                <button className="mt-8 w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all border border-slate-700">
                  Contact Sales
                </button>
              </div>
    
            </div>
    
            {/* --- FAQ SECTION --- */}
            <div className="mt-24 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white text-center mb-10">Frequently Asked Questions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FaqCard 
                  question="How are local taxes like Pakistan GST and VAT calculated?" 
                  answer="Our dynamic engine checks the customer's billing region and automatically applies the applicable GST or VAT rate to each line item before generating the invoice."
                />
                <FaqCard 
                  question="How do idempotent webhooks protect against duplicate charges?" 
                  answer="Every incoming event from Stripe or JazzCash is assigned a unique idempotency key. Duplicate events are acknowledged but safely discarded by your backend."
                />
                <FaqCard 
                  question="Can I invite team members to my organization?" 
                  answer="Yes! Our multi-tenant architecture uses Role-Based Access Control (RBAC). You can assign users as Admins, Billing Managers, or Read-Only Auditors."
                />
                <FaqCard 
                  question="Are regional payment rails like JazzCash fully supported?" 
                  answer="Yes. We provide native integrations alongside Stripe, allowing regional customers to pay via local mobile wallets and bank transfers seamlessly."
                />
              </div>
            </div>
    
          </div>
        </div>
  );
}

function PricingFeature({ text, highlight = false }: { text: string; highlight?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${highlight ? 'text-indigo-400' : 'text-slate-400'}`} />
      <span>{text}</span>
    </li>
  );
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
      <h4 className="font-semibold text-white text-base flex items-center gap-2 mb-2">
        <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
        {question}
      </h4>
      <p className="text-sm text-slate-400 leading-relaxed pl-6">{answer}</p>
    </div>
  );
}