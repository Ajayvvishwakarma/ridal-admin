import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, X, Phone, Mail, MapPin, Wrench, 
  Award, Zap, Home, ChevronRight, ChevronDown, CheckCircle, Users, Clock, ShieldCheck
} from "lucide-react";

export const RideNRepairFranchise = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Navigation Links as requested
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Our Process", href: "/process" },
    { name: "Booking", href: "/booking" },
    { name: "Blogs", href: "/#blog" },
    { name: "About Us", href: "/about" },
    { name: "Franchise", href: "/franchise" },
    { name: "FAQ", href: "/#contact" }, // Assuming FAQ points to contact or a section
    { name: "Contact", href: "/#contact" },
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Application Submitted! We will contact you soon.");
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F9FAFB", color: "#1F2937" }}>
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200" style={{ padding: "0 5%", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "24px", fontWeight: 800, color: "#1F2937" }}>
          <div style={{ background: "#F59E0B", padding: "6px", borderRadius: "6px" }}><Wrench color="#fff" size={20} /></div>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Ride N Repair</Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            // Check if anchor or route
            link.href.startsWith("/#") ? (
              <a 
                key={link.name}
                href={link.href} 
                style={{ fontSize: "14px", fontWeight: 500, color: link.active ? "#F59E0B" : "#4B5563", textDecoration: "none" }}
                className="hover:text-amber-500 transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                style={{ fontSize: "14px", fontWeight: 500, color: link.active ? "#F59E0B" : "#4B5563", textDecoration: "none" }}
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
               <Link
                  key={link.name}
                  to={link.href}
                  style={{ textDecoration: "none", color: link.active ? "#F59E0B" : "#333", fontWeight: 500 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
            ))}
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <header style={{ background: "#fff", padding: "80px 5%", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#FFFBEB", color: "#B45309", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, marginBottom: "20px", textTransform: "uppercase" }}>
          Franchise Opportunity
        </div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: "#111827", marginBottom: "20px", lineHeight: 1.2 }}>
          Build a Luxury Vehicle Repair Brand in Your City
        </h1>
        <p style={{ fontSize: "18px", color: "#4B5563", maxWidth: "700px", margin: "0 auto 40px", lineHeight: 1.6 }}>
          Ride N Repair is building the future of doorstep car & bike care. If you want to own a premium brand that becomes a legacy — this is your moment.
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/#contact" className="bg-[#F59E0B] text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-600 transition">
            Apply Now
          </Link>
          <a href="#faqs" className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition">
            Learn More
          </a>
        </div>
      </header>

      {/* --- PREMIUM FEATURES --- */}
      <section style={{ padding: "80px 5%", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ textAlign: "center", color: "#6B7280", marginBottom: "40px" }}>
            This is a modern vehicle repair franchise built for India — ideal if you’re exploring a two wheeler franchise, bike service franchise, or car service franchise with a luxury customer experience.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
            {[
              { icon: <Award size={36} color="#F59E0B" />, title: "Premium Brand & Experience", desc: "A premium story deserves premium execution — Ride N Repair’s doorstep bike & car service franchise." },
              { icon: <Zap size={36} color="#F59E0B" />, title: "Tech-Driven Operations", desc: "App-led workflows, real-time updates, and performance visibility for every service." },
              { icon: <Home size={36} color="#F59E0B" />, title: "Doorstep Convenience", desc: "Bringing the garage to the customer's doorstep, offering unmatched ease and service quality." }
            ].map((feature, i) => (
              <div key={i} style={{ padding: "30px", borderRadius: "12px", border: "1px solid #F3F4F6", transition: "0.3s" }}
                   onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)"}
                   onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ marginBottom: "20px" }}>{feature.icon}</div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "10px" }}>{feature.title}</h3>
                <p style={{ color: "#6B7280", lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY NOW --- */}
      <section style={{ padding: "80px 5%", background: "#F9FAFB" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "50px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "10px" }}>Why Ride N Repair?</h2>
            <p style={{ fontSize: "18px", color: "#6B7280", lineHeight: 1.6 }}>
              We’re building a luxury-grade standard for vehicle care: fast, transparent, and engineered for trust — designed to scale as a vehicle service franchise across cities.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
            {[
              { icon: <ShieldCheck size={24} />, title: "Brand that feels premium", desc: "Design-led experience, strong identity, and a trust-first customer journey." },
              { icon: <Users size={24} />, title: "Unit economics + operations", desc: "Repeat customers, predictable service demand, and scalable local execution." },
              { icon: <Clock size={24} />, title: "Training + playbooks", desc: "Hiring, onboarding, quality checks, and SOPs — built for consistent outcomes." },
              { icon: <Zap size={24} />, title: "Technology backbone", desc: "App-led workflows, real-time updates, lead systems, and performance visibility." }
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                <div style={{ background: "#FFFBEB", padding: "10px", borderRadius: "8px", color: "#F59E0B", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: "18px", marginBottom: "6px" }}>{item.title}</h4>
                  <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faqs" style={{ padding: "80px 5%", background: "#fff" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "40px", textAlign: "center" }}>Franchise FAQs</h2>
          <p style={{ textAlign: "center", color: "#6B7280", marginBottom: "40px" }}>
            Vehicle Franchise Questions, Answered. If you’re searching for best repair franchise or vehicle franchise opportunity, here are most common questions we get.
          </p>

          {[
            { q: "What services does this franchise cover?", a: "Doorstep bike service & repair, car servicing, inspections, common maintenance, and support workflows — structured for quality and repeat demand." },
            { q: "Who is this franchise best for?", a: "Operators and entrepreneurs who want a premium brand, strong SOPs, and a tech-led model — not a typical garage experience." },
            { q: "How do leads and bookings work?", a: "Customers discover Ride N Repair online and via local demand. The operation runs on structured workflows and a trust-first customer journey." },
            { q: "How do I apply for franchise?", a: "Submit the form on this page with your city, investment range, and timeline. Our team reviews your details and shares the next steps." }
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid #E5E7EB" }}>
              <button 
                onClick={() => toggleFaq(i)}
                style={{ width: "100%", padding: "20px 0", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
              >
                <span style={{ fontSize: "18px", fontWeight: 600, textAlign: "left" }}>{faq.q}</span>
                <ChevronDown 
                  size={20} 
                  color="#4B5563" 
                  style={{ transform: activeFaq === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} 
                />
              </button>
              {activeFaq === i && (
                <div style={{ paddingBottom: "20px", color: "#6B7280", lineHeight: 1.6, animation: "fadeIn 0.3s ease" }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- APPLICATION FORM --- */}
      <section style={{ padding: "80px 5%", background: "#F9FAFB" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ background: "#fff", padding: "40px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "10px", textAlign: "center" }}>Apply For Franchise</h2>
            <p style={{ textAlign: "center", color: "#6B7280", marginBottom: "30px" }}>Own a brand your city will remember.</p>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px", display: "block" }}>Name</label>
                  <input type="text" placeholder="Your Name" required style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px", display: "block" }}>Email</label>
                  <input type="email" placeholder="email@example.com" required style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", outline: "none" }} />
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px", display: "block" }}>Phone Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" required style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px", display: "block" }}>City</label>
                  <input type="text" placeholder="Your City" required style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", outline: "none" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                <div>
                  <label style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px", display: "block" }}>State</label>
                  <input type="text" placeholder="State" required style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", outline: "none" }} />
                </div>
                
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px", display: "block" }}>Select Investment</label>
                <select style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", background: "#fff", outline: "none" }}>
                  <option value="">Select Investment Range</option>
                  <option value="10-15">₹10L - ₹15L</option>
                  <option value="15-20">₹15L - ₹20L</option>
                  <option value="20+">₹20L+</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px", display: "block" }}>When are you planning to start?</label>
                <select style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", background: "#fff", outline: "none" }}>
                  <option value="">Select Timeline</option>
                  <option value="immediate">Immediately</option>
                  <option value="3months">Within 3 Months</option>
                  <option value="6months">Within 6 Months</option>
                </select>
              </div>

              <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "10px" }}>
                By sharing your details, you agree to our <a href="#" style={{ color: "#F59E0B" }}>Privacy Policy</a>
              </div>

              <button type="submit" style={{ background: "#F59E0B", color: "#fff", padding: "15px", borderRadius: "8px", fontWeight: 700, fontSize: "16px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                Submit Application <ChevronRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- LEGACY / CTA --- */}
      <section style={{ background: "#111827", color: "#fff", padding: "80px 5%", textAlign: "center" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "16px" }}>Own a brand your city will remember.</h2>
        <p style={{ fontSize: "18px", color: "#9CA3AF", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }}>
          Premium experience. Trusted technicians. Tech-led operations. A franchise designed to scale.
        </p>
        <button style={{ background: "#F59E0B", color: "#fff", padding: "15px 40px", borderRadius: "8px", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "16px" }}>
          Join the Network
        </button>
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
              <li><Link to="/franchise" style={{ color: "inherit", textDecoration: "none" }}>Franchise</Link></li>
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
             <span style={{ color: "#F59E0B", cursor: "pointer" }}>Follow Us</span>
             <span style={{ color: "#6B7280", cursor: "pointer" }}>Show Map</span>
             <span style={{ color: "#F59E0B", cursor: "pointer" }}>Book with WhatsApp</span>
          </div>
        </div>
      </footer>
    </div>
  );
};