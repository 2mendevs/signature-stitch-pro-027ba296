import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — 2MENDEVS" },
      { name: "description", content: "Shop premium streetwear from 2MENDEVS." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="container-x py-12">
        <p className="eyebrow mb-2">Shop All</p>
        <h1 className="headline-lg mb-10">Every Piece. Every Detail.</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
      <Footer />
    </div>
  );
}
