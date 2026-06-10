import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2, Heart, ArrowRight, ShoppingBag } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useStore, cartSubtotal } from "@/lib/store";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — 2MENDEVS" }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, removeFromCart, toggleWishlist } = useStore();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const subtotal = cartSubtotal(cart);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "2MND10") {
      setDiscount(Math.round(subtotal * 0.1));
      toast.success("Coupon applied — 10% off!");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="container-x py-10">
        <p className="eyebrow mb-2">Your Cart</p>
        <h1 className="headline-lg mb-10">Review Your Order.</h1>

        {cart.length === 0 ? (
          <div className="bg-sand rounded-3xl p-16 text-center">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-extrabold mb-2">Your cart is empty</h2>
            <p className="text-sm text-muted-foreground mb-6">Discover premium streetwear made for you.</p>
            <Link to="/shop" className="btn-primary">Start Shopping <ArrowRight className="w-4 h-4" /></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-background border border-border rounded-2xl p-4 flex gap-4">
                  <div className="w-24 h-28 rounded-xl overflow-hidden bg-sand shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-sm">{item.name}</h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>Size: <span className="text-ink font-semibold">{item.size}</span></span>
                          <span className="flex items-center gap-1">Color: <span className="w-3 h-3 rounded-full inline-block border border-border" style={{ background: item.color }} /></span>
                        </div>
                        {item.custom && (
                          <p className="text-[11px] mt-1 inline-block bg-sand px-2 py-0.5 rounded-full">✦ Custom Design</p>
                        )}
                      </div>
                      <p className="text-sm font-extrabold whitespace-nowrap">₹{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="inline-flex items-center border border-border rounded-full">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 py-1.5"><Minus className="w-3 h-3" /></button>
                        <span className="px-3 text-sm font-semibold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 py-1.5"><Plus className="w-3 h-3" /></button>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {!item.custom && (
                          <button onClick={() => { toggleWishlist(item.slug); toast("Moved to wishlist"); removeFromCart(item.id); }} className="flex items-center gap-1 hover:text-ink"><Heart className="w-3.5 h-3.5" /> Wishlist</button>
                        )}
                        <button onClick={() => removeFromCart(item.id)} className="flex items-center gap-1 hover:text-ink"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-sand rounded-2xl p-6 h-fit sticky top-28 space-y-4">
              <h3 className="font-extrabold uppercase">Order Summary</h3>
              <div className="flex gap-2">
                <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code (try 2MND10)" className="flex-1 px-3 py-2 rounded-lg bg-white border border-border text-sm" />
                <button onClick={applyCoupon} className="px-4 py-2 bg-ink text-primary-foreground rounded-lg text-xs font-bold">Apply</button>
              </div>
              <div className="space-y-2 text-sm border-t border-border pt-4">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="font-semibold">{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax (5%)</span><span className="font-semibold">₹{tax.toLocaleString()}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-700"><span>Discount</span><span className="font-semibold">−₹{discount.toLocaleString()}</span></div>}
              </div>
              <div className="flex justify-between text-base font-extrabold border-t border-border pt-4">
                <span>Total</span><span>₹{total.toLocaleString()}</span>
              </div>
              <button onClick={() => navigate({ to: "/checkout" })} className="w-full bg-ink text-primary-foreground py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>
              <Link to="/shop" className="block text-center text-xs underline text-muted-foreground">Continue Shopping</Link>
            </aside>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
