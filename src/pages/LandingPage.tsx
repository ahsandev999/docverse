import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/landing/Hero';
import ToolsGrid from '../components/landing/ToolsGrid';
import Features from '../components/landing/Features';
import { Stats, CTASection } from '../components/landing/Stats';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function LandingPage() {
  useDocumentTitle();
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <Hero />
      <Stats />
      <ToolsGrid />
      <Features />
      <CTASection />
      <Footer />
    </div>
  );
}
