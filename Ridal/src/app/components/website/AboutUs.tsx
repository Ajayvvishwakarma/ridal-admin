import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Wrench,
  Users,
  Award,
  Shield,
  Camera,
  Clock,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Phone,
  Mail,
  Star,
} from "lucide-react";

export function AboutUs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { number: "2,00,000+", label: "Customers Served" },
    { number: "4.8★", label: "Customer Rating" },
    { number: "32+", label: "Cities" },
    { number: "30-Day", label: "Warranty" },
  ];

  const journey = [
    {
      number: "01",
      icon: "🚀",
      title: "Founded",
      desc: "Started with a simple mission — make vehicle servicing as easy as ordering food. No middlemen, no workshops, just expert mechanics at your door.",
    },
    {
      number: "02",
      icon: "📱",
      title: "App Launch",
      desc: "Launched on Android & iOS with real-time tracking, digital job cards, and instant booking — designed for India's mobile-first users.",
    },
    {
      number: "03",
      icon: "🏙️",
      title: "32+ Cities",
      desc: "Expanded across India — from metros to tier-2 cities. Same quality, same transparency, same warranty everywhere.",
    },
    {
      number: "04",
      icon: "🎯",
      title: "2,00,000+ Customers",
      desc: "Trusted by over two lakh customers with a 4.8-star rating. Building India's most reliable doorstep vehicle service network.",
    },
  ];

  const values = [
    {
      icon: <Home size={32} />,
      title: "Doorstep Convenience",
      desc: "No more garage trips. Our mechanics come to your home, office, or wherever you are — fully equipped for any job.",
    },
    {
      icon: <Award size={32} />,
      title: "Transparent Pricing",
      desc: "See exact costs before you book. No hidden fees, no surprises — ever. What you see is what you pay.",
    },
    {
      icon: <Users size={32} />,
      title: "Certified Mechanics",
      desc: "Every technician is trained, verified, and background-checked. Real professionals who take pride in their work.",
    },
    {
      icon: <Wrench size={32} />,
      title: "Genuine Parts Only",
      desc: "We use OEM and genuine spare parts exclusively. Quality you can trust for every repair and replacement.",
    },
    {
      icon: <Camera size={32} />,
      title: "Full Transparency",
      desc: "Before/after photos, real-time updates via our app, and a digital job card for every service — complete visibility.",
    },
    {
      icon: <Shield size={32} />,
      title: "30-Day Warranty",
      desc: "Every service is backed by a 30-day warranty on parts and labour. Your satisfaction is guaranteed.",
    },
  ];

  const testimonials = [
    {
      text: "I recently had my Honda Activa serviced at GARIX and I couldn't be happier with the service I received. The mechanic was friendly and knowledgeable, taking the time to explain the necessary work and answer all my questions. Highly recommend Ride N Repair for all your two-wheeler needs.",
      author: "Saurabh Mehta",
      rating: 5,
    },
    {
      text: "GARIX did an excellent job fixing my Royal Enfield. The team was professional and efficient, ensuring every detail was taken care of. They kept me informed throughout the process and completed the service ahead of schedule. I'm very satisfied and will definitely return for future maintenance.",
      author: "Anita Patel",
      rating: 5,
    },
    {
      text: "Had my Suzuki Access 125 serviced at GARIX. The staff was courteous and the mechanic was very knowledgeable. They identified and fixed issues that I wasn't even aware of. The pricing was transparent and fair. Great experience overall!",
      author: "Rahul Gupta",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg" : "bg-white"}`}>
        <div className="w-full px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#e8b84b] rounded flex items-center justify-center">
                <Wrench size={22} className="text-black" />
              </div>
              <span className="text-2xl font-black text-[#151515] tracking-tight">GARIX</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {/* Home - goes back to homepage */}
            <Link
              to="/"
              className="text-[#151515] font-medium hover:text-[#e8b84b] transition-colors text-sm uppercase tracking-wide"
            >
              Home
            </Link>
            
            {/* Services - Anchor to Home */}
            <a
              href="/#services"
              className="text-[#151515] font-medium hover:text-[#e8b84b] transition-colors text-sm uppercase tracking-wide"
            >
              Services
            </a>
             {/* Services - Anchor to Home */}
            <a
              href="/booking"
              className="text-[#151515] font-medium hover:text-[#e8b84b] transition-colors text-sm uppercase tracking-wide"
            >
              Booking
            </a>

            {/* Blog - Anchor to Home */}
            <a
              href="/#blog"
              className="text-[#151515] font-medium hover:text-[#e8b84b] transition-colors text-sm uppercase tracking-wide"
            >
              Blog
            </a>

            {/* Contact - Anchor to Home */}
            <a
              href="/#contact"
              className="text-[#151515] font-medium hover:text-[#e8b84b] transition-colors text-sm uppercase tracking-wide"
            >
              Contact
            </a>
            <a
              href="/franchise"
              className="text-[#151515] font-medium hover:text-[#e8b84b] transition-colors text-sm uppercase tracking-wide"
            >
              Franchise
            </a>

            {/* Process - New Link Added */}
            <Link
              to="/process"
              className="text-[#151515] font-medium hover:text-[#e8b84b] transition-colors text-sm uppercase tracking-wide"
            >
              Process
            </Link>

            {/* About - current page, highlighted */}
            <span className="text-[#e8b84b] font-bold text-sm uppercase tracking-wide border-b-2 border-[#e8b84b] pb-0.5">
              About
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="/#contact"
              className="bg-[#e8b84b] text-black px-6 py-2.5 font-bold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-colors rounded"
            >
              Book Now
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden text-[#151515]" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-[#151515] font-medium hover:text-[#e8b84b]"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="/#services"
              className="text-[#151515] font-medium hover:text-[#e8b84b]"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="/#franchise"
              className="text-[#151515] font-medium hover:text-[#e8b84b]"
              onClick={() => setMenuOpen(false)}
            >
              Franchise
            </a>
            <a
              href="/#blog"
              className="text-[#151515] font-medium hover:text-[#e8b84b]"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </a>
            <a
              href="/#contact"
              className="text-[#151515] font-medium hover:text-[#e8b84b]"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
            <Link
              to="/process"
              className="text-[#151515] font-medium hover:text-[#e8b84b]"
              onClick={() => setMenuOpen(false)}
            >
              Process
            </Link>
            <span className="text-[#e8b84b] font-bold">About</span>
            <a
              href="/#contact"
              className="bg-[#e8b84b] text-black px-4 py-2 font-bold text-sm text-center rounded"
              onClick={() => setMenuOpen(false)}
            >
              Book Now
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">About </h1>
          <p className="text-xl text-gray-700 mb-8">Making Vehicle Service Hassle-Free</p>
          <p className="text-lg text-gray-600 mb-12">
            Doorstep bike and car repair across 32+ Indian cities — trusted by 2,00,000+ customers
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-black text-blue-600 mb-2">{stat.number}</div>
                <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a
              href="/#contact"
              className="bg-blue-600 text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-blue-700 transition rounded inline-flex items-center gap-2"
            >
              Book a Service <ChevronRight size={18} />
            </a>
            <a
              href="/#contact"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 font-bold uppercase tracking-wider hover:bg-blue-600 hover:text-white transition rounded inline-flex items-center gap-2"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Our Story</h2>
          <h3 className="text-2xl font-bold text-blue-600 mb-8">Why We Built GARIX</h3>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Getting a bike or car serviced in India has always been a frustrating experience — long wait times at garages, opaque pricing, questionable parts, and zero transparency into what's actually being done to your vehicle. We knew there had to be a better way.
            </p>
            <p>
              GARIX was built to solve this. We bring certified, background-verified mechanics directly to your doorstep — whether it's your home, office, or anywhere else. Every service comes with transparent pricing (shown upfront before you book), genuine parts, real-time tracking via our app, and a 30-day warranty.
            </p>
            <p>
              From a two-wheeler-focused startup, we've grown to serve both bikes and cars across 32+ cities in India, with over 2,00,000 happy customers and a 4.8-star rating. Our mission remains the same: make vehicle maintenance as simple, transparent, and trustworthy as it should be.
            </p>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">Our Journey</h2>
          <p className="text-xl text-gray-600 mb-16 text-center">From Startup to 2,00,000+ Customers</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {journey.map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm font-black text-blue-600 mb-2">MILESTONE {item.number}</div>
                    <h3 className="text-2xl font-black text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">Our Values</h2>
          <p className="text-xl text-gray-600 mb-16 text-center">What Makes Us Different</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 hover:shadow-lg transition-all">
                <div className="text-blue-600 mb-4">{value.icon}</div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-700">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">What Customers Say</h2>
          <p className="text-lg text-gray-600 mb-16 text-center">Real feedback from riders and drivers who booked doorstep repairs.</p>
          <div className="bg-white rounded-lg p-8 md:p-12 shadow-lg relative">
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-xl text-gray-700 mb-6 italic">
              "{testimonials[testimonialIndex].text}"
            </blockquote>
            <p className="font-bold text-gray-900">— {testimonials[testimonialIndex].author}</p>
            {/* Carousel Controls */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setTestimonialIndex(testimonialIndex === 0 ? testimonials.length - 1 : testimonialIndex - 1)}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`w-3 h-3 rounded-full transition ${i === testimonialIndex ? "bg-blue-600" : "bg-gray-300"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setTestimonialIndex(testimonialIndex === testimonials.length - 1 ? 0 : testimonialIndex + 1)}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">Ready to Experience Difference?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Doorstep service · Certified mechanics · Starting ₹450 · 30-day warranty
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#contact" className="bg-white text-blue-600 px-8 py-4 font-bold uppercase tracking-wider hover:bg-blue-50 transition rounded">
              Book Now
            </a>
            <a href="tel:+911203615050" className="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-white/10 transition rounded">
              Call +91 120 361 5050
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="font-black text-lg mb-4">Contact Us</h4>
              <div className="space-y-3 text-gray-400">
                <p className="flex items-center gap-2"><Phone size={16} /> +91 120 361 5050</p>
                <p className="flex items-center gap-2"><Mail size={16} /> info@ridenrepair.com</p>
              </div>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                <li><Link to="/process" className="hover:text-white transition">Process</Link></li>
                <li><a href="/#services" className="hover:text-white transition">Services</a></li>
                <li><a href="/#contact" className="hover:text-white transition">Contact</a></li>
                <li><a href="/#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="/#franchise" className="hover:text-white transition">Franchise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Cancellation Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 GARIX. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}