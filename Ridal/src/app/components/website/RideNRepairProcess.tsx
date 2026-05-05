import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, X, Phone, Mail, MapPin, Star, ShieldCheck, Wrench, 
  Clock, DollarSign, Users, Award, CheckCircle, ArrowRight, ChevronRight,
  Smartphone, Van, Eye, Zap
} from "lucide-react";

export const RideNRepairProcess = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 

  // Menu Order: Home, Services, Blog, Contact, Process, About
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" }, 
    { name: "Blog", href: "/#blog" },       // Link to Home page section
    { name: "Contact", href: "/#contact" },
    { name: "Booking", href: "/booking" },
    { name: "Franchise", href: "/franchise" },  
    { name: "Process", href: "/process", active: true }, 
    { name: "About", href: "/about" },
  ];

  const processSteps = [
    {
      num: "01",
      icon: <Smartphone size={32} color="#F59E0B" />,
      title: "Choose Vehicle & Service",
      desc: "Select your vehicle brand and model, then pick from a wide range of services — maintenance, repair, AC, battery, tyres, and more. See transparent pricing upfront."
    },
    {
      num: "02",
      icon: <Van size={32} color="#F59E0B" />,
      title: "Mechanic Arrives at Your Door",
      desc: "Our certified, uniformed mechanic arrives at your scheduled time — fully equipped with tools, parts, and diagnostic equipment. Home, office, or anywhere."
    },
    {
      num: "03",
      icon: <Wrench size={32} color="#F59E0B" />,
      title: "Service & Real-Time Updates",
      desc: "Track progress in real-time via our app. Get before/after photos, transparent updates on every repair, and approval before any additional work."
    },
    {
      num: "04",
      icon: <CheckCircle size={32} color="#F59E0B" />,
      title: "Quality Check & Warranty",
      desc: "After a thorough quality check, you receive a digital job card and invoice. Every service is backed by a 30-day warranty on parts and labour."
    }
  ];

  const benefits = [
    { icon: <Clock size={24} />, title: "Save Time", desc: "No waiting at garages. Service happens while you work, relax, or go about your day." },
    { icon: <Eye size={24} />, title: "Full Transparency", desc: "See your vehicle being serviced. Get photo updates. Know exactly what's being done and why." },
    { icon: <DollarSign size={24} />, title: "Fair Pricing", desc: "Prices shown upfront before booking. No hidden charges. Pay only for what you approve." },
    { icon: <Users size={24} />, title: "Expert Mechanics", desc: "Trained, background-verified professionals who handle your vehicle with care and precision." },
    { icon: <ShieldCheck size={24} />, title: "Genuine Parts", desc: "OEM parts only. No compromises on quality for any repair or replacement." },
    { icon: <Award size={24} />, title: "30-Day Warranty", desc: "Complete peace of mind. If any issue related to our service arises within 30 days, we fix it free." }
  ];

  const brands = ["Hero", "Honda", "Bajaj", "Royal Enfield", "Maruti Suzuki", "Hyundai", "Tata"];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F9FAFB", color: "#1F2937" }}>
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200" style={{ padding: "0 5%", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "24px", fontWeight: 800, color: "#1F2937" }}>
          <div style={{ background: "#F59E0B", padding: "6px", borderRadius: "6px" }}><Wrench color="#fff" size={20} /></div>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Ride N Repair</Link>
        </div>

        {/* Desktop Nav - Fixed visibility with standard Tailwind classes */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            // Check if it's an internal anchor link (starts with /#) or a route
            link.href.startsWith("/#") ? (
              <a 
                key={link.name} 
                href={link.href} 
                style={{ 
                  fontSize: "14px", 
                  fontWeight: 500, 
                  color: link.active ? "#F59E0B" : "#4B5563", 
                  textDecoration: "none" 
                }}
                className="hover:text-amber-500 transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name} 
                to={link.href} 
                style={{ 
                  fontSize: "14px", 
                  fontWeight: 500, 
                  color: link.active ? "#F59E0B" : "#4B5563", 
                  textDecoration: "none" 
                }}
                className="hover:text-amber-500 transition-colors"
              >
                {link.name}
              </Link>
            )
          ))}
        </div>

        
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 fixed w-full top-[70px] left-0 z-40" style={{ padding: "20px 5%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {navLinks.map((link) => (
               // Check if it's an internal anchor link or a route
               link.href.startsWith("/#") ? (
                <a 
                  key={link.name}
                  href={link.href} 
                  style={{ textDecoration: "none", color: link.active ? "#F59E0B" : "#333", fontWeight: 500 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href} 
                  style={{ textDecoration: "none", color: link.active ? "#F59E0B" : "#333", fontWeight: 500 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <header style={{ background: "#fff", padding: "60px 5%", textAlign: "center", borderBottom: "1px solid #eee" }}>
        
        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: "#111827", marginBottom: "16px", letterSpacing: "-1px" }}>
          How Ride N Repair Works
        </h1>
        <p style={{ fontSize: "18px", color: "#4B5563", maxWidth: "600px", margin: "0 auto 40px" }}>
          Doorstep Service in 4 Simple Steps. From booking to warranty — here's how Ride N Repair makes vehicle service effortless.
        </p>

        {/* Stats Bar */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginBottom: "40px" }}>
          {[
            { icon: <Zap size={18} />, label: "60 sec", sub: "To Book" },
            { icon: <Clock size={18} />, label: "15 Min", sub: "Arrival Time" },
            { icon: <Star size={18} fill="#FBBF24" stroke="#FBBF24" />, label: "4.8★", sub: "Rating" },
            { icon: <ShieldCheck size={18} />, label: "30 Days", sub: "Warranty" }
          ].map((stat, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#F3F4F6", padding: "8px 16px", borderRadius: "20px" }}>
              <span style={{ color: "#F59E0B" }}>{stat.icon}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: "14px" }}>{stat.label}</div>
                <div style={{ fontSize: "11px", color: "#6B7280", textTransform: "uppercase" }}>{stat.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <button style={{ background: "#F59E0B", color: "#fff", fontSize: "16px", fontWeight: 700, padding: "14px 32px", borderRadius: "8px", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "10px", boxShadow: "0 4px 14px rgba(245, 158, 11, 0.4)" }}>
          Book Now — Starting ₹450 <ArrowRight size={18} />
        </button>
      </header>

      {/* --- PROCESS STEPS --- */}
      <section style={{ padding: "80px 5%", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "40px", textAlign: "center" }}>The Process</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
          {processSteps.map((step) => (
            <div key={step.num} style={{ background: "#fff", padding: "30px", borderRadius: "12px", border: "1px solid #E5E7EB", boxShadow: "0 2px 4px rgba(0,0,0,0.02)", position: "relative" }}>
              <div style={{ position: "absolute", top: "-15px", left: "30px", background: "#1F2937", color: "#fff", width: "35px", height: "35px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px" }}>
                {step.num}
              </div>
              <div style={{ marginTop: "10px", marginBottom: "20px", padding: "10px", background: "#FFFBEB", width: "fit-content", borderRadius: "50%" }}>
                {step.icon}
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "10px" }}>{step.title}</h3>
              <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- WHY DOORSTEP --- */}
      <section style={{ background: "#fff", padding: "80px 5%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "10px" }}>Why Doorstep Service Beats Garage</h2>
            <p style={{ color: "#6B7280" }}>Experience the future of vehicle maintenance.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {benefits.map((benefit, i) => (
              <div key={i} style={{ display: "flex", gap: "15px", padding: "20px", borderRadius: "10px", transition: "0.3s" }} 
                   onMouseEnter={(e) => e.currentTarget.style.background = "#F9FAFB"}
                   onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ background: "#FFFBEB", padding: "12px", borderRadius: "8px", color: "#F59E0B", flexShrink: 0 }}>
                  {benefit.icon}
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: "18px", marginBottom: "6px" }}>{benefit.title}</h4>
                  <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.5 }}>{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REFERRAL BONUS --- */}
      <section style={{ background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", padding: "60px 5%", color: "#fff", textAlign: "center" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "10px" }}>Refer Friends & Earn ₹500</h2>
        <p style={{ fontSize: "18px", opacity: 0.9, marginBottom: "30px", maxWidth: "600px", margin: "0 auto 30px" }}>
          Love the service? Share Ride N Repair with friends and family. They get ₹500 off their first service, and you earn ₹500 once they complete it. Everyone wins.
        </p>
        <button style={{ background: "#fff", color: "#D97706", padding: "14px 30px", borderRadius: "8px", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "16px" }}>
          Refer Now
        </button>
      </section>

      {/* --- READY TO TRY --- */}
      <section style={{ padding: "80px 5%", textAlign: "center", background: "#111827", color: "#fff" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "16px" }}>Ready to Try It?</h2>
        <p style={{ fontSize: "18px", color: "#9CA3AF", marginBottom: "30px" }}>
          Book Your First Service Now.<br />
          <span style={{ fontSize: "14px", opacity: 0.7 }}>Doorstep service · Certified mechanics · Starting ₹450 · 30-day warranty</span>
        </p>
        
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginBottom: "40px" }}>
          <button style={{ background: "#F59E0B", color: "#fff", padding: "14px 32px", borderRadius: "8px", fontWeight: 700, border: "none", cursor: "pointer" }}>
            Book Now
          </button>
          <button style={{ background: "transparent", border: "1px solid #374151", color: "#fff", padding: "14px 32px", borderRadius: "8px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
            <Phone size={18} /> Call +91 120 361 5050
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
           {/* Cities mock chips */}
           {["Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai"].map(city => (
             <span key={city} style={{ background: "#1F2937", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", color: "#9CA3AF" }}>{city}</span>
           ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer style={{ background: "#1F2937", color: "#D1D5DB", padding: "60px 5% 20px", borderTop: "1px solid #374151" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "60px" }}>
          
          {/* Brand Column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "20px" }}>
              <div style={{ background: "#F59E0B", padding: "4px", borderRadius: "4px" }}><Wrench color="#fff" size={16} /></div>
              Ride N Repair
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
              Looking for specialized two-wheeler or four-wheeler repair? Ride N Repair offers doorstep car and bike service with expert mechanics.
            </p>
            <div style={{ display: "flex", gap: "15px" }}>
              <button style={{ background: "#374151", border: "none", padding: "8px 12px", borderRadius: "4px", color: "#fff", fontSize: "12px", cursor: "pointer" }}>Google Play</button>
              <button style={{ background: "#374151", border: "none", padding: "8px 12px", borderRadius: "4px", color: "#fff", fontSize: "12px", cursor: "pointer" }}>App Store</button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: "20px" }}>Our Solutions</h4>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: 2, fontSize: "14px" }}>
              <li><Link to="/about" style={{ color: "inherit", textDecoration: "none" }}>About Us</Link></li>
              <li><Link to="/process" style={{ color: "inherit", textDecoration: "none" }}>Process</Link></li>
              <li><a href="/#services" style={{ color: "inherit", textDecoration: "none" }}>Services</a></li>
              <li><a href="/#contact" style={{ color: "inherit", textDecoration: "none" }}>Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: "20px" }}>Contact</h4>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: 2, fontSize: "14px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><Phone size={16} /> +91 120 361 5050</li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><Mail size={16} /> info@ridenrepair.com</li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><MapPin size={16} /> Noida, India</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: "20px" }}>Legal</h4>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: 2, fontSize: "14px" }}>
              <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms & Conditions</a></li>
              <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</a></li>
              <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Cancellation Policy</a></li>
              <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", borderTop: "1px solid #374151", paddingTop: "20px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "20px", fontSize: "13px" }}>
          <div>© 2024 Ride N Repair. All rights reserved.</div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ color: "#6B7280", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Popular Brands:</span>
            {brands.map(brand => (
              <span key={brand} style={{ color: "#D1D5DB", cursor: "pointer" }}>{brand}</span>
            ))}
            <span style={{ color: "#F59E0B", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
              All Brands <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};