import { useState } from "react";
import { Search, Filter, Eye, Check, X, CalendarCheck, Clock, CheckCircle, XCircle } from "lucide-react";

const allBookings = [
  { id: "#B001", customer: "Ahmed Khan", phone: "+1-555-0101", service: "Car Repair", date: "May 5, 2026", time: "10:00 AM", amount: 320, status: "Confirmed", notes: "Engine noise issue" },
  { id: "#B002", customer: "Sara Ali", phone: "+1-555-0102", service: "Oil Change", date: "May 5, 2026", time: "11:30 AM", amount: 85, status: "Pending", notes: "" },
  { id: "#B003", customer: "Mike Johnson", phone: "+1-555-0103", service: "Brake Service", date: "May 4, 2026", time: "09:00 AM", amount: 240, status: "Completed", notes: "Both front brakes replaced" },
  { id: "#B004", customer: "Emily Davis", phone: "+1-555-0104", service: "Wheel Alignment", date: "May 4, 2026", time: "02:00 PM", amount: 120, status: "Completed", notes: "" },
  { id: "#B005", customer: "John Smith", phone: "+1-555-0105", service: "Battery Replace", date: "May 3, 2026", time: "03:30 PM", amount: 180, status: "Cancelled", notes: "Customer cancelled" },
  { id: "#B006", customer: "Fatima Malik", phone: "+1-555-0106", service: "Suspension", date: "May 3, 2026", time: "11:00 AM", amount: 350, status: "Completed", notes: "" },
  { id: "#B007", customer: "David Brown", phone: "+1-555-0107", service: "Car Repair", date: "May 2, 2026", time: "10:30 AM", amount: 420, status: "Completed", notes: "AC compressor replaced" },
  { id: "#B008", customer: "Aisha Raza", phone: "+1-555-0108", service: "Oil Change", date: "May 2, 2026", time: "01:00 PM", amount: 85, status: "Confirmed", notes: "" },
  { id: "#B009", customer: "Robert Lee", phone: "+1-555-0109", service: "Exhaust Systems", date: "May 1, 2026", time: "09:30 AM", amount: 260, status: "Pending", notes: "" },
  { id: "#B010", customer: "Zara Khan", phone: "+1-555-0110", service: "Wheel Alignment", date: "May 1, 2026", time: "04:00 PM", amount: 120, status: "Completed", notes: "" },
];

type Booking = typeof allBookings[0];

const statusColor: Record<string, string> = {
  Confirmed: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export function AdminBookings() {
  const [bookings, setBookings] = useState(allBookings);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [viewBooking, setViewBooking] = useState<Booking | null>(null);

  const filtered = bookings.filter(b => {
    const matchSearch = b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, newStatus: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    if (viewBooking?.id === id) setViewBooking(prev => prev ? { ...prev, status: newStatus } : null);
  };

  const stats = [
    { label: "Total", count: bookings.length, icon: <CalendarCheck size={18} />, color: "text-blue-500 bg-blue-50" },
    { label: "Pending", count: bookings.filter(b => b.status === "Pending").length, icon: <Clock size={18} />, color: "text-yellow-500 bg-yellow-50" },
    { label: "Completed", count: bookings.filter(b => b.status === "Completed").length, icon: <CheckCircle size={18} />, color: "text-green-500 bg-green-50" },
    { label: "Cancelled", count: bookings.filter(b => b.status === "Cancelled").length, icon: <XCircle size={18} />, color: "text-red-500 bg-red-50" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-[#151515]">Bookings Management</h2>
        <p className="text-gray-400 text-sm">View and manage all customer bookings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>{s.icon}</div>
            <div>
              <div className="text-xl font-black text-[#151515]">{s.count}</div>
              <div className="text-xs text-gray-400 font-semibold">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search bookings..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#e8b84b] w-full transition" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-gray-400" />
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#e8b84b] transition">
              <option>All</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["ID", "Customer", "Service", "Date & Time", "Amount", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-4 py-3 text-xs font-bold text-gray-400">{b.id}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-[#151515]">{b.customer}</div>
                    <div className="text-xs text-gray-400">{b.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{b.service}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-[#151515]">{b.date}</div>
                    <div className="text-xs text-gray-400">{b.time}</div>
                  </td>
                  <td className="px-4 py-3 text-sm font-black text-[#151515]">${b.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusColor[b.status]}`}>{b.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setViewBooking(b)} className="w-7 h-7 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-100 transition" title="View">
                        <Eye size={13} />
                      </button>
                      {b.status === "Pending" && (
                        <button onClick={() => updateStatus(b.id, "Confirmed")} className="w-7 h-7 bg-green-50 text-green-500 rounded-lg flex items-center justify-center hover:bg-green-100 transition" title="Confirm">
                          <Check size={13} />
                        </button>
                      )}
                      {(b.status === "Pending" || b.status === "Confirmed") && (
                        <button onClick={() => updateStatus(b.id, "Cancelled")} className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition" title="Cancel">
                          <X size={13} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400 text-sm">No bookings found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Booking Modal */}
      {viewBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-black text-[#151515]">Booking Details</h3>
              <button onClick={() => setViewBooking(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400">Booking ID</span>
                <span className="text-sm font-black text-[#151515]">{viewBooking.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400">Status</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusColor[viewBooking.status]}`}>{viewBooking.status}</span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400">Customer</span>
                <span className="text-sm font-semibold text-[#151515]">{viewBooking.customer}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400">Phone</span>
                <span className="text-sm text-[#151515]">{viewBooking.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400">Service</span>
                <span className="text-sm text-[#151515]">{viewBooking.service}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400">Date</span>
                <span className="text-sm text-[#151515]">{viewBooking.date} at {viewBooking.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400">Amount</span>
                <span className="text-sm font-black text-[#151515]">${viewBooking.amount}</span>
              </div>
              {viewBooking.notes && (
                <div>
                  <span className="text-sm font-bold text-gray-400 block mb-1">Notes</span>
                  <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">{viewBooking.notes}</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 px-6 pb-6">
              {viewBooking.status === "Pending" && (
                <button onClick={() => updateStatus(viewBooking.id, "Confirmed")} className="flex-1 bg-green-500 text-white py-2.5 rounded-lg text-sm font-black hover:bg-green-600 transition">
                  Confirm Booking
                </button>
              )}
              {viewBooking.status === "Confirmed" && (
                <button onClick={() => updateStatus(viewBooking.id, "Completed")} className="flex-1 bg-[#e8b84b] text-black py-2.5 rounded-lg text-sm font-black hover:bg-yellow-400 transition">
                  Mark Completed
                </button>
              )}
              <button onClick={() => setViewBooking(null)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
