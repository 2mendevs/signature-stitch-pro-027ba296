import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Trash2, Share2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useStore } from "@/lib/store";
import { products } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — 2MENDEVS" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const items = products.filter((p) => wishlist.includes(p.slug));

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: "My 2MENDEVS Wishlist", url });
    else { await navigator.clipboard.writeText(url); toast.success("Wishlist link copied"); }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="container-x py-10">
        <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
          <div>
            <p className="eyebrow mb-2">Your Saves</p>
            <h1 className="headline-lg">Wishlist</h1>
          </div>
          {items.length > 0 && (
            <button onClick={share} className="btn-outline !py-2.5"><Share2 className="w-4 h-4" /> Share</button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-sand rounded-3xl p-16 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-extrabold mb-2">No saved items yet</h2>
            <p className="text-sm text-muted-foreground mb-6">Tap the heart on any product to save it for later.</p>
            <Link to="/shop" className="btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map((p) => (
              <div key={p.slug} className="group">
                <Link to="/product/$slug" params={{ slug: p.slug }} className="block relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand mb-3">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </Link>
                <h3 className="text-sm font-semibold">{p.name}</h3>
                <p className="text-sm font-bold mb-3">₹{p.price.toLocaleString()}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      addToCart({ slug: p.slug, name: p.name, image: p.image, price: p.price, size: p.sizes[0], color: p.colors[0], qty: 1 });
                      toast.success("Added to cart");
                    }}
                    className="flex-1 bg-ink text-primary-foreground py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                  <button onClick={() => toggleWishlist(p.slug)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-sand"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
