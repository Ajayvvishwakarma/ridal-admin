import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronRight,
  Wrench,
  Zap,
  Settings,
  Droplets,
  Battery,
  Circle,
  Star,
  CheckCircle,
  ArrowRight,
  Share2,
  Send,
  Shield,
  ThumbsUp,
  Users,
  Award,
  Calendar,
} from "lucide-react";

const HERO_BG = "https://images.unsplash.com/photo-1727413433599-496949ef8196?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZXBhaXIlMjBnYXJhZ2UlMjBtZWNoYW5pYyUyMHdvcmtzaG9wfGVufDF8fHx8MTc3Nzk1NTQxNHww&ixlib=rb-4.1.0&q=80&w=1080";
const SERVICE_IMG1 = "https://images.unsplash.com/photo-1771340742493-52fbd5476ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBvaWwlMjBjaGFuZ2UlMjBzZXJ2aWNlfGVufDF8fHx8MTc3Nzk1NTM2OXww&ixlib=rb-4.1.0&q=80&w=1080";
const SERVICE_IMG2 = "https://images.unsplash.com/photo-1770656505813-966b8ef8d363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwc2VydmljZSUyMGNlbnRlciUyMGludGVyaW9yfGVufDF8fHx8MTc3Nzk1NTQxNXww&ixlib=rb-4.1.0&q=80&w=1080";
const SERVICE_IMG3 = "https://images.unsplash.com/photo-1620707044570-c0dc1576bedd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pYyUyMHdvcmtpbmclMjBvbiUyMGNhciUyMHdoZWVsJTIwYWxpZ25tZW50fGVufDF8fHx8MTc3Nzk1NTQxN3ww&ixlib=rb-4.1.0&q=80&w=1080";
const SERVICE_IMG4 = "https://images.unsplash.com/photo-1705720717198-9b18c35500bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBiYXR0ZXJ5JTIwcmVwbGFjZW1lbnQlMjBzZXJ2aWNlfGVufDF8fHx8MTc3Nzk1NTQxN3ww&ixlib=rb-4.1.0&q=80&w=1080";

const services = [
  { icon: <Wrench size={40} />, title: "Car Repair", desc: "Complete car repair solutions with expert mechanics", img: HERO_BG },
  { icon: <Zap size={40} />, title: "Exhaust Systems", desc: "Professional exhaust repair and replacement", img: SERVICE_IMG1 },
  { icon: <Settings size={40} />, title: "Suspension", desc: "Full suspension inspection and repair services", img: SERVICE_IMG2 },
  { icon: <Droplets size={40} />, title: "Oil Change", desc: "Quick and efficient oil change services", img: SERVICE_IMG3 },
  { icon: <Battery size={40} />, title: "Batteries", desc: "Battery testing, charging and replacement", img: SERVICE_IMG4 },
  { icon: <Circle size={40} />, title: "Wheel Alignment", desc: "Precision wheel alignment for smooth driving", img: SERVICE_IMG2 },
];

const repairServices = [
  { icon: <Wrench size={36} />, title: "Engine Diagnostics", desc: "Advanced computer diagnostics to identify engine issues quickly and accurately." },
  { icon: <Settings size={36} />, title: "Brake Service", desc: "Complete brake inspection, repair, and replacement for your safety." },
  { icon: <Droplets size={36} />, title: "Oil & Fluids", desc: "Regular oil changes and fluid top-ups to keep your engine running smooth." },
  { icon: <Zap size={36} />, title: "Electrical Repairs", desc: "Expert electrical system repairs including wiring, alternators, and starters." },
  { icon: <Circle size={36} />, title: "Tire Services", desc: "Tire rotation, balancing, and replacement with top brand tires." },
  { icon: <Battery size={36} />, title: "AC & Heating", desc: "Full HVAC system diagnostics, repair, and recharge services." },
];

const whyChoose = [
  { icon: <Shield size={36} />, title: "Quality Guaranteed", desc: "All repairs come with our quality guarantee for your peace of mind." },
  { icon: <ThumbsUp size={36} />, title: "Expert Mechanics", desc: "Our certified mechanics have 10+ years of experience in the industry." },
  { icon: <Clock size={36} />, title: "Fast Turnaround", desc: "Most repairs completed same day so you're back on the road quickly." },
  { icon: <Award size={36} />, title: "Certified Shop", desc: "We are a fully certified and licensed automotive repair facility." },
  { icon: <Users size={36} />, title: "Friendly Staff", desc: "Our team is dedicated to providing exceptional customer service." },
  { icon: <CheckCircle size={36} />, title: "Transparent Pricing", desc: "No hidden fees. We provide detailed estimates before any work begins." },
];

