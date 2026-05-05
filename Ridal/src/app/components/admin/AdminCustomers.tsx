import { useState } from "react";
import { Search, Eye, Trash2, X, Users, Star, CalendarCheck, DollarSign } from "lucide-react";

const initialCustomers = [
  { id: 1, name: "Ahmed Khan", email: "ahmed@email.com", phone: "+1-555-0101", location: "New York, NY", bookings: 8, spent: 1240, rating: 5, joined: "Jan 2025", lastVisit: "May 5, 2026", status: "Active" },
  { id: 2, name: "Sara Ali", email: "sara@email.com", phone: "+1-555-0102", location: "Brooklyn, NY", bookings: 3, spent: 385, rating: 4, joined: "Mar 2025", lastVisit: "May 5, 2026", status: "Active" },
  { id: 3, name: "Mike Johnson", email: "mike@email.com", phone: "+1-555-0103", location: "Queens, NY", bookings: 12, spent: 2100, rating: 5, joined: "Nov 2024", lastVisit: "May 4, 2026", status: "Active" },
  { id: 4, name: "Emily Davis", email: "emily@email.com", phone: "+1-555-0104", location: "Manhattan, NY", bookings: 5, spent: 780, rating: 4, joined: "Feb 2025", lastVisit: "May 4, 2026", status: "Active" },
  { id: 5, name: "John Smith", email: "john@email.com", phone: "+1-555-0105", location: "Bronx, NY", bookings: 2, spent: 260, rating: 3, joined: "Apr 2026", lastVisit: "May 3, 2026", status: "Inactive" },
  { id: 6, name: "Fatima Malik", email: "fatima@email.com", phone: "+1-555-0106", location: "Staten Island, NY", bookings: 6, spent: 950, rating: 5, joined: "Jun 2024", lastVisit: "May 3, 2026", status: "Active" },
  { id: 7, name: "David Brown", email: "david@email.com", phone: "+1-555-0107", location: "Jersey City, NJ", bookings: 9, spent: 1560, rating: 5, joined: "Aug 2024", lastVisit: "May 2, 2026", status: "Active" },
  { id: 8, name: "Aisha Raza", email: "aisha@email.com", phone: "+1-555-0108", location: "Newark, NJ", bookings: 4, spent: 520, rating: 4, joined: "Jan 2026", lastVisit: "May 2, 2026", status: "Active" },
];

type Customer = typeof initialCustomers[0];

export function AdminCustomers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [viewCustomer, setViewCustomer] = useState<Customer | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-[#151515]">Customers</h2>
        <p className="text-gray-400 text-sm">Manage your customer database</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Customers", value: customers.length, icon: <Users size={18} />, color: "text-blue-500 bg-blue-50" },
          { label: "Active", value: customers.filter(c => c.status === "Active").length, icon: <Star size={18} />, color: "text-green-500 bg-green-50" },
          { label: "Total Bookings", value: customers.reduce((a, c) => a + c.bookings, 0), icon: <CalendarCheck size={18} />, color: "text-yellow-500 bg-yellow-50" },
          { label: "Total Revenue", value: `$${customers.reduce((a, c) => a + c.spent, 0).toLocaleString()}`, icon: <DollarSign size={18} />, color: "text-purple-500 bg-purple-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>{stat.icon}</div>
            <div>
              <div className="text-xl font-black text-[#151515]">{stat.value}</div>
              <div className="text-xs text-gray-400 font-semibold">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#e8b84b] w-full transition" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Customer", "Contact", "Location", "Bookings", "Total Spent", "Rating", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#e8b84b] rounded-full flex items-center justify-center text-black font-black text-xs flex-shrink-0">
                        {c.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-sm font-semibold text-[#151515] whitespace-nowrap">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-[#151515]">{c.email}</div>
                    <div className="text-xs text-gray-400">{c.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{c.location}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-[#151515]">{c.bookings}</td>
                  <td className="px-4 py-3 text-sm font-black text-[#151515]">${c.spent.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className={i < c.rating ? "text-[#e8b84b]" : "text-gray-200"} fill="currentColor" />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${c.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setViewCustomer(c)} className="w-7 h-7 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-100 transition">
                        <Eye size={13} />
                      </button>
                      <button onClick={() => setDeleteId(c.id)} className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Customer Modal */}
      {viewCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-black text-[#151515]">Customer Profile</h3>
              <button onClick={() => setViewCustomer(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#e8b84b] rounded-full flex items-center justify-center text-black font-black text-xl">
                  {viewCustomer.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h4 className="font-black text-[#151515] text-lg">{viewCustomer.name}</h4>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} className={i < viewCustomer.rating ? "text-[#e8b84b]" : "text-gray-200"} fill="currentColor" />
                    ))}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold inline-block mt-1 ${viewCustomer.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{viewCustomer.status}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Email", value: viewCustomer.email },
                  { label: "Phone", value: viewCustomer.phone },
                  { label: "Location", value: viewCustomer.location },
                  { label: "Member Since", value: viewCustomer.joined },
                  { label: "Last Visit", value: viewCustomer.lastVisit },
                  { label: "Total Bookings", value: viewCustomer.bookings },
                  { label: "Total Spent", value: `$${viewCustomer.spent.toLocaleString()}` },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-xs font-bold text-gray-400 mb-0.5">{item.label}</div>
                    <div className="text-sm font-semibold text-[#151515]">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 pb-6">
              <button onClick={() => setViewCustomer(null)} className="w-full border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="font-black text-[#151515] text-lg mb-2">Remove Customer?</h3>
            <p className="text-gray-400 text-sm mb-6">This customer's data will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">Cancel</button>
              <button onClick={() => { setCustomers(prev => prev.filter(c => c.id !== deleteId)); setDeleteId(null); }} className="flex-1 bg-red-500 text-white py-2.5 rounded-lg text-sm font-black hover:bg-red-600 transition">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
