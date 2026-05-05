import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  CalendarCheck, Users, Wrench, DollarSign,
  TrendingUp, Clock, CheckCircle, XCircle, Star,
} from "lucide-react";

const monthlyRevenue = [
  { month: "Jan", revenue: 42000, bookings: 85 },
  { month: "Feb", revenue: 38000, bookings: 72 },
  { month: "Mar", revenue: 51000, bookings: 98 },
  { month: "Apr", revenue: 46000, bookings: 90 },
  { month: "May", revenue: 55000, bookings: 110 },
  { month: "Jun", revenue: 60000, bookings: 120 },
  { month: "Jul", revenue: 58000, bookings: 115 },
  { month: "Aug", revenue: 63000, bookings: 128 },
  { month: "Sep", revenue: 59000, bookings: 118 },
  { month: "Oct", revenue: 67000, bookings: 135 },
  { month: "Nov", revenue: 71000, bookings: 142 },
  { month: "Dec", revenue: 78000, bookings: 158 },
];

const servicePieData = [
  { name: "Car Repair", value: 35, color: "#e8b84b" },
  { name: "Oil Change", value: 25, color: "#3b82f6" },
  { name: "Brake Service", value: 15, color: "#10b981" },
  { name: "Suspension", value: 10, color: "#8b5cf6" },
  { name: "Batteries", value: 10, color: "#ef4444" },
  { name: "Others", value: 5, color: "#6b7280" },
];

const recentBookings = [
  { id: "#B001", customer: "Ahmed Khan", service: "Car Repair", date: "May 5, 2026", amount: "$320", status: "Confirmed" },
  { id: "#B002", customer: "Sara Ali", service: "Oil Change", date: "May 5, 2026", amount: "$85", status: "Pending" },
  { id: "#B003", customer: "Mike Johnson", service: "Brake Service", date: "May 4, 2026", amount: "$240", status: "Completed" },
  { id: "#B004", customer: "Emily Davis", service: "Wheel Alignment", date: "May 4, 2026", amount: "$120", status: "Completed" },
  { id: "#B005", customer: "John Smith", service: "Battery Replace", date: "May 3, 2026", amount: "$180", status: "Cancelled" },
];

const statusColor: Record<string, string> = {
  Confirmed: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const recentReviews = [
  { name: "Ahmed Khan", rating: 5, comment: "Excellent service! My car runs like new.", date: "May 5" },
  { name: "Sara Ali", rating: 5, comment: "Very professional and fast.", date: "May 4" },
  { name: "Mike Johnson", rating: 4, comment: "Great work, reasonable prices.", date: "May 3" },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Bookings", value: "1,284", change: "+12%", icon: <CalendarCheck size={22} />, color: "bg-blue-500", light: "bg-blue-50", text: "text-blue-500" },
          { label: "Total Revenue", value: "$68,420", change: "+8.5%", icon: <DollarSign size={22} />, color: "bg-[#e8b84b]", light: "bg-yellow-50", text: "text-yellow-600" },
          { label: "Total Customers", value: "842", change: "+5.2%", icon: <Users size={22} />, color: "bg-green-500", light: "bg-green-50", text: "text-green-500" },
          { label: "Services Done", value: "2,156", change: "+15%", icon: <Wrench size={22} />, color: "bg-purple-500", light: "bg-purple-50", text: "text-purple-500" },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 ${card.light} ${card.text} rounded-xl flex items-center justify-center`}>
                {card.icon}
              </div>
              <span className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
                <TrendingUp size={11} /> {card.change}
              </span>
            </div>
            <div className="text-2xl font-black text-[#151515] mb-1">{card.value}</div>
            <div className="text-gray-400 text-xs font-semibold">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-black text-[#151515]">Revenue & Bookings</h3>
              <p className="text-gray-400 text-xs mt-0.5">Monthly overview for 2026</p>
            </div>
            <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 outline-none">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyRevenue} barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip formatter={(value: number, name: string) => [name === "revenue" ? `$${value.toLocaleString()}` : value, name === "revenue" ? "Revenue" : "Bookings"]} contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
              <Bar dataKey="revenue" fill="#e8b84b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h3 className="font-black text-[#151515]">Services Split</h3>
            <p className="text-gray-400 text-xs mt-0.5">By service type</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={servicePieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                {servicePieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, "Share"]} contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1.5">
            {servicePieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs text-gray-500">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-[#151515]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-black text-[#151515]">Recent Bookings</h3>
            <a href="/admin/bookings" className="text-xs text-[#e8b84b] font-bold hover:underline">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["ID", "Customer", "Service", "Date", "Amount", "Status"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-4 py-3 text-xs font-bold text-gray-400">{b.id}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#151515]">{b.customer}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{b.service}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{b.date}</td>
                    <td className="px-4 py-3 text-sm font-black text-[#151515]">{b.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusColor[b.status]}`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reviews & Quick Stats */}
        <div className="space-y-4">
          {/* Quick Status */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-black text-[#151515] mb-4">Today's Overview</h3>
            <div className="space-y-3">
              {[
                { label: "Pending", count: 3, icon: <Clock size={15} />, color: "text-yellow-500 bg-yellow-50" },
                { label: "In Progress", count: 7, icon: <Wrench size={15} />, color: "text-blue-500 bg-blue-50" },
                { label: "Completed", count: 12, icon: <CheckCircle size={15} />, color: "text-green-500 bg-green-50" },
                { label: "Cancelled", count: 1, icon: <XCircle size={15} />, color: "text-red-500 bg-red-50" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${item.color}`}>{item.icon}</div>
                    <span className="text-sm text-gray-500">{item.label}</span>
                  </div>
                  <span className="text-sm font-black text-[#151515]">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-black text-[#151515] mb-4">Recent Reviews</h3>
            <div className="space-y-4">
              {recentReviews.map((r, i) => (
                <div key={i} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-[#151515]">{r.name}</span>
                    <span className="text-xs text-gray-400">{r.date}</span>
                  </div>
                  <div className="flex mb-1">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} size={11} className="text-[#e8b84b]" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
