import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Wrench, Zap, Settings, Droplets, Battery, Circle, X, Check } from "lucide-react";

const initialServices = [
  { id: 1, icon: "Wrench", name: "Car Repair", category: "Repair", price: 150, duration: "2-4 hrs", status: "Active", orders: 342 },
  { id: 2, icon: "Zap", name: "Exhaust Systems", category: "Repair", price: 200, duration: "1-2 hrs", status: "Active", orders: 215 },
  { id: 3, icon: "Settings", name: "Suspension", category: "Maintenance", price: 250, duration: "3-5 hrs", status: "Active", orders: 178 },
  { id: 4, icon: "Droplets", name: "Oil Change", category: "Maintenance", price: 85, duration: "30 min", status: "Active", orders: 520 },
  { id: 5, icon: "Battery", name: "Batteries", category: "Replacement", price: 120, duration: "30 min", status: "Active", orders: 289 },
  { id: 6, icon: "Circle", name: "Wheel Alignment", category: "Maintenance", price: 95, duration: "1 hr", status: "Active", orders: 310 },
  { id: 7, icon: "Settings", name: "Brake Service", category: "Repair", price: 180, duration: "1-2 hrs", status: "Inactive", orders: 95 },
  { id: 8, icon: "Wrench", name: "AC & Heating", category: "Repair", price: 220, duration: "2-3 hrs", status: "Active", orders: 134 },
];

const iconMap: Record<string, JSX.Element> = {
  Wrench: <Wrench size={18} />,
  Zap: <Zap size={18} />,
  Settings: <Settings size={18} />,
  Droplets: <Droplets size={18} />,
  Battery: <Battery size={18} />,
  Circle: <Circle size={18} />,
};

type Service = typeof initialServices[0];

export function AdminServices() {
  const [services, setServices] = useState(initialServices);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", category: "Repair", price: "", duration: "", status: "Active" });

  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditService(null);
    setForm({ name: "", category: "Repair", price: "", duration: "", status: "Active" });
    setShowModal(true);
  };

  const openEdit = (s: Service) => {
    setEditService(s);
    setForm({ name: s.name, category: s.category, price: String(s.price), duration: s.duration, status: s.status });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    if (editService) {
      setServices(prev => prev.map(s => s.id === editService.id ? { ...s, ...form, price: Number(form.price) } : s));
    } else {
      setServices(prev => [...prev, { id: Date.now(), icon: "Wrench", orders: 0, ...form, price: Number(form.price) }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setServices(prev => prev.filter(s => s.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-[#151515]">Services Management</h2>
          <p className="text-gray-400 text-sm">Manage all your car services</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#e8b84b] text-black px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-yellow-400 transition">
          <Plus size={17} /> Add Service
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Services", value: services.length },
          { label: "Active", value: services.filter(s => s.status === "Active").length },
          { label: "Inactive", value: services.filter(s => s.status === "Inactive").length },
          { label: "Total Orders", value: services.reduce((a, s) => a + s.orders, 0) },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-black text-[#151515]">{stat.value}</div>
            <div className="text-gray-400 text-xs font-semibold mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search & Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#e8b84b] w-full transition"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Service", "Category", "Price", "Duration", "Orders", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#e8b84b]/10 rounded-lg flex items-center justify-center text-[#e8b84b]">
                        {iconMap[s.icon]}
                      </div>
                      <span className="text-sm font-semibold text-[#151515]">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{s.category}</td>
                  <td className="px-4 py-3 text-sm font-black text-[#151515]">${s.price}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{s.duration}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-[#151515]">{s.orders}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${s.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(s)} className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-100 transition">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteId(s.id)} className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-black text-[#151515]">{editService ? "Edit Service" : "Add New Service"}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Service Name</label>
                <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Car Repair" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Category</label>
                  <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition">
                    <option>Repair</option>
                    <option>Maintenance</option>
                    <option>Replacement</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Price ($)</label>
                  <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="150" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Duration</label>
                  <input type="text" value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} placeholder="e.g. 1-2 hrs" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Status</label>
                  <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">Cancel</button>
              <button onClick={handleSave} className="flex-1 bg-[#e8b84b] text-black py-2.5 rounded-lg text-sm font-black hover:bg-yellow-400 transition flex items-center justify-center gap-2">
                <Check size={16} /> {editService ? "Update" : "Add Service"}
              </button>
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
            <h3 className="font-black text-[#151515] text-lg mb-2">Delete Service?</h3>
            <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 text-white py-2.5 rounded-lg text-sm font-black hover:bg-red-600 transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
