import { useEffect, useState } from "react";
import {
  LayoutDashboard, Package, LogOut, RefreshCw,
  MessageSquare, Users, Truck, DollarSign, ClipboardList, X, Mail, Lock,
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { supabase } from "@/lib/supabase";

// ---------- Types ----------
type OrderRow = {
  id: string;
  order_number: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  address: string;
  city: string;
  state: string;
  zip: string;
  payment_method: string;
  payment_status: string;
  status: string;
  items: { name: string; price: number; quantity: number }[];
  subtotal: number;
  total: number;
  tracking_number: string | null;
  notes: string | null;
  created_at: string;
};

type ContactRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
};

type SubscriberRow = { id: string; email: string; created_at: string };

type SupplierRow = {
  id: string;
  supplier: string;
  description: string | null;
  amount: number;
  due_date: string | null;
  paid: boolean;
  paid_at: string | null;
};

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  low_stock_threshold: number;
  active: boolean;
};

// ---------- Status config ----------
const ORDER_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "payment_pending", label: "Payment Pending" },
  { value: "paid", label: "Paid" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-[#f3f1ee] text-[#555555] border-[#e0ddd8]",
  payment_pending: "bg-amber-50 text-amber-700 border-amber-200",
  paid: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-indigo-50 text-indigo-700 border-indigo-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);

// ---------- Login ----------
function LoginForm() {
  const { signIn } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: err } = await signIn(email, password);
    if (err) setError(err);
    setBusy(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white border border-[#e0ddd8] rounded-[0.75rem] p-8">
        <div className="size-12 rounded-[0.5rem] bg-[#0A182E] flex items-center justify-center mb-6">
          <Lock className="size-5 text-white" />
        </div>
        <h1 className="text-h3 text-[#0A182E] mb-1">Admin Access</h1>
        <p className="text-body-sm text-[#888888] mb-6">Sign in with your admin account.</p>
        <div className="space-y-4">
          <div>
            <label className="text-body-sm font-medium text-[#0A182E] block mb-1.5">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full h-11 px-4 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#0A182E] focus:outline-none focus:border-[#0084FF]"
              placeholder="admin@vernyq.com" />
          </div>
          <div>
            <label className="text-body-sm font-medium text-[#0A182E] block mb-1.5">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full h-11 px-4 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#0A182E] focus:outline-none focus:border-[#0084FF]"
              placeholder="••••••••" />
          </div>
          {error && <p className="text-body-sm text-red-600">{error}</p>}
          <button type="submit" disabled={busy}
            className="w-full h-11 bg-[#0A182E] text-white text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors disabled:opacity-50">
            {busy ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ---------- Orders section ----------
function OrdersSection() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders((data as unknown as OrderRow[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateOrder = async (id: string, patch: Partial<OrderRow>) => {
    await supabase.from("orders").update(patch).eq("id", id);
    load();
  };

  if (loading) return <p className="text-body-sm text-[#888888]">Loading orders...</p>;
  if (orders.length === 0) return <p className="text-body-sm text-[#888888]">No orders yet. Orders placed at checkout appear here.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-body-sm text-[#888888]">{orders.length} order{orders.length !== 1 ? "s" : ""}</p>
        <button onClick={load} className="flex items-center gap-1.5 text-body-sm text-[#0084FF] hover:text-[#3399FF]">
          <RefreshCw className="size-3.5" /> Refresh
        </button>
      </div>
      <div className="space-y-3">
        {orders.map(o => (
          <div key={o.id} className="border border-[#e0ddd8] rounded-[0.5rem] bg-white overflow-hidden">
            <button onClick={() => setExpanded(expanded === o.id ? null : o.id)}
              className="w-full flex flex-wrap items-center gap-x-4 gap-y-2 p-4 text-left hover:bg-[#faf9f7] transition-colors">
              <span className="font-mono text-body-sm font-medium text-[#0A182E]">{o.order_number}</span>
              <span className="text-body-sm text-[#555555]">{o.first_name} {o.last_name}</span>
              <span className="text-body-sm font-medium text-[#0A182E] ml-auto">{fmt(Number(o.total))}</span>
              <span className={`px-2.5 py-1 rounded-full border text-caption font-medium ${STATUS_STYLES[o.status] || STATUS_STYLES.pending}`}>
                {ORDER_STATUSES.find(s => s.value === o.status)?.label || o.status}
              </span>
              <span className="text-caption text-[#888888]">{new Date(o.created_at).toLocaleDateString()}</span>
            </button>
            {expanded === o.id && (
              <div className="border-t border-[#e0ddd8] p-5 bg-[#faf9f7] space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <p className="text-overline text-[#888888] mb-2">Customer</p>
                    <p className="text-body-sm text-[#0A182E]">{o.first_name} {o.last_name}</p>
                    <p className="text-body-sm text-[#555555]">{o.email}</p>
                    {o.phone && <p className="text-body-sm text-[#555555]">{o.phone}</p>}
                  </div>
                  <div>
                    <p className="text-overline text-[#888888] mb-2">Ship To</p>
                    <p className="text-body-sm text-[#555555]">{o.address}</p>
                    <p className="text-body-sm text-[#555555]">{o.city}, {o.state} {o.zip}</p>
                  </div>
                </div>
                <div>
                  <p className="text-overline text-[#888888] mb-2">Items</p>
                  {o.items.map((it, i) => (
                    <div key={i} className="flex justify-between text-body-sm text-[#555555]">
                      <span>{it.quantity}× {it.name}</span><span>{fmt(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-caption font-medium text-[#0A182E] block mb-1.5">Order Status</label>
                    <select value={o.status} onChange={e => updateOrder(o.id, { status: e.target.value })}
                      className="w-full h-10 px-3 bg-white border border-[#e0ddd8] rounded-[0.375rem] text-body-sm text-[#0A182E] focus:outline-none focus:border-[#0084FF]">
                      {ORDER_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-caption font-medium text-[#0A182E] block mb-1.5">Tracking Number</label>
                    <input defaultValue={o.tracking_number || ""} placeholder="Add tracking #"
                      onBlur={e => { if (e.target.value !== (o.tracking_number || "")) updateOrder(o.id, { tracking_number: e.target.value || null }); }}
                      className="w-full h-10 px-3 bg-white border border-[#e0ddd8] rounded-[0.375rem] text-body-sm text-[#0A182E] focus:outline-none focus:border-[#0084FF]" />
                  </div>
                </div>
                <div>
                  <label className="text-caption font-medium text-[#0A182E] block mb-1.5">Payment Verification</label>
                  {o.payment_status === "paid" ? (
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-full border text-caption font-medium bg-green-50 text-green-700 border-green-200">Payment verified</span>
                      <button onClick={() => updateOrder(o.id, { payment_status: "pending", status: o.status === "paid" ? "payment_pending" : o.status })}
                        className="text-caption text-[#888888] underline hover:text-[#0A182E]">Undo</button>
                    </div>
                  ) : (
                    <button onClick={() => updateOrder(o.id, { payment_status: "paid", status: o.status === "pending" || o.status === "payment_pending" ? "paid" : o.status })}
                      className="h-9 px-4 bg-[#0A182E] text-white text-caption font-medium rounded-[0.375rem] hover:bg-[#0A182E]/90">
                      Mark Payment as Verified
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Products section ----------
function ProductsSection() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("name");
    setProducts((data as unknown as ProductRow[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateProduct = async (id: string, patch: Partial<ProductRow>) => {
    await supabase.from("products").update(patch).eq("id", id);
    load();
  };

  if (loading) return <p className="text-body-sm text-[#888888]">Loading products...</p>;

  return (
    <div>
      <p className="text-body-sm text-[#888888] mb-4">Stock, pricing, and availability. Changes go live on the site immediately.</p>
      <div className="space-y-3">
        {products.map(p => (
          <div key={p.id} className="border border-[#e0ddd8] rounded-[0.5rem] bg-white p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[180px]">
                <p className="text-body-sm font-medium text-[#0A182E]">{p.name}</p>
                <p className="text-caption text-[#888888]">{p.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-caption text-[#888888]">Price</span>
                <input type="number" defaultValue={Number(p.price)} step="0.01" min="0"
                  onBlur={e => { const v = parseFloat(e.target.value); if (v && v !== Number(p.price)) updateProduct(p.id, { price: v }); }}
                  className="w-24 h-9 px-3 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.375rem] text-body-sm text-[#0A182E] focus:outline-none focus:border-[#0084FF]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-caption text-[#888888]">Stock</span>
                <input type="number" defaultValue={p.stock} min="0"
                  onBlur={e => { const v = parseInt(e.target.value); if (!isNaN(v) && v !== p.stock) updateProduct(p.id, { stock: v }); }}
                  className={`w-20 h-9 px-3 border rounded-[0.375rem] text-body-sm focus:outline-none focus:border-[#0084FF] ${p.stock <= p.low_stock_threshold ? "border-amber-300 bg-amber-50 text-amber-700" : "bg-[#faf9f7] border-[#e0ddd8] text-[#0A182E]"}`} />
                {p.stock <= p.low_stock_threshold && <span className="text-caption text-amber-600">Low</span>}
              </div>
              <button onClick={() => updateProduct(p.id, { active: !p.active })}
                className={`h-9 px-4 rounded-[0.375rem] text-caption font-medium border transition-colors ${p.active ? "bg-green-50 text-green-700 border-green-200" : "bg-[#f3f1ee] text-[#888888] border-[#e0ddd8]"}`}>
                {p.active ? "Active" : "Hidden"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Suppliers section ----------
function SuppliersSection() {
  const [rows, setRows] = useState<SupplierRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ supplier: "", description: "", amount: "", due_date: "" });

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("supplier_payments").select("*").order("paid", { ascending: true }).order("due_date", { ascending: true });
    setRows((data as unknown as SupplierRow[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const togglePaid = async (r: SupplierRow) => {
    await supabase.from("supplier_payments").update({ paid: !r.paid, paid_at: !r.paid ? new Date().toISOString() : null }).eq("id", r.id);
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("supplier_payments").delete().eq("id", id);
    load();
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.supplier || !form.amount) return;
    await supabase.from("supplier_payments").insert({
      supplier: form.supplier,
      description: form.description || null,
      amount: parseFloat(form.amount),
      due_date: form.due_date || null,
    });
    setForm({ supplier: "", description: "", amount: "", due_date: "" });
    load();
  };

  const outstanding = rows.filter(r => !r.paid).reduce((s, r) => s + Number(r.amount), 0);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <p className="text-body-sm text-[#888888]">{rows.filter(r => !r.paid).length} outstanding</p>
        <p className="text-body-sm font-medium text-[#0A182E] ml-auto">Owed: {fmt(outstanding)}</p>
      </div>
      <form onSubmit={add} className="flex flex-wrap gap-3 mb-6 bg-white border border-[#e0ddd8] rounded-[0.5rem] p-4">
        <input required placeholder="Supplier" value={form.supplier} onChange={e => setForm({ ...form, supplier: e.target.value })}
          className="flex-1 min-w-[140px] h-10 px-3 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.375rem] text-body-sm text-[#0A182E] focus:outline-none focus:border-[#0084FF]" />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
          className="flex-1 min-w-[140px] h-10 px-3 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.375rem] text-body-sm text-[#0A182E] focus:outline-none focus:border-[#0084FF]" />
        <input required type="number" step="0.01" min="0" placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })}
          className="w-28 h-10 px-3 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.375rem] text-body-sm text-[#0A182E] focus:outline-none focus:border-[#0084FF]" />
        <input type="date" value={form.due_date} onChange={e => setForm({ ...form, due_date: e.target.value })}
          className="h-10 px-3 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.375rem] text-body-sm text-[#0A182E] focus:outline-none focus:border-[#0084FF]" />
        <button type="submit" className="h-10 px-5 bg-[#0A182E] text-white text-caption font-medium rounded-[0.375rem] hover:bg-[#0A182E]/90">Add</button>
      </form>
      {loading ? <p className="text-body-sm text-[#888888]">Loading...</p> : rows.length === 0 ? (
        <p className="text-body-sm text-[#888888]">No supplier payments tracked yet.</p>
      ) : (
        <div className="space-y-2">
          {rows.map(r => (
            <div key={r.id} className="flex flex-wrap items-center gap-3 border border-[#e0ddd8] rounded-[0.5rem] bg-white p-4">
              <button onClick={() => togglePaid(r)}
                className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${r.paid ? "bg-[#4a8a5c] border-[#4a8a5c]" : "border-[#ccc] hover:border-[#0A182E]"}`}>
                {r.paid && <span className="text-white text-caption leading-none">✓</span>}
              </button>
              <div className="flex-1 min-w-[160px]">
                <p className="text-body-sm font-medium text-[#0A182E]">{r.supplier}</p>
                {r.description && <p className="text-caption text-[#888888]">{r.description}</p>}
              </div>
              {r.due_date && <span className="text-caption text-[#888888]">Due {new Date(r.due_date + "T00:00:00").toLocaleDateString()}</span>}
              <span className={`text-body-sm font-medium ${r.paid ? "text-[#4a8a5c] line-through" : "text-[#0A182E]"}`}>{fmt(Number(r.amount))}</span>
              <button onClick={() => remove(r.id)} className="text-[#888888] hover:text-red-600 p-1" aria-label="Delete"><X className="size-4" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Inbox (contact) ----------
function InboxSection() {
  const [msgs, setMsgs] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setMsgs((data as unknown as ContactRow[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (m: ContactRow) => {
    if (!m.read) await supabase.from("contact_messages").update({ read: true }).eq("id", m.id);
  };

  if (loading) return <p className="text-body-sm text-[#888888]">Loading messages...</p>;
  if (msgs.length === 0) return <p className="text-body-sm text-[#888888]">No messages yet.</p>;

  return (
    <div className="space-y-3">
      {msgs.map(m => (
        <div key={m.id} onFocus={() => markRead(m)} onMouseEnter={() => markRead(m)}
          className={`border rounded-[0.5rem] p-4 ${m.read ? "border-[#e0ddd8] bg-white" : "border-[#0084FF]/40 bg-[#0084FF]/5"}`}>
          <div className="flex items-center gap-3 mb-2">
            <Mail className="size-4 text-[#0084FF]" />
            <p className="text-body-sm font-medium text-[#0A182E]">{m.name}</p>
            <a href={`mailto:${m.email}`} className="text-caption text-[#0084FF] hover:underline">{m.email}</a>
            <span className="text-caption text-[#888888] ml-auto">{new Date(m.created_at).toLocaleDateString()}</span>
          </div>
          <p className="text-body-sm text-[#555555] whitespace-pre-wrap">{m.message}</p>
        </div>
      ))}
    </div>
  );
}

// ---------- Subscribers ----------
function SubscribersSection() {
  const [subs, setSubs] = useState<SubscriberRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setSubs((data as unknown as SubscriberRow[]) || []);
      setLoading(false);
    });
  }, []);

  const exportCsv = () => {
    const csv = "email,subscribed_at\n" + subs.map(s => `${s.email},${s.created_at}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "vernyq-subscribers.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <p className="text-body-sm text-[#888888]">Loading subscribers...</p>;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-body-sm text-[#888888]">{subs.length} subscriber{subs.length !== 1 ? "s" : ""}</p>
        {subs.length > 0 && (
          <button onClick={exportCsv} className="text-body-sm text-[#0084FF] hover:text-[#3399FF]">Export CSV</button>
        )}
      </div>
      {subs.length === 0 ? <p className="text-body-sm text-[#888888]">No subscribers yet.</p> : (
        <div className="border border-[#e0ddd8] rounded-[0.5rem] bg-white divide-y divide-[#e0ddd8]">
          {subs.map(s => (
            <div key={s.id} className="flex items-center gap-3 p-3 px-4">
              <p className="text-body-sm text-[#0A182E] flex-1">{s.email}</p>
              <p className="text-caption text-[#888888]">{new Date(s.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Overview ----------
function OverviewSection({ orders, products }: { orders: OrderRow[]; products: ProductRow[] }) {
  const revenue = orders.filter(o => o.payment_status === "paid").reduce((s, o) => s + Number(o.total), 0);
  const pendingPay = orders.filter(o => o.payment_status !== "paid" && o.status !== "cancelled").length;
  const toFulfill = orders.filter(o => o.payment_status === "paid" && !["delivered", "cancelled"].includes(o.status)).length;
  const lowStock = products.filter(p => p.stock <= p.low_stock_threshold);

  const stats = [
    { label: "Verified Revenue", value: fmt(revenue), icon: DollarSign, color: "text-[#4a8a5c]" },
    { label: "Awaiting Payment", value: String(pendingPay), icon: ClipboardList, color: "text-amber-600" },
    { label: "To Fulfill", value: String(toFulfill), icon: Truck, color: "text-[#0084FF]" },
    { label: "Low Stock", value: String(lowStock.length), icon: Package, color: "text-red-600" },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-[#e0ddd8] rounded-[0.5rem] p-5">
            <s.icon className={`size-5 ${s.color} mb-3`} />
            <p className="text-h3 text-[#0A182E]">{s.value}</p>
            <p className="text-caption text-[#888888] mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="text-overline text-[#888888] mb-3">Recent Orders</p>
        {orders.length === 0 ? <p className="text-body-sm text-[#888888]">No orders yet.</p> : (
          <div className="space-y-2">
            {orders.slice(0, 5).map(o => (
              <div key={o.id} className="flex flex-wrap items-center gap-3 bg-white border border-[#e0ddd8] rounded-[0.5rem] p-3 px-4">
                <span className="font-mono text-body-sm text-[#0A182E]">{o.order_number}</span>
                <span className="text-body-sm text-[#555555]">{o.first_name} {o.last_name}</span>
                <span className={`ml-auto px-2.5 py-1 rounded-full border text-caption font-medium ${STATUS_STYLES[o.status] || STATUS_STYLES.pending}`}>
                  {ORDER_STATUSES.find(s => s.value === o.status)?.label || o.status}
                </span>
                <span className="text-body-sm font-medium text-[#0A182E] w-20 text-right">{fmt(Number(o.total))}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Main dashboard ----------
type Section = "overview" | "orders" | "products" | "suppliers" | "inbox" | "subscribers";

const NAV: { key: Section; label: string; icon: typeof Package }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "orders", label: "Orders", icon: ClipboardList },
  { key: "products", label: "Products & Stock", icon: Package },
  { key: "suppliers", label: "Supplier Payments", icon: DollarSign },
  { key: "inbox", label: "Inbox", icon: MessageSquare },
  { key: "subscribers", label: "Subscribers", icon: Users },
];

export default function AdminPage() {
  const { session, loading: authLoading, signOut } = useAdminAuth();
  const [section, setSection] = useState<Section>("overview");
  const [allOrders, setAllOrders] = useState<OrderRow[]>([]);
  const [allProducts, setAllProducts] = useState<ProductRow[]>([]);

  useEffect(() => {
    if (!session) return;
    supabase.from("orders").select("*").order("created_at", { ascending: false }).then(({ data }) => setAllOrders((data as unknown as OrderRow[]) || []));
    supabase.from("products").select("*").then(({ data }) => setAllProducts((data as unknown as ProductRow[]) || []));
  }, [session, section]);

  if (authLoading) {
    return <div className="max-w-[1400px] mx-auto px-4 py-32 text-center text-body-sm text-[#888888]">Checking session...</div>;
  }

  if (!session) return <LoginForm />;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div>
          <p className="text-overline text-[#0084FF]">VERNYQ Admin</p>
          <h1 className="text-h2 text-[#0A182E]">Dashboard</h1>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-caption text-[#888888] hidden sm:block">{session.user.email}</span>
          <button onClick={signOut} className="flex items-center gap-2 h-9 px-4 border border-[#e0ddd8] rounded-[0.375rem] text-caption font-medium text-[#555555] hover:border-[#0A182E] hover:text-[#0A182E] transition-colors">
            <LogOut className="size-3.5" /> Sign Out
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {NAV.map(n => (
            <button key={n.key} onClick={() => setSection(n.key)}
              className={`flex items-center gap-2.5 h-10 px-4 rounded-[0.375rem] text-body-sm font-medium whitespace-nowrap transition-colors ${
                section === n.key ? "bg-[#0A182E] text-white" : "text-[#555555] hover:bg-[#f3f1ee]"
              }`}>
              <n.icon className="size-4" /> {n.label}
            </button>
          ))}
        </nav>

        <div className="min-w-0">
          {section === "overview" && <OverviewSection orders={allOrders} products={allProducts} />}
          {section === "orders" && <OrdersSection />}
          {section === "products" && <ProductsSection />}
          {section === "suppliers" && <SuppliersSection />}
          {section === "inbox" && <InboxSection />}
          {section === "subscribers" && <SubscribersSection />}
        </div>
      </div>
    </div>
  );
}
