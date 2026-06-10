import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ArrowRight, Plus, Truck, Zap, Rocket, CreditCard, Smartphone, Banknote, Building2, Loader2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useStore, cartSubtotal, type Address } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — 2MENDEVS" }] }),
  component: CheckoutPage,
});

const steps = ["Cart", "Address", "Shipping", "Payment"];

const shippingOptions = [
  { id: "standard", name: "Standard Shipping", days: "5-7 days", price: 0, icon: Truck },
  { id: "express", name: "Express Shipping", days: "2-3 days", price: 149, icon: Zap },
  { id: "priority", name: "Priority Shipping", days: "1-2 days", price: 299, icon: Rocket },
];

const paymentMethods = [
  { id: "upi", label: "UPI", icon: Smartphone, sub: "GPay, PhonePe, Paytm" },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, sub: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net Banking", icon: Building2, sub: "All major banks" },
  { id: "cod", label: "Cash on Delivery", icon: Banknote, sub: "Pay when you receive" },
];

function CheckoutPage() {
  const { cart, addresses, addAddress, removeAddress, setDefaultAddress, placeOrder } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [addrId, setAddrId] = useState<string | null>(addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id ?? null);
  const [shipping, setShipping] = useState(shippingOptions[0]);
  const [payment, setPayment] = useState(paymentMethods[0]);
  const [showAddrForm, setShowAddrForm] = useState(addresses.length === 0);
  const [processing, setProcessing] = useState(false);

  const subtotal = cartSubtotal(cart);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping.price + tax;

  const [form, setForm] = useState<Omit<Address, "id">>({
    fullName: "", mobile: "", email: "", line1: "", line2: "", landmark: "", city: "", state: "", country: "India", pincode: "", isDefault: true,
  });

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <section className="container-x py-20 text-center">
          <h1 className="text-2xl font-extrabold mb-3">Your cart is empty</h1>
          <Link to="/shop" className="btn-primary">Shop Now</Link>
        </section>
        <Footer />
      </div>
    );
  }

  const saveAddress = () => {
    if (!form.fullName || !form.mobile || !form.line1 || !form.city || !form.state || !form.pincode) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!/^\d{10}$/.test(form.mobile)) { toast.error("Enter a valid 10-digit mobile"); return; }
    if (!/^\d{6}$/.test(form.pincode)) { toast.error("Enter a valid 6-digit pincode"); return; }
    const a = addAddress(form);
    setAddrId(a.id);
    setShowAddrForm(false);
    toast.success("Address saved");
  };

  const handlePay = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1400));
    const address = addresses.find((a) => a.id === addrId)!;
    const eta = new Date(Date.now() + (shipping.id === "priority" ? 2 : shipping.id === "express" ? 3 : 7) * 86400000);
    const order = placeOrder({
      items: cart, subtotal, shipping: shipping.price, tax, total,
      address, paymentMethod: payment.label, shippingMethod: shipping.name,
      estimatedDelivery: eta.toISOString(),
    });
    setProcessing(false);
    toast.success("Order placed!");
    navigate({ to: "/order/$id", params: { id: order.id } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <section className="container-x py-10">
        <div className="flex items-center justify-center gap-2 md:gap-6 mb-10 flex-wrap">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i + 1 <= step ? "bg-ink text-primary-foreground" : "bg-sand"}`}>
                {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wider ${i + 1 <= step ? "text-ink" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <span className="w-6 md:w-12 h-px bg-border" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="bg-background rounded-2xl border border-border p-6 md:p-8 space-y-6">
            {step === 1 && (
              <>
                <h2 className="text-xl font-extrabold uppercase">Review Cart</h2>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center border-b border-border pb-3">
                      <img src={item.image} alt={item.name} className="w-16 h-20 rounded-lg object-cover bg-sand" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Size {item.size} · Qty {item.qty}</p>
                      </div>
                      <p className="text-sm font-bold">₹{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="btn-primary">Continue to Address <ArrowRight className="w-4 h-4" /></button>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-extrabold uppercase">Shipping Address</h2>
                {addresses.length > 0 && (
                  <div className="space-y-3">
                    {addresses.map((a) => (
                      <label key={a.id} className={`block border rounded-xl p-4 cursor-pointer ${addrId === a.id ? "border-ink bg-sand" : "border-border"}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <input type="radio" checked={addrId === a.id} onChange={() => setAddrId(a.id)} className="mr-2 accent-ink" />
                            <span className="font-semibold text-sm">{a.fullName}</span>
                            {a.isDefault && <span className="ml-2 text-[10px] bg-ink text-primary-foreground px-2 py-0.5 rounded-full">Default</span>}
                            <p className="text-xs text-muted-foreground mt-1 ml-5">{a.line1}{a.line2 ? `, ${a.line2}` : ""}, {a.city}, {a.state} {a.pincode}</p>
                            <p className="text-xs text-muted-foreground ml-5">📞 {a.mobile}</p>
                          </div>
                          <div className="flex gap-2 text-[11px]">
                            {!a.isDefault && <button onClick={(e) => { e.preventDefault(); setDefaultAddress(a.id); }} className="underline">Set default</button>}
                            <button onClick={(e) => { e.preventDefault(); removeAddress(a.id); }} className="underline text-red-600">Delete</button>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
                {showAddrForm ? (
                  <div className="border border-border rounded-xl p-4 space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input label="Full Name *" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} />
                      <Input label="Mobile Number *" value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} />
                      <Input label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                      <Input label="Pincode *" value={form.pincode} onChange={(v) => setForm({ ...form, pincode: v })} />
                    </div>
                    <Input label="Address Line 1 *" value={form.line1} onChange={(v) => setForm({ ...form, line1: v })} />
                    <Input label="Address Line 2" value={form.line2 || ""} onChange={(v) => setForm({ ...form, line2: v })} />
                    <div className="grid md:grid-cols-3 gap-3">
                      <Input label="Landmark" value={form.landmark || ""} onChange={(v) => setForm({ ...form, landmark: v })} />
                      <Input label="City *" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
                      <Input label="State *" value={form.state} onChange={(v) => setForm({ ...form, state: v })} />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={saveAddress} className="btn-primary">Save Address</button>
                      {addresses.length > 0 && <button onClick={() => setShowAddrForm(false)} className="btn-outline">Cancel</button>}
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowAddrForm(true)} className="border border-dashed border-border rounded-xl py-4 w-full flex items-center justify-center gap-2 text-sm font-semibold hover:bg-sand"><Plus className="w-4 h-4" /> Add New Address</button>
                )}
                <div className="flex gap-2">
                  <button onClick={() => setStep(1)} className="btn-outline">Back</button>
                  <button onClick={() => addrId ? setStep(3) : toast.error("Add an address first")} className="btn-primary">Continue <ArrowRight className="w-4 h-4" /></button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl font-extrabold uppercase">Shipping Method</h2>
                <div className="space-y-3">
                  {shippingOptions.map((opt) => (
                    <label key={opt.id} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer ${shipping.id === opt.id ? "border-ink bg-sand" : "border-border"}`}>
                      <input type="radio" checked={shipping.id === opt.id} onChange={() => setShipping(opt)} className="accent-ink" />
                      <opt.icon className="w-5 h-5" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{opt.name}</p>
                        <p className="text-xs text-muted-foreground">Arrives in {opt.days}</p>
                      </div>
                      <span className="font-bold text-sm">{opt.price === 0 ? "FREE" : `₹${opt.price}`}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setStep(2)} className="btn-outline">Back</button>
                  <button onClick={() => setStep(4)} className="btn-primary">Continue to Payment <ArrowRight className="w-4 h-4" /></button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="text-xl font-extrabold uppercase">Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map((m) => (
                    <label key={m.id} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer ${payment.id === m.id ? "border-ink bg-sand" : "border-border"}`}>
                      <input type="radio" checked={payment.id === m.id} onChange={() => setPayment(m)} className="accent-ink" />
                      <m.icon className="w-5 h-5" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{m.label}</p>
                        <p className="text-xs text-muted-foreground">{m.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="bg-sand rounded-xl p-4 text-xs text-muted-foreground flex items-center gap-2">
                  🔒 Your payment is encrypted and secure.
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setStep(3)} className="btn-outline" disabled={processing}>Back</button>
                  <button onClick={handlePay} disabled={processing} className="btn-primary">
                    {processing ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</> : <>Pay ₹{total.toLocaleString()} <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </div>
              </>
            )}
          </div>

          <aside className="bg-sand rounded-2xl p-6 h-fit space-y-4">
            <h3 className="font-extrabold uppercase">Summary</h3>
            <div className="space-y-2 text-sm">
              <Row k="Subtotal" v={`₹${subtotal.toLocaleString()}`} />
              <Row k="Shipping" v={shipping.price === 0 ? "FREE" : `₹${shipping.price}`} />
              <Row k="Tax (5%)" v={`₹${tax.toLocaleString()}`} />
            </div>
            <div className="flex justify-between text-base font-extrabold border-t border-border pt-3">
              <span>Total</span><span>₹{total.toLocaleString()}</span>
            </div>
            <div className="text-xs text-muted-foreground pt-2 border-t border-border">{cart.length} {cart.length === 1 ? "item" : "items"} in cart</div>
          </aside>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full px-3 py-2.5 rounded-lg border border-border text-sm bg-background" />
    </label>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="font-semibold">{v}</span></div>;
}