const blogs = [
  { img: SERVICE_IMG1, date: "May 5, 2026", title: "10 Signs Your Car Needs an Oil Change Right Now", author: "John Smith" },
  { img: SERVICE_IMG3, date: "Apr 20, 2026", title: "How to Tell When Your Brakes Need Replacing", author: "Mike Johnson" },
  { img: SERVICE_IMG4, date: "Apr 10, 2026", title: "Battery Care Tips to Extend Your Car Battery Life", author: "Sarah Lee" },
];

// Anchor nav items (hash links)
const anchorNavItems = ["Home", "Services", "Blog", "Contact"];

export function GarixWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Bar */}
      <div className="bg-[#1a1a1a] text-white py-2 px-4 text-sm hidden md:block">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-2"><Phone size={14} className="text-[#e8b84b]" /> +1 (800) 123-4567</span>
            <span className="flex items-center gap-2"><Mail size={14} className="text-[#e8b84b]" /> info@garix.com</span>
            <span className="flex items-center gap-2"><MapPin size={14} className="text-[#e8b84b]" /> 123 Auto Street, New York</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-2"><Clock size={14} className="text-[#e8b84b]" /> Mon - Sat: 8:00 AM - 7:00 PM</span>
            <Link to="/admin/login" className="bg-[#e8b84b] text-black px-3 py-1 rounded text-xs font-semibold hover:bg-yellow-400 transition">
              Admin Panel
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white"}`}>
        <div className="w-full px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#e8b84b] rounded flex items-center justify-center">
              <Wrench size={22} className="text-black" />
            </div>
            <span className="text-2xl font-black text-[#151515] tracking-tight">GARIX</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {anchorNavItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[#151515] font-medium hover:text-[#e8b84b] transition-colors text-sm uppercase tracking-wide"
              >
                {item}
              </a>
            ))}
            {/* About - React Router Link */}
            <Link
              to="/about"
              className="text-[#151515] font-medium hover:text-[#e8b84b] transition-colors text-sm uppercase tracking-wide"
            >
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#contact" className="bg-[#e8b84b] text-black px-6 py-2.5 font-bold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-colors rounded">
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
            {anchorNavItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[#151515] font-medium hover:text-[#e8b84b]"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            {/* About - React Router Link in mobile */}
            <Link
              to="/about"
              className="text-[#151515] font-medium hover:text-[#e8b84b]"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/admin/login"
              className="bg-[#e8b84b] text-black px-4 py-2 font-bold text-sm text-center rounded"
              onClick={() => setMenuOpen(false)}
            >
              Admin Panel
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={HERO_BG} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-center px-4">
          <div className="inline-block bg-[#e8b84b] text-black px-4 py-1.5 text-sm font-bold uppercase tracking-widest mb-4 rounded">
            Professional Car Services
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Expert Auto <span className="text-[#e8b84b]">Repair</span> Services
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-8">
            We provide top-quality car repair and maintenance services. Your safety and satisfaction is our priority.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#services" className="bg-[#e8b84b] text-black px-8 py-4 font-black text-sm uppercase tracking-wider hover:bg-yellow-400 transition-colors rounded inline-flex items-center gap-2">
              Our Services <ChevronRight size={18} />
            </a>
            <a href="#contact" className="border-2 border-white text-white px-8 py-4 font-black text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors rounded inline-flex items-center gap-2">
              Book Appointment <Calendar size={18} />
            </a>
          </div>
        </div>
        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#e8b84b] py-4">
          <div className="w-full px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[["5000+", "Cars Repaired"], ["150+", "Expert Staff"], ["20+", "Years Experience"], ["98%", "Happy Customers"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-black text-black">{num}</div>
                <div className="text-black/70 text-xs font-semibold uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="w-full px-4">
          <div className="text-center mb-12">
            <div className="inline-block text-[#e8b84b] font-bold uppercase tracking-widest text-sm mb-3">What We Do</div>
            <h2 className="text-4xl font-black text-[#151515] mb-4">Our Car Services</h2>
            <p className="text-gray-500">We offer a wide range of automotive services to keep your vehicle running perfectly.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />
                  <div className="absolute bottom-4 left-4 text-white">{s.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black text-[#151515] mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{s.desc}</p>
                  <a href="#contact" className="flex items-center gap-2 text-[#e8b84b] font-bold text-sm hover:gap-3 transition-all">
                    Learn More <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awesome Repair Services - Dark Section */}
      <section className="py-20 bg-[#151515]">
        <div className="w-full px-4">
          <div className="text-center mb-12">
            <div className="inline-block text-[#e8b84b] font-bold uppercase tracking-widest text-sm mb-3">Our Expertise</div>
            <h2 className="text-4xl font-black text-white mb-4">Our Awesome And Super Repair Services</h2>
            <p className="text-gray-400">From diagnostics to full repairs, our skilled team handles every aspect of your vehicle maintenance.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repairServices.map((s, i) => (
              <div key={i} className="group bg-[#1e1e1e] p-8 rounded-lg border border-white/5 hover:border-[#e8b84b]/40 hover:bg-[#222] transition-all duration-300">
                <div className="w-16 h-16 bg-[#e8b84b]/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-[#e8b84b] transition-colors">
                  <div className="text-[#e8b84b] group-hover:text-black transition-colors">{s.icon}</div>
                </div>
                <h3 className="text-lg font-black text-white mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                <a href="#contact" className="flex items-center gap-2 text-[#e8b84b] font-bold text-sm hover:gap-3 transition-all">
                  Read More <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="w-full px-4">
          <div className="text-center mb-12">
            <div className="inline-block text-[#e8b84b] font-bold uppercase tracking-widest text-sm mb-3">Our Benefits</div>
            <h2 className="text-4xl font-black text-[#151515] mb-4">Why Choose Our Services?</h2>
            <p className="text-gray-500">We go above and beyond to ensure every customer leaves satisfied with our work.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <div key={i} className="flex gap-5 p-6 rounded-lg hover:bg-gray-50 transition group border border-gray-100">
                <div className="w-14 h-14 bg-[#e8b84b]/10 rounded-lg flex-shrink-0 flex items-center justify-center group-hover:bg-[#e8b84b] transition-colors">
                  <div className="text-[#e8b84b] group-hover:text-black transition-colors">{item.icon}</div>
                </div>
                <div>
                  <h3 className="text-base font-black text-[#151515] mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#e8b84b] py-16">
        <div className="w-full px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-black mb-2">Ready to Book Your Service?</h2>
            <p className="text-black/70">Schedule your appointment today and get back on the road!</p>
          </div>
          <a href="#contact" className="bg-black text-white px-8 py-4 font-black text-sm uppercase tracking-wider hover:bg-[#151515] transition rounded flex-shrink-0">
            Book Appointment Now
          </a>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gray-50">
        <div className="w-full px-4">
          <div className="text-center mb-12">
            <div className="inline-block text-[#e8b84b] font-bold uppercase tracking-widest text-sm mb-3">Latest News</div>
            <h2 className="text-4xl font-black text-[#151515] mb-4">Latest From Our Blog</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((b, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition group">
                <div className="relative h-52 overflow-hidden">
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span className="bg-[#e8b84b]/10 text-[#e8b84b] px-2 py-1 rounded font-semibold">{b.date}</span>
                    <span>By {b.author}</span>
                  </div>
                  <h3 className="font-black text-[#151515] mb-3 text-base leading-snug">{b.title}</h3>
                  <a href="#blog" className="flex items-center gap-2 text-[#e8b84b] font-bold text-sm hover:gap-3 transition-all">
                    Read More <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[#151515]">
        <div className="w-full px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-3">Subscribe To Our Newsletter</h2>
          <p className="text-gray-400 mb-8">Get the latest car care tips and exclusive deals delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="Enter your email address..." className="flex-1 bg-white/10 border border-white/10 text-white placeholder-gray-500 px-5 py-3.5 rounded outline-none focus:border-[#e8b84b] transition" />
            <button className="bg-[#e8b84b] text-black px-6 py-3.5 font-black uppercase tracking-wider hover:bg-yellow-400 transition rounded flex items-center gap-2 justify-center">
              Subscribe <Send size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white">
        <div className="w-full px-4">
          <div className="text-center mb-12">
            <div className="inline-block text-[#e8b84b] font-bold uppercase tracking-widest text-sm mb-3">Get In Touch</div>
            <h2 className="text-4xl font-black text-[#151515] mb-4">Book An Appointment</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6 mb-8">
                {[
                  { icon: <Phone size={22} />, label: "Phone", value: "+1 (800) 123-4567" },
                  { icon: <Mail size={22} />, label: "Email", value: "info@garix.com" },
                  { icon: <MapPin size={22} />, label: "Address", value: "123 Auto Street, New York, NY 10001" },
                  { icon: <Clock size={22} />, label: "Hours", value: "Mon–Sat: 8:00 AM – 7:00 PM" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#e8b84b]/10 rounded-lg flex items-center justify-center flex-shrink-0 text-[#e8b84b]">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-black text-[#151515] text-sm">{item.label}</div>
                      <div className="text-gray-500 text-sm">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="bg-white border border-gray-200 px-4 py-3 rounded text-sm outline-none focus:border-[#e8b84b] transition" />
                  <input type="text" placeholder="Last Name" className="bg-white border border-gray-200 px-4 py-3 rounded text-sm outline-none focus:border-[#e8b84b] transition" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full bg-white border border-gray-200 px-4 py-3 rounded text-sm outline-none focus:border-[#e8b84b] transition" />
                <input type="tel" placeholder="Phone Number" className="w-full bg-white border border-gray-200 px-4 py-3 rounded text-sm outline-none focus:border-[#e8b84b] transition" />
                <select className="w-full bg-white border border-gray-200 px-4 py-3 rounded text-sm outline-none focus:border-[#e8b84b] transition text-gray-500">
                  <option value="">Select Service</option>
                  {services.map((s, i) => <option key={i}>{s.title}</option>)}
                </select>
                <textarea rows={4} placeholder="Additional Notes..." className="w-full bg-white border border-gray-200 px-4 py-3 rounded text-sm outline-none focus:border-[#e8b84b] transition resize-none" />
                <button className="w-full bg-[#e8b84b] text-black py-4 font-black uppercase tracking-wider hover:bg-yellow-400 transition rounded">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] text-white pt-16 pb-8">
        <div className="w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-[#e8b84b] rounded flex items-center justify-center">
                  <Wrench size={18} className="text-black" />
                </div>
                <span className="text-xl font-black">GARIX</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">Your trusted automotive service partner. Quality repairs, honest pricing, and exceptional service.</p>
              <div className="flex gap-3">
                {[<Share2 size={16} />, <Share2 size={16} />, <Share2 size={16} />, <Share2 size={16} />].map((icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 bg-white/5 rounded flex items-center justify-center hover:bg-[#e8b84b] hover:text-black text-gray-400 transition">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-white mb-4 uppercase tracking-wide text-sm">Services</h4>
              <ul className="space-y-2">
                {services.map((s, i) => (
                  <li key={i}><a href="#services" className="text-gray-400 text-sm hover:text-[#e8b84b] transition flex items-center gap-2"><ChevronRight size={14} />{s.title}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white mb-4 uppercase tracking-wide text-sm">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 text-sm hover:text-[#e8b84b] transition flex items-center gap-2"><ChevronRight size={14} />Home</a></li>
                <li>
                  <Link to="/about" className="text-gray-400 text-sm hover:text-[#e8b84b] transition flex items-center gap-2">
                    <ChevronRight size={14} />About Us
                  </Link>
                </li>
                <li><a href="#services" className="text-gray-400 text-sm hover:text-[#e8b84b] transition flex items-center gap-2"><ChevronRight size={14} />Services</a></li>
                <li><a href="#blog" className="text-gray-400 text-sm hover:text-[#e8b84b] transition flex items-center gap-2"><ChevronRight size={14} />Blog</a></li>
                <li><a href="#contact" className="text-gray-400 text-sm hover:text-[#e8b84b] transition flex items-center gap-2"><ChevronRight size={14} />Contact</a></li>
                <li><a href="#" className="text-gray-400 text-sm hover:text-[#e8b84b] transition flex items-center gap-2"><ChevronRight size={14} />Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white mb-4 uppercase tracking-wide text-sm">Contact Info</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-400 text-sm"><MapPin size={16} className="text-[#e8b84b] flex-shrink-0 mt-0.5" />123 Auto Street, New York, NY 10001</li>
                <li className="flex items-center gap-3 text-gray-400 text-sm"><Phone size={16} className="text-[#e8b84b]" />+1 (800) 123-4567</li>
                <li className="flex items-center gap-3 text-gray-400 text-sm"><Mail size={16} className="text-[#e8b84b]" />info@garix.com</li>
                <li className="flex items-center gap-3 text-gray-400 text-sm"><Clock size={16} className="text-[#e8b84b]" />Mon–Sat: 8:00 AM – 7:00 PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-sm">© 2026 Garix Auto Services. All Rights Reserved.</p>
            <div className="flex gap-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
                <a key={i} href="#" className="text-gray-500 text-sm hover:text-[#e8b84b] transition">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Stars ratings */}
      <div className="fixed bottom-6 right-6 z-50 bg-white shadow-2xl rounded-xl p-4 flex items-center gap-3 border border-gray-100">
        <div className="flex text-[#e8b84b]">
          {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
        </div>
        <div>
          <div className="text-xs font-black text-[#151515]">4.9/5 Rating</div>
          <div className="text-xs text-gray-400">2000+ Reviews</div>
        </div>
      </div>
    </div>
  );
}