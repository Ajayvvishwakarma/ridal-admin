import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { 
  Menu, X, Phone, Mail, MapPin, Wrench, Car, CheckCircle, 
  ChevronRight, Shield, Zap, Award, Settings, Clock, User, Fuel
} from "lucide-react";

// Data Models
const carBrands = [
  { id: 1, name: "Maruti Suzuki", logo: "S" },
  { id: 2, name: "Hyundai", logo: "H" },
  { id: 3, name: "Tata", logo: "T" },
  { id: 4, name: "Honda", logo: "H" },
  { id: 5, name: "Mahindra", logo: "M" },
  { id: 6, name: "Kia", logo: "K" },
  { id: 7, name: "Toyota", logo: "T" },
  { id: 8, name: "Renault", logo: "R" },
];

const bikeBrands = [
  { id: 101, name: "Hero", logo: "H" },
  { id: 102, name: "Honda", logo: "H" },
  { id: 103, name: "Bajaj", logo: "B" },
  { id: 104, name: "Royal Enfield", logo: "R" },
  { id: 105, name: "TVS", logo: "T" },
  { id: 106, name: "Yamaha", logo: "Y" },
  { id: 107, name: "Suzuki", logo: "S" },
  { id: 108, name: "KTM", logo: "K" },
];

// Sample Brand Details (Maruti Suzuki)
const marutiDetails = {
  name: "Maruti Suzuki Alto",
  models: ["Alto", "Swift", "Wagon R", "Celerio"],
  fuel: ["Petrol", "Diesel", "CNG"],
  transmission: ["Manual", "Automatic"],
  services: [
    {
      name: "Basic Service",
      warranty: "1000 Kms or 1 Month",
      duration: "4 Hrs taken",
      items: ["Air Filter Cleaning", "Battery Water Top Up", "Car Wash", "Coolant Top Up (200 ml)", "Engine Oil Replacement", "Heater/Spark Plugs Checking", "Interior Vacuuming", "Oil Filter Replacement", "Wiper Fluid Replacement"],
      price: 3199
    },
    {
      name: "Standard Service",
      warranty: "10000 Kms or 6 Months",
      duration: "6 Hrs taken",
      items: ["Air Filter Replacement", "AC Filter Cleaning", "Battery Water Top Up", "Brake Fluid Top Up", "Car Scanning", "Car Wash", "Coolant Top Up (200 ml)", "Engine Oil Replacement", "Front Brake Pads Serviced"],
      price: 4427
    },
    {
      name: "Comprehensive Service",
      warranty: "20000 Kms or 12 Months",
      duration: "8 Hrs taken",
      items: ["Air Filter Replacement", "AC Filter Replacement", "Battery Water Top Up", "Brake Fluid Top Up", "Car Scanning", "Car Wash", "Coolant Top Up (200 ml)", "Engine Oil Replacement", "Engine Flushing", "Front Brake Pads Serviced"],
      price: 6713
    }
  ]
};

const repairServices = [
  { title: "Running Repair", time: "1 Hr taken", price: 1300, desc: "Repairs/Parts at Additional Charges" },
  { title: "Jump Start", time: "30 min taken", price: 1300, desc: "Available at Doorstep" },
  { title: "Puncture", time: "30 min taken", price: 1300, desc: "Rs 200/- extra per Additional Puncture" }
];

const acRepairServices = [
  { type: "Hatchback", brands: "Wagon R, Swift, i10, Alto", price: "1,999" },
  { type: "Sedan / SUV", brands: "City, Verna, Creta, Seltos", price: "2,399" },
  { type: "Luxury", brands: "Audi, BMW, Mercedes, Jeep", price: "12,999" }
];

