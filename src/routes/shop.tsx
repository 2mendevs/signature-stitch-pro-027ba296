import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { products, categories, allSizes } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — 2MENDEVS" },
      { name: "description", content: "Shop premium streetwear from 2MENDEVS." },
    ],
  }),
  component: ShopPage,
});

type Sort = "popularity" | "newest" | "price-asc" | "price-desc" | "rating";

function ShopPage() {
  const [q, setQ] = useState("");
  const [cats, setCats] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(3000);
  const [minRating, setMinRating] = useState(0);
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlyBest, setOnlyBest] = useState(false);
  const [sort, setSort] = useState<Sort>("popularity");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (p.price > priceMax) return false;
      if (p.rating < minRating) return false;
      if (onlyNew && !p.isNew) return false;
      if (onlyBest && !p.isBestSeller) return false;
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "newest") list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return list;
  }, [q, cats, sizes, priceMax, minRating, onlyNew, onlyBest, sort]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const Filters = (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-3">Category</p>
        <div className="space-y-2">
          {categories.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={cats.includes(c)} onChange={() => toggle(cats, setCats, c)} className="accent-ink" />
              {c}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-3">Size</p>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button key={s} onClick={() => toggle(sizes, setSizes, s)} className={`px-3 py-1.5 rounded-full text-xs border ${sizes.includes(s) ? "bg-ink text-primary-foreground border-ink" : "border-border"}`}>{s}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-3">Max Price: ₹{priceMax}</p>
        <input type="range" min={199} max={3000} step={100} value={priceMax} onChange={(e) => setPriceMax(+e.target.value)} className="w-full accent-ink" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-3">Min Rating</p>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button key={r} onClick={() => setMinRating(r)} className={`px-3 py-1.5 rounded-full text-xs border ${minRating === r ? "bg-ink text-primary-foreground border-ink" : "border-border"}`}>{r === 0 ? "Any" : `${r}+`}</button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={onlyNew} onChange={(e) => setOnlyNew(e.target.checked)} className="accent-ink" /> New Arrivals</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={onlyBest} onChange={(e) => setOnlyBest(e.target.checked)} className="accent-ink" /> Best Sellers</label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="container-x py-10">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div>
            <p className="eyebrow mb-2">Shop All</p>
            <h1 className="headline-lg">Every Piece. Every Detail.</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="pl-9 pr-3 py-2.5 rounded-full border border-border text-sm bg-background w-56" />
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="px-4 py-2.5 rounded-full border border-border text-sm bg-background">
              <option value="popularity">Popularity</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Best Rated</option>
            </select>
            <button onClick={() => setShowFilters(true)} className="lg:hidden btn-outline !py-2.5 !px-4"><SlidersHorizontal className="w-4 h-4" /> Filters</button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          <aside className="hidden lg:block">{Filters}</aside>
          <div>
            <p className="text-xs text-muted-foreground mb-4">{filtered.length} products</p>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground text-sm">No products match your filters.</div>
            )}
          </div>
        </div>
      </section>

      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setShowFilters(false)}>
          <div className="absolute right-0 top-0 h-full w-80 bg-background p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold uppercase text-sm">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
            </div>
            {Filters}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
