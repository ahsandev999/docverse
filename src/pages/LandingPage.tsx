import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import ToolsGrid from '../components/landing/ToolsGrid';
import Features from '../components/landing/Features';
import UseCases from '../components/landing/UseCases';
import Comparison from '../components/landing/Comparison';
import TrustSecurity from '../components/landing/TrustSecurity';
import FAQ from '../components/landing/FAQ';
import { Stats, CTASection } from '../components/landing/Stats';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function LandingPage() {
  useDocumentTitle();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <ToolsGrid />
        <Features />
        <UseCases />
        <Comparison />
        <TrustSecurity />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
