import { useState } from "react";
import { Save, Bell, Lock, Globe, Palette, Building2, Check } from "lucide-react";

export function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    businessName: "Garix Auto Services",
    email: "info@garix.com",
    phone: "+1 (800) 123-4567",
    address: "123 Auto Street, New York, NY 10001",
    hours: "Mon–Sat: 8:00 AM – 7:00 PM",
    website: "www.garix.com",
    currency: "USD",
    timezone: "America/New_York",
    emailNotif: true,
    smsNotif: true,
    newBookingNotif: true,
    bookingReminderNotif: true,
    reviewNotif: false,
    primaryColor: "#e8b84b",
    darkMode: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const tabs = [
    { id: "general", label: "General", icon: <Building2 size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
    { id: "appearance", label: "Appearance", icon: <Palette size={16} /> },
    { id: "security", label: "Security", icon: <Lock size={16} /> },
  ];

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h2 className="text-xl font-black text-[#151515]">Settings</h2>
        <p className="text-gray-400 text-sm">Configure your admin panel settings</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-[#e8b84b] text-[#151515]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Globe size={18} className="text-[#e8b84b]" />
                <h3 className="font-black text-[#151515]">Business Information</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Business Name</label>
                  <input type="text" value={settings.businessName} onChange={e => setSettings(p => ({ ...p, businessName: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Email Address</label>
                  <input type="email" value={settings.email} onChange={e => setSettings(p => ({ ...p, email: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Phone Number</label>
                  <input type="tel" value={settings.phone} onChange={e => setSettings(p => ({ ...p, phone: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Website</label>
                  <input type="text" value={settings.website} onChange={e => setSettings(p => ({ ...p, website: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Address</label>
                  <input type="text" value={settings.address} onChange={e => setSettings(p => ({ ...p, address: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Business Hours</label>
                  <input type="text" value={settings.hours} onChange={e => setSettings(p => ({ ...p, hours: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Currency</label>
                  <select value={settings.currency} onChange={e => setSettings(p => ({ ...p, currency: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>PKR</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Timezone</label>
                  <select value={settings.timezone} onChange={e => setSettings(p => ({ ...p, timezone: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition">
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Asia/Karachi">Pakistan Time (PKT)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Bell size={18} className="text-[#e8b84b]" />
                <h3 className="font-black text-[#151515]">Notification Preferences</h3>
              </div>
              <div className="space-y-4">
                {[
                  { key: "emailNotif", label: "Email Notifications", desc: "Receive notifications via email" },
                  { key: "smsNotif", label: "SMS Notifications", desc: "Receive notifications via SMS" },
                  { key: "newBookingNotif", label: "New Booking Alert", desc: "Get notified when a new booking is made" },
                  { key: "bookingReminderNotif", label: "Booking Reminders", desc: "Send appointment reminders to customers" },
                  { key: "reviewNotif", label: "Review Notifications", desc: "Get notified when a customer leaves a review" },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="text-sm font-semibold text-[#151515]">{item.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => setSettings(p => ({ ...p, [item.key]: !p[item.key as keyof typeof p] }))}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${settings[item.key as keyof typeof settings] ? "bg-[#e8b84b]" : "bg-gray-200"}`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${settings[item.key as keyof typeof settings] ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeTab === "appearance" && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Palette size={18} className="text-[#e8b84b]" />
                <h3 className="font-black text-[#151515]">Appearance Settings</h3>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-3 block">Brand Color</label>
                <div className="flex flex-wrap gap-3">
                  {["#e8b84b", "#3b82f6", "#10b981", "#8b5cf6", "#ef4444", "#f97316"].map(color => (
                    <button
                      key={color}
                      onClick={() => setSettings(p => ({ ...p, primaryColor: color }))}
                      className={`w-10 h-10 rounded-xl border-2 transition-all ${settings.primaryColor === color ? "border-gray-800 scale-110" : "border-transparent"}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="text-sm font-semibold text-[#151515]">Dark Mode (Coming Soon)</div>
                  <div className="text-xs text-gray-400 mt-0.5">Switch to dark theme</div>
                </div>
                <button
                  disabled
                  className="relative w-11 h-6 rounded-full bg-gray-200 opacity-50 cursor-not-allowed"
                >
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow" />
                </button>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Lock size={18} className="text-[#e8b84b]" />
                <h3 className="font-black text-[#151515]">Security Settings</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition" />
                </div>
                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-xs text-yellow-700">
                  Password must be at least 8 characters and include a number and special character.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="px-6 pb-6 flex justify-end">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-black transition-all ${saved ? "bg-green-500 text-white" : "bg-[#e8b84b] text-black hover:bg-yellow-400"}`}
          >
            {saved ? <><Check size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}