export const RideNRepairServices = () => {
  const navigate = useNavigate(); // ADDED: Hook to handle navigation
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vehicleType, setVehicleType] = useState<'car' | 'bike'>('car');
  const [selectedBrand, setSelectedBrand] = useState<typeof carBrands[0] | null>(null);
  const [showFuelFilter, setShowFuelFilter] = useState(false); // For Electric/Non-Electric toggle

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services", active: true },
    { name: "Our Process", href: "/process" },
    { name: "Blogs", href: "/#blog" },
    { name: "Booking", href: "/booking" },
    { name: "About Us", href: "/about" },
    { name: "Franchise", href: "/franchise" },
    { name: "FAQ", href: "/#contact" },
    { name: "Contact", href: "/#contact" },
  ];

  // Handle Brand Selection
  const handleBrandClick = (brand: typeof carBrands[0]) => {
    setSelectedBrand(brand);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  // ADDED: Handle Checkout Click
  const handleCheckout = () => {
    // Validate if a brand is selected (optional, but good UX)
    if (!selectedBrand && vehicleType === 'car') {
      alert("Please select a Brand first!");
      window.scrollTo({ top: 400, behavior: 'smooth' });
      return;
    }
    // Navigate to Booking Page
    navigate("/booking");
  };

  const currentBrands = vehicleType === 'car' ? carBrands : bikeBrands;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F9FAFB", color: "#1F2937" }}>
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200" style={{ padding: "0 5%", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "24px", fontWeight: 800, color: "#1F2937" }}>
          <div style={{ background: "#F59E0B", padding: "6px", borderRadius: "6px" }}><Wrench color="#fff" size={20} /></div>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>Ride N Repair</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            link.href.startsWith("/#") ? (
              <a key={link.name} href={link.href} style={{ fontSize: "14px", fontWeight: 500, color: link.active ? "#F59E0B" : "#4B5563", textDecoration: "none" }} className="hover:text-amber-500 transition-colors">{link.name}</a>
            ) : (
              <Link key={link.name} to={link.href} style={{ fontSize: "14px", fontWeight: 500, color: link.active ? "#F59E0B" : "#4B5563", textDecoration: "none" }} className="hover:text-amber-500 transition-colors">{link.name}</Link>
            )
          ))}
        </div>

        
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 fixed w-full top-[70px] left-0 z-40" style={{ padding: "20px 5%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} style={{ textDecoration: "none", color: "#333", fontWeight: 500 }} onClick={() => setMobileMenuOpen(false)}>{link.name}</Link>
            ))}
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      

      {/* --- VEHICLE SELECTION TABS --- */}
      <section style={{ padding: "40px 5%", background: "#F9FAFB" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "20px", textAlign: "center" }}>Choose Your Vehicle</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "40px", flexWrap: "wrap" }}>
            {[
              { id: 'car', label: "Car", icon: <Car size={24} /> },
              { id: 'bike', label: "Bike", icon: <Wrench size={24} /> }
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => { setVehicleType(v.id as 'car' | 'bike'); setSelectedBrand(null); }}
                style={{
                  background: vehicleType === v.id ? "#F59E0B" : "#fff",
                  color: vehicleType === v.id ? "#fff" : "#1F2937",
                  border: vehicleType === v.id ? "2px solid #F59E0B" : "2px solid #E5E7EB",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
                }}
                className="hover:shadow-md"
              >
                {v.icon} {v.label}
              </button>
            ))}
          </div>
          
          {/* Fuel Type Filter (Conceptual) */}
          <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "40px" }}>
             <span style={{ fontSize: "14px", color: "#6B7280" }}>Select Type:</span>
             <button style={{ padding: "6px 16px", background: "#fff", border: "1px solid #ddd", borderRadius: "20px", fontSize: "13px" }}>Non-Electric</button>
             <button style={{ padding: "6px 16px", background: "#fff", border: "1px solid #ddd", borderRadius: "20px", fontSize: "13px" }}>Electric</button>
          </div>

          {/* BRAND GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "20px", marginBottom: "60px" }}>
            {currentBrands.map((brand) => (
              <div
                key={brand.id}
                onClick={() => handleBrandClick(brand)}
                style={{
                  background: "#fff",
                  border: selectedBrand?.id === brand.id ? "2px solid #F59E0B" : "1px solid #E5E7EB",
                  borderRadius: "12px",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: selectedBrand?.id === brand.id ? "0 10px 20px rgba(245, 158, 11, 0.15)" : "0 2px 5px rgba(0,0,0,0.03)"
                }}
                className="hover:-translate-y-1"
              >
                {/* Placeholder for Brand Logo */}
                <div style={{ 
                  width: "60px", height: "60px", background: "#F3F4F6", borderRadius: "50%", margin: "0 auto 15px", 
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: 900, color: "#9CA3AF" 
                }}>
                  {brand.logo}
                </div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#1F2937" }}>{brand.name}</div>
              </div>
            ))}
          </div>

          {/* --- BRAND DETAILS (CONDITIONAL) --- */}
          {selectedBrand && (
            <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", animation: "fadeIn 0.5s ease" }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* Brand Info Column */}
                <div className="lg:col-span-1">
                  <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
                    <div style={{ width: "80px", height: "80px", background: "#F59E0B", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", fontWeight: 900 }}>
                      {marutiDetails.name.charAt(0)}
                    </div>
                    <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#111827" }}>{marutiDetails.name}</h3>
                  </div>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", marginBottom: "8px" }}>Models</h4>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {marutiDetails.models.map((m, i) => (
                        <span key={i} style={{ background: "#F3F4F6", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", color: "#4B5563" }}>{m}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", marginBottom: "8px" }}>Fuel Type</h4>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {marutiDetails.fuel.map((f, i) => (
                        <span key={i} style={{ display: "flex", alignItems: "center", gap: "5px", border: "1px solid #E5E7EB", padding: "6px 12px", borderRadius: "8px", fontSize: "13px", color: "#1F2937" }}>
                          <Fuel size={14} /> {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", marginBottom: "8px" }}>Transmission</h4>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {marutiDetails.transmission.map((t, i) => (
                        <span key={i} style={{ display: "flex", alignItems: "center", gap: "5px", border: "1px solid #E5E7EB", padding: "6px 12px", borderRadius: "8px", fontSize: "13px", color: "#1F2937" }}>
                          <Settings size={14} /> {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Service Plans Column */}
                <div className="lg:col-span-2">
                  <h3 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "20px", textAlign: "center" }}>Select Service Plan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {marutiDetails.services.map((plan, i) => (
                      <div key={i} style={{ border: "1px solid #E5E7EB", borderRadius: "12px", padding: "20px", background: "#FAFAFA", transition: "0.3s" }} className="hover:border-[#F59E0B] hover:shadow-lg">
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "15px" }}>
                          <div style={{ width: "40px", height: "40px", background: "#FFFBEB", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#F59E0B" }}>
                            {i === 0 && <CheckCircle size={20} />}
                            {i === 1 && <Award size={20} />}
                            {i === 2 && <Shield size={20} />}
                          </div>
                          <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>{plan.name}</h4>
                        </div>
                        
                        <div style={{ marginBottom: "15px" }}>
                          <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>Warranty</div>
                          <div style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{plan.warranty}</div>
                          <div style={{ fontSize: "11px", color: "#F59E0B", marginTop: "2px" }}>{plan.name === "Comprehensive Service" && "Recommended"}</div>
                        </div>

                        <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "15px" }}>
                          <div style={{ fontWeight: 600, marginBottom: "5px" }}>{plan.duration}</div>
                          <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
                            {plan.items.slice(0, 3).map((item, idx) => (
                              <li key={idx} style={{ fontSize: "13px" }}>• {item}</li>
                            ))}
                            {plan.items.length > 3 && <li style={{ fontSize: "13px", color: "#F59E0B", cursor: "pointer" }}>View All +{plan.items.length - 3}</li>}
                          </ul>
                        </div>

                        <div style={{ marginTop: "auto" }}>
                          <div style={{ fontSize: "24px", fontWeight: 800, color: "#F59E0B", marginBottom: "10px" }}>₹{plan.price}</div>
                          {/* FIXED: Added onClick handler */}
                          <button 
                            onClick={handleCheckout}
                            style={{ width: "100%", background: "#F59E0B", color: "#fff", padding: "10px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer", transition: "background 0.3s" }}
                            className="hover:bg-amber-600"
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- ADDITIONAL SERVICES --- */}
      <section style={{ padding: "80px 5%", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "40px", textAlign: "center" }}>Also Available</h2>          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {repairServices.map((service, i) => (
              <div key={i} style={{ background: "#F9FAFB", padding: "30px", borderRadius: "12px", border: "1px solid #E5E7EB", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                    <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#111827" }}>{service.title}</h3>
                    {i === 0 && <Clock size={24} color="#F59E0B" />}
                    {i === 1 && <Zap size={24} color="#F59E0B" />}
                    {i === 2 && <Shield size={24} color="#F59E0B" />}
                  </div>
                  <div style={{ fontSize: "14px", color: "#6B7280", marginBottom: "10px" }}>
                    {service.desc}
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>
                    {service.time}
                  </div>
                </div>
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div style={{ fontSize: "24px", fontWeight: 800, color: "#F59E0B" }}>₹{service.price}</div>
                  {/* FIXED: Added onClick handler */}
                  <button 
                    onClick={handleCheckout}
                    style={{ background: "#1F2937", color: "#fff", padding: "8px 16px", borderRadius: "6px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer", transition: "background 0.3s" }}
                    className="hover:bg-gray-800"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CAR AC REPAIR */}
          <div style={{ background: "#111827", color: "#fff", borderRadius: "16px", padding: "40px" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div style={{ display: "inline-block", background: "#F59E0B", color: "#000", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, marginBottom: "15px" }}>
                Car AC Repair Service
              </div>
              <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "10px" }}>Doorstep AC Service</h2>
              <p style={{ fontSize: "16px", color: "#9CA3AF" }}>By certified mechanics — 12-point check, 30-day warranty</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {acRepairServices.map((ac, i) => (
                <div key={i} style={{ background: "#1F2937", border: "1px solid #374151", borderRadius: "12px", padding: "25px", textAlign: "center" }}>
                  <div style={{ fontSize: "12px", color: "#F59E0B", textTransform: "uppercase", marginBottom: "10px", fontWeight: 600 }}>
                    {ac.type}
                  </div>
                  <div style={{ fontSize: "14px", color: "#9CA3AF", marginBottom: "20px", minHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {ac.brands}
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: 800, marginBottom: "15px" }}>₹{ac.price}</div>
                  <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "20px" }}>
                    Service charge · Gas refill billed separately
                  </div>
                  {/* FIXED: Added onClick handler */}
                  <button 
                    onClick={handleCheckout}
                    style={{ width: "100%", background: "#F59E0B", color: "#000", padding: "12px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer", transition: "background 0.3s" }}
                    className="hover:bg-amber-600"
                  >
                    Book AC Repair
                  </button>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <span style={{ color: "#F59E0B", fontSize: "14px", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>View full AC repair details →</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section style={{ padding: "80px 5%", background: "#fff" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "40px", textAlign: "center" }}>WHY CHOOSE US</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Doorstep Bike & Car Service", desc: "We bring our expertise right to your home or office, saving you time and hassle." },
              { title: "Online Booking Made Easy", desc: "Schedule a slot via our bike service app or car service app in seconds." },
              { title: "Qualified Mechanics for Every Brand", desc: "From an Activa mechanic near me to a Royal Enfield specialist, or a certified car technician for Hyundai and Maruti, our professionals are highly skilled." },
              { title: "Transparency & Trust", desc: "Enjoy real-time service updates and detailed breakdowns of any repair or part replacement." },
              { title: "Emergency Assistance & Jump Starts", desc: "Stuck on the road? Our on-demand mechanics can help with urgent puncture repair, jump starts, and more." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "15px", padding: "20px", borderRadius: "10px", border: "1px solid #f3f4f6" }}>
                <div style={{ background: "#FFFBEB", padding: "12px", borderRadius: "8px", color: "#F59E0B", flexShrink: 0 }}>
                  <CheckCircle size={24} />
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
              <li><Link to="/services" style={{ color: "inherit", textDecoration: "none" }}>Services</Link></li>
              <li><Link to="/process" style={{ color: "inherit", textDecoration: "none" }}>Process</Link></li>
              <li><Link to="/booking" style={{ color: "inherit", textDecoration: "none" }}>Booking</Link></li>
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
    </div>
  );
};