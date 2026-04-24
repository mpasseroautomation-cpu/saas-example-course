import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

export default function MarketingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden font-sans">


      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl tracking-tight text-white drop-shadow-md">ContentFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
          <Link href="#" className="hover:text-white transition-colors">Home</Link>
          <Link href="#platform" className="hover:text-white transition-colors">Platform</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Sign In</Link>
          <Link href="/signup" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors flex items-center gap-2">
            <span className="hidden sm:inline">Create Account</span>
            <span className="sm:hidden">Sign Up</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center text-center pt-32 pb-32 px-4 min-h-[70vh] border-b border-white/5 overflow-hidden">
        {/* Background Video strictly in Hero */}
        <div className="absolute inset-0 z-0 bg-black pointer-events-none flex items-center justify-center">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full max-w-6xl h-auto object-cover opacity-100"
          >
            <source src="/bg-animation.mp4" type="video/mp4" />
          </video>
          {/* Subtle vignette for text readability */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,black_100%)] opacity-70" />
        </div>
        
        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Floating elements like the screenshot */}
        <div className="absolute top-40 left-[15%] hidden lg:flex flex-col items-start gap-1 opacity-70">
          <div className="flex items-center gap-2 text-zinc-400 text-sm"><span className="w-2 h-2 rounded-full bg-zinc-400" /> Articles</div>
          <span className="text-xs text-zinc-600">20.945</span>
        </div>
        <div className="absolute top-60 right-[20%] hidden lg:flex flex-col items-start gap-1 opacity-70">
          <div className="flex items-center gap-2 text-zinc-400 text-sm"><span className="w-2 h-2 rounded-full bg-zinc-400" /> SEO Content</div>
          <span className="text-xs text-zinc-600">2.945</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Unlock Your Content Spark! &rarr;
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-2xl max-w-4xl leading-tight">
          One-click for Content Defense
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 drop-shadow-md">
          Dive into the art of content, where innovative AI technology meets professional writing expertise.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/login" className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 backdrop-blur-md transition-all flex items-center gap-2 text-sm">
            Open App <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="#pricing" className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-all text-sm">
            Discover More
          </Link>
        </div>
        </div>
      </main>

      {/* Platform Section */}
      <section id="platform" className="relative z-10 py-24 px-6 border-t border-white/5 bg-black/40 backdrop-blur-sm mt-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">How our platform works</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-16">
            We streamline your content creation process. Simply request articles, blog posts, or emails, and our AI-assisted experts will deliver ready-to-publish content straight to your dashboard.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold mb-3">1. Request</h3>
              <p className="text-sm text-zinc-400">Fill out a simple form detailing your content needs and target audience.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold mb-3">2. We Write</h3>
              <p className="text-sm text-zinc-400">Our expert writers and AI models craft your high-converting content.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold mb-3">3. Publish</h3>
              <p className="text-sm text-zinc-400">Receive your optimized content, ready to publish directly from the dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 bg-black/80 backdrop-blur-xl border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-zinc-400">Choose the plan that best fits your content needs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col hover:border-white/20 transition-colors">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <p className="text-zinc-400 text-sm mb-6">Perfect to get a feel of our platform.</p>
              <div className="mb-8">
                <span className="text-5xl font-bold">€0</span>
                <span className="text-zinc-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-zinc-300 text-sm">
                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white" /> 1 Content Request per month</li>
                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white" /> Basic AI formatting</li>
                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-white" /> 3-day turnaround</li>
              </ul>
              <Link href="/signup" className="w-full block text-center py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors font-medium">
                Start for free
              </Link>
            </div>

            {/* Paid Tier */}
            <div className="p-8 rounded-3xl border border-white bg-white backdrop-blur-md flex flex-col relative overflow-hidden text-black scale-105 shadow-2xl">
              <div className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">Most Popular</div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-zinc-600 text-sm mb-6">For serious businesses needing scale.</p>
              <div className="mb-8">
                <span className="text-5xl font-bold">€19</span>
                <span className="text-zinc-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-black text-sm font-medium">
                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-black" /> Unlimited Content Requests</li>
                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-black" /> Premium Human Editing</li>
                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-black" /> 24-hour turnaround</li>
                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-black" /> SEO Optimization included</li>
              </ul>
              <Link href="/signup" className="w-full block text-center py-3 rounded-full bg-black text-white font-semibold hover:bg-zinc-800 transition-colors">
                Get Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-24 px-6 bg-black/60 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold mb-2">What is the turnaround time?</h3>
              <p className="text-zinc-400 text-sm">Most content requests are fulfilled within 24 to 72 hours depending on your chosen plan and the complexity of the topic.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold mb-2">Do I own the content?</h3>
              <p className="text-zinc-400 text-sm">Yes, absolutely. Once the content is delivered and approved, you retain full copyright and ownership.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold mb-2">Can I request revisions?</h3>
              <p className="text-zinc-400 text-sm">Yes, our Pro plan includes unlimited revisions to ensure the content perfectly matches your voice and requirements.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
