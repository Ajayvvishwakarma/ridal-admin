import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Eye, X, Check, BookOpen } from "lucide-react";

const SERVICE_IMG1 = "https://images.unsplash.com/photo-1771340742493-52fbd5476ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBvaWwlMjBjaGFuZ2UlMjBzZXJ2aWNlfGVufDF8fHx8MTc3Nzk1NTM2OXww&ixlib=rb-4.1.0&q=80&w=400";
const SERVICE_IMG3 = "https://images.unsplash.com/photo-1620707044570-c0dc1576bedd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pYyUyMHdvcmtpbmclMjBvbiUyMGNhciUyMHdoZWVsJTIwYWxpZ25tZW50fGVufDF8fHx8MTc3Nzk1NTQxN3ww&ixlib=rb-4.1.0&q=80&w=400";
const SERVICE_IMG4 = "https://images.unsplash.com/photo-1705720717198-9b18c35500bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBiYXR0ZXJ5JTIwcmVwbGFjZW1lbnQlMjBzZXJ2aWNlfGVufDF8fHx8MTc3Nzk1NTQxN3ww&ixlib=rb-4.1.0&q=80&w=400";

const initialPosts = [
  { id: 1, title: "10 Signs Your Car Needs an Oil Change Right Now", author: "John Smith", date: "May 5, 2026", category: "Maintenance", status: "Published", views: 1240, img: SERVICE_IMG1, excerpt: "Regular oil changes are essential to keep your engine running smoothly. Here are the key signs..." },
  { id: 2, title: "How to Tell When Your Brakes Need Replacing", author: "Mike Johnson", date: "Apr 20, 2026", category: "Safety", status: "Published", views: 987, img: SERVICE_IMG3, excerpt: "Your brakes are one of the most critical safety components. Learn the warning signs..." },
  { id: 3, title: "Battery Care Tips to Extend Your Car Battery Life", author: "Sarah Lee", date: "Apr 10, 2026", category: "Tips", status: "Published", views: 756, img: SERVICE_IMG4, excerpt: "A dead battery can leave you stranded. Follow these tips to extend the life of your battery..." },
  { id: 4, title: "The Importance of Wheel Alignment for Your Safety", author: "John Smith", date: "Mar 28, 2026", category: "Safety", status: "Draft", views: 0, img: SERVICE_IMG1, excerpt: "Proper wheel alignment improves handling, extends tire life, and keeps you safe on the road..." },
  { id: 5, title: "Understanding Your Car's Suspension System", author: "Mike Johnson", date: "Mar 15, 2026", category: "Education", status: "Draft", views: 0, img: SERVICE_IMG3, excerpt: "The suspension system is complex but vital to your driving comfort and safety..." },
];

type Post = typeof initialPosts[0];

export function AdminBlog() {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", author: "", category: "Maintenance", status: "Draft", excerpt: "" });

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.author.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditPost(null);
    setForm({ title: "", author: "", category: "Maintenance", status: "Draft", excerpt: "" });
    setShowModal(true);
  };

  const openEdit = (p: Post) => {
    setEditPost(p);
    setForm({ title: p.title, author: p.author, category: p.category, status: p.status, excerpt: p.excerpt });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title || !form.author) return;
    if (editPost) {
      setPosts(prev => prev.map(p => p.id === editPost.id ? { ...p, ...form } : p));
    } else {
      setPosts(prev => [...prev, {
        id: Date.now(), views: 0, img: SERVICE_IMG1,
        date: "May 5, 2026", ...form
      }]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-[#151515]">Blog Management</h2>
          <p className="text-gray-400 text-sm">Create and manage blog posts</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#e8b84b] text-black px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-yellow-400 transition">
          <Plus size={17} /> New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Posts", value: posts.length },
          { label: "Published", value: posts.filter(p => p.status === "Published").length },
          { label: "Drafts", value: posts.filter(p => p.status === "Draft").length },
          { label: "Total Views", value: posts.reduce((a, p) => a + p.views, 0).toLocaleString() },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-black text-[#151515]">{stat.value}</div>
            <div className="text-gray-400 text-xs font-semibold mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#e8b84b] w-full transition" />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition group">
              <div className="relative h-36 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 left-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.status === "Published" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>{p.status}</span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-[#e8b84b]/90 text-black text-xs px-2 py-0.5 rounded-full font-semibold">{p.category}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-black text-[#151515] mb-1.5 leading-snug line-clamp-2">{p.title}</h3>
                <p className="text-xs text-gray-400 mb-3 line-clamp-2">{p.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-gray-500">{p.author}</div>
                    <div className="text-xs text-gray-400">{p.date}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Eye size={12} /> {p.views.toLocaleString()}
                    </div>
                    <button onClick={() => openEdit(p)} className="w-7 h-7 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-100 transition">
                      <Pencil size={12} />
                    </button>
                    <button onClick={() => setDeleteId(p.id)} className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 py-16 text-center text-gray-400">
              <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No blog posts found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-black text-[#151515]">{editPost ? "Edit Post" : "New Blog Post"}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Post Title</label>
                <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Enter blog post title..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Author</label>
                  <input type="text" value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} placeholder="Author name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Category</label>
                  <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition">
                    {["Maintenance", "Safety", "Tips", "Education", "News"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Excerpt</label>
                <textarea rows={3} value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} placeholder="Short description..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition resize-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Status</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#e8b84b] transition">
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">Cancel</button>
              <button onClick={handleSave} className="flex-1 bg-[#e8b84b] text-black py-2.5 rounded-lg text-sm font-black hover:bg-yellow-400 transition flex items-center justify-center gap-2">
                <Check size={16} /> {editPost ? "Update Post" : "Create Post"}
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
            <h3 className="font-black text-[#151515] text-lg mb-2">Delete Post?</h3>
            <p className="text-gray-400 text-sm mb-6">This blog post will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">Cancel</button>
              <button onClick={() => { setPosts(prev => prev.filter(p => p.id !== deleteId)); setDeleteId(null); }} className="flex-1 bg-red-500 text-white py-2.5 rounded-lg text-sm font-black hover:bg-red-600 transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
