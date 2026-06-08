import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ShieldCheck, Truck, RotateCcw, Sparkles, Hammer, Edit3, Palette, Image as ImageIcon, Upload, Type } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/products";
import heroImg from "@/assets/hero-models.jpg";
import customizeHoodie from "@/assets/customize-hoodie.jpg";
import brandStory from "@/assets/brand-story.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "2MENDEVS — Built for the ones who dare to stand out" },
      { name: "description", content: "Premium streetwear. Modern fits. Customize your own. Made in India." },
    ],
  }),
  component: HomePage,
});

const trustItems = [
  { icon: Sparkles, title: "Premium Fabric", sub: "High quality & long lasting" },
  { icon: Hammer, title: "Made in India", sub: "Crafted with care" },
  { icon: RotateCcw, title: "7-Day Returns", sub: "Easy returns & exchanges" },
  { icon: ShieldCheck, title: "Secure Payments", sub: "100% safe & encrypted" },
  { icon: Truck, title: "Fast Shipping", sub: "Delivered to your door" },
];

const categories = [
  { name: "Hoodies", img: products[0].image },
  { name: "T-Shirts", img: products[1].image },
  { name: "Oversized Tees", img: products[4].image },
  { name: "Joggers", img: products[2].image },
  { name: "Accessories", img: products[3].image },
];

const steps = [
  { n: "01", title: "Pick Your Product", text: "Choose from our wide range of premium styles." },
  { n: "02", title: "Customize It", text: "Add your design, text, colors & more." },
  { n: "03", title: "We Craft It", text: "Our team produces it with care & precision." },
  { n: "04", title: "We Deliver It", text: "Fast, safe & reliable delivery to you." },
];

