import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Package, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/track")({
  head: () => ({ meta: [{ title: "Track Order — 2MENDEVS" }] }),
  component: TrackPage,
});

function TrackPage() {
  const [id, setId] = useState("");
  const { orders } = useStore();
  const navigate = useNavigate();

  const submit = () => {
    const o = orders.find((o) => o.id.toLowerCase() === id.trim().toLowerCase());
    if (o) navigate({ to: "/order/$id", params: { id: o.id } });
    else toast.error("Order not found");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="container-x py-16 max-w-2xl mx-auto">
        <Package className="w-10 h-10 mx-auto mb-4" />
        <p className="eyebrow mb-2 text-center">Order Tracking</p>
        <h1 className="headline-lg text-center mb-8">Where is my order?</h1>
        <div className="bg-sand rounded-2xl p-8 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold">Enter Order ID</span>
            <input value={id} onChange={(e) => setId(e.target.value)} placeholder="ORD123456" className="mt-2 w-full px-4 py-3 rounded-lg border border-border text-sm bg-background" />
          </label>
          <button onClick={submit} className="btn-primary w-full justify-center">Track Order <ArrowRight className="w-4 h-4" /></button>
        </div>
        {orders.length > 0 && (
          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-3">Recent Orders</p>
            <div className="space-y-2">
              {orders.slice(0, 3).map((o) => (
                <button key={o.id} onClick={() => navigate({ to: "/order/$id", params: { id: o.id } })} className="w-full flex justify-between items-center p-4 bg-background border border-border rounded-xl hover:bg-sand text-left">
                  <div>
                    <p className="text-sm font-semibold">{o.id}</p>
                    <p className="text-xs text-muted-foreground">{new Date(o.placedAt).toLocaleDateString()} · {o.items.length} items</p>
                  </div>
                  <span className="text-xs font-bold">₹{o.total.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
