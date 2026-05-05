import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, X, Phone, Mail, MapPin, Wrench, Calendar, Clock, 
  CheckCircle, ChevronRight, Car, Shield, Zap, Map
} from "lucide-react";

export const RideNRepairBooking = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
    email: "",
    phone: "",
    name: "",
    date: "",
    time: "",
    notes: "",
    coupon: ""
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Our Process", href: "/process" },
    { name: "Blogs", href: "/#blog" },
    { name: "About Us", href: "/about" },
    { name: "Franchise", href: "/franchise" },
    { name: "FAQ", href: "/#contact" },
    { name: "Contact", href: "/#contact" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call / Checkout process on same page
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F9FAFB", color: "#1F2937", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", padding: "60px 40px", borderRadius: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)", textAlign: "center", maxWidth: "500px" }}>
          <div style={{ width: "80px", height: "80px", background: "#ECFDF5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <CheckCircle size={40} color="#10B981" />
          </div>
          <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "16px" }}>Booking Confirmed!</h2>
          <p style={{ color: "#6B7280", marginBottom: "30px", lineHeight: 1.6 }}>
            Thank you for choosing Ride N Repair. Our mechanic will arrive at your location at the scheduled time.
          </p>
          <Link 
            to="/" 
            style={{ display: "inline-block", background: "#F59E0B", color: "#fff", padding: "12px 32px", borderRadius: "8px", fontWeight: 600, textDecoration: "none" }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F9FAFB", color: "#1F2937" }}>
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200" style={{ padding: "0 5%", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "24px", fontWeight: 800, color: "#1F2937" }}>
          <div style={{ background: "#F59E0B", padding: "6px", borderRadius: "6px" }}><Wrench color="#fff" size={20} /></div>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Ride N Repair</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            link.href.startsWith("/#") ? (
              <a key={link.name} href={link.href} style={{ fontSize: "14px", fontWeight: 500, color: "#4B5563", textDecoration: "none" }} className="hover:text-amber-500 transition-colors">{link.name}</a>
            ) : (
              <Link key={link.name} to={link.href} style={{ fontSize: "14px", fontWeight: 500, color: "#4B5563", textDecoration: "none" }} className="hover:text-amber-500 transition-colors">{link.name}</Link>
            )
          ))}
          <Link to="/booking" style={{ fontSize: "14px", fontWeight: 700, color: "#F59E0B", textDecoration: "none", borderBottom: "2px solid #F59E0B" }}>Booking</Link>
        </div>

        
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 fixed w-full top-[70px] left-0 z-40" style={{ padding: "20px 5%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} style={{ textDecoration: "none", color: "#333", fontWeight: 500 }} onClick={() => setMobileMenuOpen(false)}>{link.name}</Link>
            ))}
            <Link to="/booking" style={{ textDecoration: "none", color: "#F59E0B", fontWeight: 700, border: "1px solid #F59E0B", padding: "8px", borderRadius: "4px", textAlign: "center" }} onClick={() => setMobileMenuOpen(false)}>Booking</Link>
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      

      {/* --- MAIN FORM SECTION --- */}
      <section style={{ padding: "60px 5%" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", background: "#fff", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", padding: "40px" }}>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            
            {/* 1. LOCATION */}
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "15px", color: "#111827", display: "flex", alignItems: "center", gap: "10px" }}>
                <MapPin size={20} color="#F59E0B" /> SELECT EXACT SERVICE ADDRESS
              </h3>
              
              <div style={{ background: "#FFFBEB", border: "1px solid #F59E0B", padding: "12px", borderRadius: "8px", marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => setUseCurrentLocation(!useCurrentLocation)}>
                <input type="checkbox" checked={useCurrentLocation} readOnly style={{ accentColor: "#F59E0B" }} />
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#B45309" }}>Use Current Location</span>
              </div>

              <div style={{ position: "relative" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#6B7280", marginBottom: "5px", display: "block" }}>Complete your address with House No</label>
                <textarea 
                  rows={2} 
                  placeholder="House/Flat No, Building, Street, Landmark..."
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", outline: "none", fontSize: "14px", resize: "none", fontFamily: "inherit" }}
                />
              </div>
            </div>

            {/* 2. USER INFORMATION */}
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "15px", color: "#111827" }}>FILL YOUR INFORMATION</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#6B7280", marginBottom: "5px", display: "block" }}>Email (for Invoice)</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="email@example.com"
                    style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", outline: "none", fontSize: "14px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#6B7280", marginBottom: "5px", display: "block" }}>Phone Number</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "12px", top: "12px", color: "#9CA3AF", fontSize: "14px" }}>+91</span>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="XXXXX XXXXX"
                      style={{ width: "100%", padding: "12px 12px 12px 50px", border: "1px solid #D1D5DB", borderRadius: "8px", outline: "none", fontSize: "14px" }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#6B7280", marginBottom: "5px", display: "block" }}>Name (Optional)</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Your Name"
                  style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", outline: "none", fontSize: "14px" }}
                />
              </div>
            </div>

            {/* 3. DATE & TIME */}
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "15px", color: "#111827", display: "flex", alignItems: "center", gap: "10px" }}>
                <Calendar size={20} color="#F59E0B" /> SELECT DATE and TIME
              </h3>
              <p style={{ fontSize: "13px", color: "#EF4444", marginBottom: "20px", background: "#FEF2F2", padding: "10px", borderRadius: "4px" }}>
                *Please select a date & time for your service that is at least 30 minutes from current time.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#6B7280", marginBottom: "5px", display: "block" }}>Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", outline: "none", fontSize: "14px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#6B7280", marginBottom: "5px", display: "block" }}>Time</label>
                  <select 
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", outline: "none", fontSize: "14px", background: "#fff" }}
                  >
                    <option value="">Select time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 4. ADDITIONAL NOTES */}
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "15px", color: "#111827" }}>ADDITIONAL NOTES</h3>
              <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "5px" }}>Please explain what is issue, if any, with your vehicle in detail</p>
              <textarea 
                rows={4} 
                placeholder="Describe the issue here..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", outline: "none", fontSize: "14px", resize: "none" }}
              />
            </div>

            {/* 5. DISCOUNT COUPON */}
            <div style={{ background: "#F3F4F6", padding: "20px", borderRadius: "8px" }}>
              <label style={{ fontSize: "14px", fontWeight: 700, marginBottom: "10px", display: "block" }}>Discount Coupon</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input 
                  type="text" 
                  value={formData.coupon}
                  onChange={(e) => setFormData({...formData, coupon: e.target.value})}
                  placeholder="Enter Coupon Code"
                  style={{ flex: 1, padding: "10px", border: "1px solid #D1D5DB", borderRadius: "6px", outline: "none", fontSize: "14px" }}
                />
                <button type="button" style={{ padding: "10px 20px", background: "#111827", color: "#fff", border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>Apply</button>
              </div>
            </div>

            {/* 6. TERMS */}
            <div style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.6, borderTop: "1px solid #E5E7EB", paddingTop: "20px" }}>
              *Amount paid will be adjusted from total bill. If service is canceled with at least one hour's notice, a full refund will be issued for all charged amounts. All prices are inclusive of GST. If our mechanic comes to your location and no service/repair is performed, there will be a visit charge of Rs.399/-.
            </div>

            {/* CHECKOUT BUTTON */}
            <button 
              type="submit" 
              disabled={isProcessing}
              style={{ 
                width: "100%", 
                background: isProcessing ? "#9CA3AF" : "#F59E0B", 
                color: "#fff", 
                padding: "16px", 
                borderRadius: "8px", 
                fontWeight: 700, 
                fontSize: "16px", 
                border: "none", 
                cursor: isProcessing ? "not-allowed" : "pointer", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                gap: "10px" 
              }}
            >
              {isProcessing ? (
                <>
                  <div style={{ width: "16px", height: "16px", border: "2px solid #fff", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                  Processing...
                </>
              ) : (
                <>
                  Proceed to Checkout <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>
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
              <li><Link to="/services" style={{ color: "inherit", textDecoration: "none" }}>Our Services</Link></li>
              <li><Link to="/booking" style={{ color: "inherit", textDecoration: "none", fontWeight: 700, color: "#F59E0B" }}>Booking</Link></li>
              <li><Link to="/#contact" style={{ color: "inherit", textDecoration: "none" }}>Faq</Link></li>
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
             {["Hero", "Honda", "Bajaj", "Royal Enfield", "Maruti Suzuki", "Hyundai", "Tata"].map(brand => (
               <span key={brand} style={{ color: "#D1D5DB", cursor: "pointer" }}>{brand}</span>
             ))}
             <span style={{ color: "#F59E0B", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
               All Brands <ChevronRight size={14} />
             </span>
          </div>
        </div>
      </footer>

      {/* CSS Animation for Spinner */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};