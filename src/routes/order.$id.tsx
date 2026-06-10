import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Download, Package, ArrowRight, MapPin, CreditCard } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/order/$id")({
  head: ({ params }) => ({ meta: [{ title: `Order ${params.id} — 2MENDEVS` }] }),
  component: OrderPage,
});

const timeline = ["Placed", "Confirmed", "Processing", "Packed", "Shipped", "Out for Delivery", "Delivered"];

function OrderPage() {
  const { id } = Route.useParams();
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <section className="container-x py-20 text-center">
          <h1 className="text-2xl font-extrabold mb-3">Order not found</h1>
          <Link to="/shop" className="btn-primary">Continue Shopping</Link>
        </section>
        <Footer />
      </div>
    );
  }

  const elapsedDays = Math.floor((Date.now() - new Date(order.placedAt).getTime()) / 86400000);
  const currentStep = Math.min(timeline.length - 1, Math.max(0, elapsedDays + 1));
  const eta = new Date(order.estimatedDelivery).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const download = () => {
    const data = `2MENDEVS · Invoice ${order.id}\nDate: ${new Date(order.placedAt).toLocaleString()}\n\n${order.items.map((i) => `${i.name} × ${i.qty}   ₹${(i.price * i.qty).toLocaleString()}`).join("\n")}\n\nSubtotal: ₹${order.subtotal.toLocaleString()}\nShipping: ₹${order.shipping}\nTax: ₹${order.tax}\nTotal: ₹${order.total.toLocaleString()}\n\nShipping to:\n${order.address.fullName}\n${order.address.line1}, ${order.address.city}, ${order.address.state} ${order.address.pincode}\n`;
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${order.id}.txt`; a.click();
    toast.success("Invoice downloaded");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="container-x py-10 space-y-6">
        <div className="bg-sand rounded-3xl p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-ink text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8" />
          </div>
          <p className="eyebrow mb-2">Order Confirmed</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Thank you for your order!</h1>
          <p className="text-sm text-muted-foreground">Order ID <span className="font-bold text-ink">{order.id}</span> · Estimated delivery <span className="font-bold text-ink">{eta}</span></p>
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            <button onClick={download} className="btn-outline"><Download className="w-4 h-4" /> Download Invoice</button>
            <Link to="/shop" className="btn-primary">Continue Shopping <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>

        <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
          <h2 className="font-extrabold uppercase mb-6 flex items-center gap-2"><Package className="w-4 h-4" /> Track Your Order</h2>
          <div className="relative">
            <div className="absolute left-0 right-0 top-4 h-1 bg-sand rounded" />
            <div className="absolute left-0 top-4 h-1 bg-ink rounded transition-all" style={{ width: `${(currentStep / (timeline.length - 1)) * 100}%` }} />
            <div className="relative grid grid-cols-7 gap-2">
              {timeline.map((t, i) => (
                <div key={t} className="text-center">
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-[10px] font-bold ${i <= currentStep ? "bg-ink text-primary-foreground" : "bg-sand text-muted-foreground"}`}>
                    {i <= currentStep ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <p className={`text-[10px] mt-2 font-semibold leading-tight ${i <= currentStep ? "text-ink" : "text-muted-foreground"}`}>{t}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-6">Tracking ID: <span className="font-bold text-ink">TRK{order.id.slice(3)}IN</span></p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-background border border-border rounded-2xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Shipping Address</h3>
            <p className="text-sm font-semibold">{order.address.fullName}</p>
            <p className="text-xs text-muted-foreground mt-1">{order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ""}</p>
            <p className="text-xs text-muted-foreground">{order.address.city}, {order.address.state} {order.address.pincode}</p>
            <p className="text-xs text-muted-foreground mt-1">📞 {order.address.mobile}</p>
          </div>
          <div className="bg-background border border-border rounded-2xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2"><CreditCard className="w-3.5 h-3.5" /> Payment</h3>
            <p className="text-sm font-semibold">{order.paymentMethod}</p>
            <p className="text-xs text-muted-foreground mt-1">{order.shippingMethod}</p>
          </div>
          <div className="bg-background border border-border rounded-2xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3">Order Total</h3>
            <div className="text-xs space-y-1.5">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{order.subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>₹{order.shipping}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>₹{order.tax.toLocaleString()}</span></div>
              <div className="flex justify-between font-extrabold text-sm pt-2 border-t border-border"><span>Total</span><span>₹{order.total.toLocaleString()}</span></div>
            </div>
          </div>
        </div>

        <div className="bg-background border border-border rounded-2xl p-6">
          <h3 className="font-extrabold uppercase mb-4">Items</h3>
          <div className="space-y-3">
            {order.items.map((it) => (
              <div key={it.id} className="flex gap-4 items-center">
                <img src={it.image} alt={it.name} className="w-14 h-16 rounded-lg object-cover bg-sand" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{it.name}</p>
                  <p className="text-xs text-muted-foreground">Size {it.size} · Qty {it.qty}{it.custom && " · Custom"}</p>
                </div>
                <p className="text-sm font-bold">₹{(it.price * it.qty).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
