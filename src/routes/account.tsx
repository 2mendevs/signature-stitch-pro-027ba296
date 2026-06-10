import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { User, Package, Heart, MapPin, CreditCard, Sparkles, Settings, LogOut, Trash2, Plus } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useStore, type Address } from "@/lib/store";
import { products } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — 2MENDEVS" }] }),
  component: AccountPage,
});

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "payments", label: "Payment Methods", icon: CreditCard },
  { id: "designs", label: "Saved Designs", icon: Sparkles },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

function AccountPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("profile");
  const { orders, wishlist, addresses, designs, addAddress, removeAddress, setDefaultAddress, removeDesign, addToCart, toggleWishlist } = useStore();
  const [profile, setProfile] = useState({ name: "Alex Singh", email: "alex@2mendevs.com", phone: "+91 98765 43210" });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="container-x py-10">
        <p className="eyebrow mb-2">Welcome back</p>
        <h1 className="headline-lg mb-8">{profile.name}</h1>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className="bg-sand rounded-2xl p-3 h-fit">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left ${tab === t.id ? "bg-ink text-primary-foreground" : "hover:bg-background"}`}>
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
            <button onClick={() => toast("Signed out")} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left hover:bg-background mt-2 border-t border-border pt-4">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </aside>

          <div className="bg-background border border-border rounded-2xl p-6 md:p-8 min-h-[400px]">
            {tab === "profile" && (
              <>
                <h2 className="text-xl font-extrabold uppercase mb-6">Profile</h2>
                <div className="grid md:grid-cols-2 gap-4 max-w-xl">
                  <Field label="Full Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
                  <Field label="Email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} />
                  <Field label="Phone" value={profile.phone} onChange={(v) => setProfile({ ...profile, phone: v })} />
                </div>
                <button onClick={() => toast.success("Profile updated")} className="btn-primary mt-6">Save Changes</button>
              </>
            )}

            {tab === "orders" && (
              <>
                <h2 className="text-xl font-extrabold uppercase mb-6">Order History</h2>
                {orders.length === 0 ? (
                  <Empty msg="No orders yet" cta={{ label: "Shop Now", to: "/shop" }} />
                ) : (
                  <div className="space-y-3">
                    {orders.map((o) => (
                      <Link key={o.id} to="/order/$id" params={{ id: o.id }} className="flex justify-between items-center p-4 border border-border rounded-xl hover:bg-sand">
                        <div>
                          <p className="text-sm font-bold">{o.id}</p>
                          <p className="text-xs text-muted-foreground">{new Date(o.placedAt).toLocaleDateString()} · {o.items.length} items · {o.status}</p>
                        </div>
                        <p className="text-sm font-bold">₹{o.total.toLocaleString()}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}

            {tab === "wishlist" && (
              <>
                <h2 className="text-xl font-extrabold uppercase mb-6">Wishlist</h2>
                {wishlist.length === 0 ? (
                  <Empty msg="No saved items" cta={{ label: "Browse Products", to: "/shop" }} />
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {products.filter((p) => wishlist.includes(p.slug)).map((p) => (
                      <div key={p.slug} className="space-y-2">
                        <img src={p.image} alt={p.name} className="aspect-[4/5] w-full object-cover rounded-xl bg-sand" />
                        <p className="text-xs font-semibold">{p.name}</p>
                        <p className="text-xs font-bold">₹{p.price.toLocaleString()}</p>
                        <div className="flex gap-1">
                          <button onClick={() => { addToCart({ slug: p.slug, name: p.name, image: p.image, price: p.price, size: p.sizes[0], color: p.colors[0], qty: 1 }); toast.success("Added to cart"); }} className="flex-1 bg-ink text-primary-foreground text-[10px] py-1.5 rounded-full font-bold">Add to Cart</button>
                          <button onClick={() => toggleWishlist(p.slug)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {tab === "addresses" && <AddressesTab addresses={addresses} addAddress={addAddress} removeAddress={removeAddress} setDefaultAddress={setDefaultAddress} />}

            {tab === "payments" && (
              <>
                <h2 className="text-xl font-extrabold uppercase mb-6">Saved Payment Methods</h2>
                <div className="space-y-3 max-w-xl">
                  <div className="border border-border rounded-xl p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5" />
                      <div>
                        <p className="text-sm font-semibold">Visa ending 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/28</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-ink text-primary-foreground px-2 py-0.5 rounded-full">Default</span>
                  </div>
                  <button className="w-full border border-dashed border-border rounded-xl py-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-sand"><Plus className="w-4 h-4" /> Add Payment Method</button>
                </div>
              </>
            )}

            {tab === "designs" && (
              <>
                <h2 className="text-xl font-extrabold uppercase mb-6">Saved Custom Designs</h2>
                {designs.length === 0 ? (
                  <Empty msg="No saved designs yet" cta={{ label: "Open Customization Studio", to: "/customize" }} />
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {designs.map((d) => (
                      <div key={d.id} className="border border-border rounded-xl p-4 space-y-2">
                        <div className="aspect-[4/5] rounded-lg flex items-center justify-center text-center text-xs font-bold" style={{ background: d.color, color: d.textColor ?? "#fff" }}>
                          {d.text || d.symbol || "Custom"}
                        </div>
                        <p className="text-xs font-bold">{d.name}</p>
                        <p className="text-[11px] text-muted-foreground">{d.productType} · {d.material}</p>
                        <p className="text-sm font-bold">₹{d.price.toLocaleString()}</p>
                        <div className="flex gap-1">
                          <button onClick={() => { addToCart({ slug: "custom-" + d.id, name: d.name, image: "", price: d.price, size: "M", color: d.color, qty: 1, custom: d }); toast.success("Added to cart"); }} className="flex-1 bg-ink text-primary-foreground text-[10px] py-1.5 rounded-full font-bold">Add to Cart</button>
                          <button onClick={() => removeDesign(d.id)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {tab === "settings" && (
              <>
                <h2 className="text-xl font-extrabold uppercase mb-6">Account Settings</h2>
                <div className="space-y-3 max-w-xl text-sm">
                  <label className="flex justify-between items-center p-4 border border-border rounded-xl">Email notifications<input type="checkbox" defaultChecked className="accent-ink" /></label>
                  <label className="flex justify-between items-center p-4 border border-border rounded-xl">SMS notifications<input type="checkbox" defaultChecked className="accent-ink" /></label>
                  <label className="flex justify-between items-center p-4 border border-border rounded-xl">Marketing emails<input type="checkbox" className="accent-ink" /></label>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function AddressesTab({ addresses, addAddress, removeAddress, setDefaultAddress }: { addresses: Address[]; addAddress: (a: Omit<Address, "id">) => Address; removeAddress: (id: string) => void; setDefaultAddress: (id: string) => void }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState<Omit<Address, "id">>({ fullName: "", mobile: "", email: "", line1: "", city: "", state: "", country: "India", pincode: "" });
  return (
    <>
      <h2 className="text-xl font-extrabold uppercase mb-6">Saved Addresses</h2>
      <div className="space-y-3 max-w-2xl">
        {addresses.map((a) => (
          <div key={a.id} className="border border-border rounded-xl p-4 flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold">{a.fullName} {a.isDefault && <span className="ml-2 text-[10px] bg-ink text-primary-foreground px-2 py-0.5 rounded-full">Default</span>}</p>
              <p className="text-xs text-muted-foreground mt-1">{a.line1}, {a.city}, {a.state} {a.pincode}</p>
              <p className="text-xs text-muted-foreground">📞 {a.mobile}</p>
            </div>
            <div className="flex gap-2 text-[11px]">
              {!a.isDefault && <button onClick={() => setDefaultAddress(a.id)} className="underline">Default</button>}
              <button onClick={() => removeAddress(a.id)} className="underline text-red-600">Delete</button>
            </div>
          </div>
        ))}
        {show ? (
          <div className="border border-border rounded-xl p-4 space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Full Name" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} />
              <Field label="Mobile" value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} />
            </div>
            <Field label="Address" value={form.line1} onChange={(v) => setForm({ ...form, line1: v })} />
            <div className="grid md:grid-cols-3 gap-3">
              <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
              <Field label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} />
              <Field label="Pincode" value={form.pincode} onChange={(v) => setForm({ ...form, pincode: v })} />
            </div>
            <div className="flex gap-2">
              <button onClick={() => { if (!form.fullName || !form.mobile || !form.line1) { toast.error("Fill required fields"); return; } addAddress(form); setShow(false); setForm({ fullName: "", mobile: "", email: "", line1: "", city: "", state: "", country: "India", pincode: "" }); toast.success("Address saved"); }} className="btn-primary">Save</button>
              <button onClick={() => setShow(false)} className="btn-outline">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShow(true)} className="w-full border border-dashed border-border rounded-xl py-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-sand"><Plus className="w-4 h-4" /> Add New Address</button>
        )}
      </div>
    </>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full px-3 py-2.5 rounded-lg border border-border text-sm bg-background" />
    </label>
  );
}

function Empty({ msg, cta }: { msg: string; cta: { label: string; to: string } }) {
  return (
    <div className="text-center py-12">
      <p className="text-sm text-muted-foreground mb-4">{msg}</p>
      <Link to={cta.to as any} className="btn-primary">{cta.label}</Link>
    </div>
  );
}
