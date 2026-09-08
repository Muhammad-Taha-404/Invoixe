'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  Zap,
  BarChart3,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Menu,
  X,
  CreditCard,
  Send,
  Users,
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-125 bg-gradient-to-tr from-blue-600/20 via-indigo-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-slate-800/80 bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white">
            <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl shadow-lg shadow-blue-500/20">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span>Invoixe</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl shadow-md shadow-blue-600/20 transition-all duration-200 active:scale-95"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-900 px-4 py-6 space-y-4">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 font-medium">Features</a>
            <a href="#solutions" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 font-medium">Solutions</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 font-medium">Pricing</a>
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <Link href="/login" className="w-full text-center py-2 text-slate-300 font-semibold border border-slate-700 rounded-xl">Sign In</Link>
              <Link href="/sign-up" className="w-full text-center py-2 bg-blue-600 text-white font-semibold rounded-xl">Get Started Free</Link>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold mb-8 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Introducing Invoixe 2.0 &mdash; Automated Billing Built for Scale</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          Invoice faster, collect payments <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">without the stress</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The modern invoicing platform for freelancers, agencies, and SaaS businesses. Create professional invoices, manage client billing, and get paid 3x faster.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/sign-up"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 active:scale-95"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold rounded-xl transition-colors"
          >
            Explore Features
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> No credit card required</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 14-day free trial</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant setup</span>
        </div>

        {/* App Dashboard Preview Graphic */}
        <div className="mt-16 relative mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/60 p-2 shadow-2xl backdrop-blur-xl">
          <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-6 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-xs text-slate-500 font-mono">invoixe.com/dashboard</div>
            </div>
            {/* Mock Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Total Revenue</p>
                <p className="text-2xl font-bold text-white mt-1">$48,250.00</p>
                <span className="text-xs text-emerald-400 font-semibold">+18.2% this month</span>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Pending Invoices</p>
                <p className="text-2xl font-bold text-white mt-1">12</p>
                <span className="text-xs text-amber-400 font-semibold">Awaiting payment</span>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Paid Out</p>
                <p className="text-2xl font-bold text-white mt-1">$36,800.00</p>
                <span className="text-xs text-blue-400 font-semibold">Updated 5m ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURE GRID */}
      <section id="features" className="py-20 bg-slate-900/50 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Powerful Capabilities</h2>
            <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Everything you need to automate client billing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FileText className="w-6 h-6 text-blue-400" />}
              title="Instant Invoice Creation"
              description="Build professional invoices in seconds with custom branding, line items, automatic tax handling, and currency conversion."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-indigo-400" />}
              title="Automated Reminders"
              description="Never chase unpaid bills manually again. Schedule automated email reminders for pending and overdue invoices."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6 text-emerald-400" />}
              title="Enterprise Security"
              description="Built with industry-grade encryption, email token verification, and strict role-based access controls."
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6 text-purple-400" />}
              title="Revenue Analytics"
              description="Real-time financial dashboards show cash flow trends, payment history, and forecast future earnings."
            />
            <FeatureCard
              icon={<CreditCard className="w-6 h-6 text-amber-400" />}
              title="Seamless Payments"
              description="Accept payments directly via credit card, wire transfer, or digital wallets right from the client invoice view."
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6 text-sky-400" />}
              title="Multi-Currency Support"
              description="Invoice global clients in 130+ currencies with real-time exchange rates calculated automatically."
            />
          </div>
        </div>
      </section>

      {/* 4. PRICING SECTION */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Transparent Pricing</h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Choose the plan that fits your growth</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter */}
          <PricingCard
            title="Starter"
            price="$0"
            description="Perfect for freelancers and solo creators starting out."
            features={['Up to 5 active clients', 'Standard invoice templates', 'Manual payment recording', 'Email support']}
            buttonText="Get Started Free"
            href="/sign-up"
          />
          {/* Pro */}
          <PricingCard
            title="Pro"
            price="$29"
            period="/month"
            popular
            description="Designed for growing agencies and busy professionals."
            features={[
              'Unlimited clients & invoices',
              'Automated email payment reminders',
              'Custom domain & branding',
              'Multi-currency processing',
              'Priority 24/7 support',
            ]}
            buttonText="Start 14-Day Free Trial"
            href="/sign-up"
          />
          {/* Enterprise */}
          <PricingCard
            title="Enterprise"
            price="$99"
            period="/month"
            description="For team-based businesses requiring advanced controls."
            features={[
              'Everything in Pro',
              'Unlimited team members',
              'Dedicated account manager',
              'API & Webhook access',
              'Custom SLA & uptime guarantee',
            ]}
            buttonText="Contact Sales"
            href="/sign-up"
          />
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 md:p-16 text-center overflow-hidden shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to streamline your invoicing?
          </h2>
          <p className="mt-4 text-blue-100 text-lg max-w-2xl mx-auto">
            Join thousands of businesses getting paid faster with automated invoicing. Setup takes less than 2 minutes.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/sign-up"
              className="px-8 py-4 bg-white text-blue-600 hover:bg-slate-100 font-bold text-base rounded-xl shadow-lg transition-all duration-200 active:scale-95"
            >
              Get Started with Invoixe Today
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-white text-base">Invoixe</span>
            <span>&copy; {new Date().getFullYear()} Invoixe Technologies, Inc.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

{/* Component Helper: Feature Card */}
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all duration-300">
      <div className="p-3 bg-slate-900 rounded-xl w-fit mb-5">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}

{/* Component Helper: Pricing Card */}
function PricingCard({
  title,
  price,
  period = '',
  description,
  features,
  buttonText,
  popular = false,
  href,
}: {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
  href: string;
}) {
  return (
    <div
      className={`p-8 rounded-2xl flex flex-col justify-between border ${
        popular
          ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-blue-500/80 shadow-xl shadow-blue-500/10 relative'
          : 'bg-slate-950 border-slate-800'
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase rounded-full tracking-wider">
          Most Popular
        </span>
      )}
      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-slate-400 mt-2">{description}</p>
        <div className="my-6">
          <span className="text-4xl font-extrabold text-white">{price}</span>
          <span className="text-slate-400 text-sm">{period}</span>
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feat, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link
        href={href}
        className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 ${
          popular
            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30'
            : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800'
        }`}
      >
        {buttonText}
      </Link>
    </div>
  );
}