const reviews = [
  { name: "Arjun M.", text: "The quality is insane! The fabric feels premium and the fit is just perfect." },
  { name: "Rohit D.", text: "Love the oversized fit. Super comfortable and stylish." },
  { name: "Karan S.", text: "Fast delivery, amazing quality and the custom hoodie turned out perfectly." },
  { name: "Aditya P.", text: "2MENDEVS never disappoints. My go-to brand now." },
];

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-sand">
        <div className="container-x grid lg:grid-cols-2 gap-10 items-center pt-12 lg:pt-20">
          <div className="space-y-7 pb-12 lg:pb-24">
            <p className="eyebrow">New Collection &apos;26</p>
            <h1 className="headline-xl">
              BUILT FOR<br />
              THE ONES WHO<br />
              <span className="text-sand-deep">DARE TO STAND OUT.</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-md leading-relaxed">
              Premium fabrics. Modern fits.<br />
              Made for comfort. Designed to express.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary">Shop Now <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/customize" className="btn-outline">Customize Yours <Edit3 className="w-4 h-4" /></Link>
            </div>
          </div>
          <div className="relative h-[420px] lg:h-[640px] -mx-5 lg:mx-0">
            <img src={heroImg} alt="2MENDEVS premium hoodies" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background">
        <div className="container-x py-8 grid grid-cols-2 md:grid-cols-5 gap-6">
          {trustItems.map(t => (
            <div key={t.title} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0">
                <t.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider">{t.title}</p>
                <p className="text-[11px] text-muted-foreground">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="eyebrow mb-2">Shop By Category</p>
            <h2 className="headline-lg">Find Your Perfect Fit.</h2>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm font-semibold hover:underline">
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map(c => (
            <Link key={c.name} to="/shop" className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand">
              <img src={c.img} alt={c.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-base uppercase tracking-wide">{c.name}</h3>
                <p className="text-xs mt-1 flex items-center gap-1 opacity-90">Explore Now <ArrowRight className="w-3 h-3" /></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="eyebrow mb-2">Best Sellers</p>
            <h2 className="headline-lg">Most Loved by Customers.</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {products.slice(0, 5).map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section className="container-x">
        <div className="bg-ink text-primary-foreground rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-[1.1fr_1fr_0.9fr]">
            <div className="p-10 lg:p-14 space-y-6">
              <p className="text-[11px] uppercase tracking-widest text-white/60 font-bold">Make It Yours</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                Customize Your<br />
                <span className="text-sand-deep">Own Apparel.</span>
              </h2>
              <p className="text-white/70 text-sm max-w-sm leading-relaxed">
                Your ideas. Your style. Your way. Design something unique that&apos;s 100% you.
              </p>
              <Link to="/customize" className="inline-flex items-center gap-2 bg-white text-ink px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-white/90 transition">
                Start Designing <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-6">
                {[
                  { icon: Type, t: "Add Text", s: "Your words" },
                  { icon: Upload, t: "Upload Logo", s: "Your brand" },
                  { icon: Palette, t: "Choose Colors", s: "Unlimited options" },
                  { icon: ImageIcon, t: "Add Graphics", s: "Stickers & more" },
                ].map(f => (
                  <div key={f.t}>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2"><f.icon className="w-4 h-4" /></div>
                    <p className="text-xs font-bold">{f.t}</p>
                    <p className="text-[11px] text-white/50">{f.s}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative bg-white/5 flex items-center justify-center p-8 min-h-[420px]">
              <img src={customizeHoodie} alt="Customizable hoodie" loading="lazy" className="max-h-[420px] object-contain" />
            </div>
            <div className="p-8 lg:p-10 bg-white/5 space-y-5">
              <div>
                <p className="text-[11px] uppercase text-white/60 mb-2">Choose Color</p>
                <div className="flex gap-2">
                  {["#000", "#E8D9C5", "#8B6F4E", "#525252", "#C9C0B3"].map(c => (
                    <span key={c} className="w-7 h-7 rounded-full border border-white/20" style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] uppercase text-white/60 mb-2">Add Your Text</p>
                <div className="bg-white/10 rounded-lg p-3 text-sm text-white/70">2MENDEVS</div>
              </div>
              <div>
                <p className="text-[11px] uppercase text-white/60 mb-2">Upload Logo</p>
                <div className="bg-white/10 rounded-lg p-6 border border-dashed border-white/20 text-center text-xs text-white/50">
                  <Upload className="w-5 h-5 mx-auto mb-1" />
                  Drop your file
                </div>
              </div>
              <Link to="/customize" className="block text-center bg-white text-ink py-3 rounded-full text-sm font-semibold hover:bg-white/90">
                Preview Design
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-24 text-center">
        <p className="eyebrow mb-2">How It Works</p>
        <h2 className="headline-lg mb-14">From Idea to Your Doorstep.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {steps.map(s => (
            <div key={s.n} className="text-left md:text-center">
              <p className="text-xs font-bold text-sand-deep mb-3">{s.n}</p>
              <h3 className="text-base font-bold uppercase tracking-wide mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="eyebrow mb-2">New Arrivals</p>
            <h2 className="headline-lg">Fresh Drops. New Energy.</h2>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm font-semibold hover:underline">
            View All New Arrivals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {products.slice(2, 8).map(p => <ProductCard key={p.slug + "n"} product={p} />)}
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="grid lg:grid-cols-2 gap-6 bg-sand rounded-3xl overflow-hidden p-8 lg:p-14">
          <div className="space-y-5 self-center">
            <p className="eyebrow">Our Story</p>
            <h2 className="text-3xl lg:text-5xl font-extrabold leading-[1.05]">
              NOT JUST CLOTHING.<br />
              A WAY TO EXPRESS<br />
              <span className="text-sand-deep">YOURSELF.</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              2MENDEVS is built for dreamers, doers and game-changers. We believe in quality, self-expression and pushing boundaries. This is more than fashion. This is a mindset.
            </p>
            <Link to="/about" className="btn-primary mt-4">Learn More About Us <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="aspect-[4/3] lg:aspect-auto rounded-2xl overflow-hidden">
            <img src={brandStory} alt="2MENDEVS brand story" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="eyebrow mb-2">#2MENDEVS</p>
            <h2 className="headline-lg">Styled by You.</h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-sm font-semibold hover:underline">
            See More on Instagram <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[products[0], products[1], products[2], products[4], products[5], products[6]].map((p, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-xl bg-sand group cursor-pointer">
              <img src={p.image} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="mb-10">
          <p className="eyebrow mb-2">What Our Community Says</p>
          <h2 className="headline-lg">Real People. Real Reviews.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map(r => (
            <div key={r.name} className="bg-sand rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-ink text-primary-foreground flex items-center justify-center text-xs font-bold">{r.name[0]}</div>
                <p className="text-sm font-bold">{r.name}</p>
              </div>
              <div className="text-xs mb-2">★★★★★</div>
              <p className="text-sm text-ink-soft leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="bg-ink text-primary-foreground rounded-3xl overflow-hidden grid lg:grid-cols-2 items-center">
          <div className="p-10 lg:p-16 space-y-5">
            <p className="text-[11px] uppercase tracking-widest text-white/60 font-bold">Limited Edition Drop</p>
            <h2 className="text-5xl lg:text-7xl font-extrabold">DROP 03</h2>
            <p className="text-white/60 text-sm">Only 250 pieces available.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-ink px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-white/90">
              Shop The Drop <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative h-64 lg:h-80">
            <img src={brandStory} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="absolute top-6 right-6 w-24 h-24 rounded-full bg-sand text-ink flex flex-col items-center justify-center text-center text-[10px] font-bold">
              <span className="text-base">250</span>
              <span>PIECES</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="bg-sand rounded-3xl p-8 lg:p-12 grid lg:grid-cols-[1.2fr_1fr] gap-6 items-center">
          <div>
            <h3 className="text-2xl lg:text-3xl font-extrabold mb-2">JOIN THE 2MENDEVS CLUB</h3>
            <p className="text-sm text-muted-foreground">Be the first to know about new drops, exclusive offers and more.</p>
          </div>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" className="flex-1 px-4 py-3 rounded-full bg-white border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ink" />
            <button className="bg-sand-deep text-ink px-6 py-3 rounded-full font-bold text-sm hover:bg-ink hover:text-primary-foreground transition">Join Now</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
