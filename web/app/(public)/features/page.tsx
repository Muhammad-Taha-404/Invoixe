import React from 'react';
import { 
  Receipt, 
  ShieldCheck, 
  CreditCard, 
  TrendingUp, 
  Zap, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Background Gradient Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md">
          <Zap className="w-4 h-4 text-indigo-400" />
          <span>Built for Global & Regional Rails (Stripe + SafePay)</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
          Automate Invoicing, Global Taxes & Subscriptions on One Platform
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed">
          A multi-tenant billing engine designed for SMEs. Handle recurring subscription tiers, localized GST/VAT calculations, idempotent webhooks, and real-time MRR analytics without custom code hacks.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 active:scale-95">
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold text-sm transition-all active:scale-95">
            Book API Demo
          </button>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-6 sm:gap-12 text-slate-400 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multi-tenant Data Isolation
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Localized Tax Engine (GST/VAT)
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Idempotent Webhook Delivery
          </div>
        </div>

        {/* Dashboard Preview Graphic */}
        <div className="mt-14 relative rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 backdrop-blur-xl shadow-2xl max-w-5xl mx-auto overflow-hidden">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-2 font-mono text-slate-500">app.invoixe.io/dashboard/billing</span>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              Live Webhook Sync
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Monthly Recurring Revenue</span>
              <p className="text-2xl font-bold text-white mt-1">$48,250.00</p>
              <span className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3" /> +14.2% vs last month
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Tax Processed (GST/VAT)</span>
              <p className="text-2xl font-bold text-white mt-1">$6,140.80</p>
              <span className="text-xs text-indigo-400 flex items-center gap-1 mt-2">
                <ShieldCheck className="w-3 h-3" /> Auto-calculated & logged
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Payment Rails</span>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-2 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/50 text-xs font-semibold">Stripe (Global)</span>
                <span className="px-2 py-1 rounded bg-red-950 text-red-300 border border-red-800/50 text-xs font-semibold">JazzCash (PK)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE GRID SECTION --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">Enterprise Core</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for Subscription & Tax Complexity
          </p>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Built to handle edge cases—from network drops during payment webhook delivery to regional tax compliance and strict data isolation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <FeatureCard 
            icon={<Receipt className="w-6 h-6 text-indigo-400" />}
            title="Automated Recurring & Tax Engine"
            description="Generate recurring invoices with conflict handling. Automatically apply dynamic regional taxes—including Pakistan GST, EU VAT, and global sales tax based on customer geolocation."
          />

          {/* Card 2 */}
          <FeatureCard 
            icon={<RefreshCw className="w-6 h-6 text-indigo-400" />}
            title="Flexible Subscription Billing"
            description="Manage flat-rate, multi-tier, or usage-based pricing models with dynamic meter tracking, upgrade proration, and automated coupon/discount support."
          />

          {/* Card 3 */}
          <FeatureCard 
            icon={<CreditCard className="w-6 h-6 text-indigo-400" />}
            title="Local & Global Gateways"
            description="Accept card payments worldwide via Stripe while seamlessly supporting regional payment rails like JazzCash and direct bank transfers for South Asian markets."
          />

          {/* Card 4 */}
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-indigo-400" />}
            title="Idempotent Webhooks & Retries"
            description="Zero duplicate charges or dropped states. Signature-verified webhook processing with exponential backoff retries ensures 100% event synchronization consistency."
          />

          {/* Card 5 */}
          <FeatureCard 
            icon={<TrendingUp className="w-6 h-6 text-indigo-400" />}
            title="Real-time Revenue Analytics"
            description="Track MRR growth, expansion/contraction revenue, user churn rates, and outstanding accounts receivable directly through an enterprise dashboard."
          />

          {/* Card 6 */}
          <FeatureCard 
            icon={<Building2 className="w-6 h-6 text-indigo-400" />}
            title="Multi-Tenant & Audit Compliance"
            description="Row-level multi-tenant database isolation ensures strict tenant security. Immutable financial logs maintain complete audit trails required for regulatory compliance."
          />
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5">
      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}