import { Metadata } from 'next';
import PricingView from '#components/pricing-view.tsx';

export const metadata: Metadata = {
  title: 'Pricing & Plans | Invoixe',
  description: 'Flexible billing and subscription management plans for growing businesses.',
};

export default function PricingPage() {
  return <PricingView />;
}