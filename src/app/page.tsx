import Benefits from "@/components/Benefits";
import Card from "@/components/Card";
import Cards from "@/components/Cards";
import Categories from "@/components/Categories";
import FAQPartial from "@/components/FAQPartial";
import Header from "@/components/Header";
import Reviews from "@/components/Reviews";
import productsToPreLoad from "@/helpers/preloadProducts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="mb-10 flex h-full w-full rounded-3xl border border-neutral-700">
        <Header />
      </div>
      <div className="mb-10 flex items-center justify-center">
        <Categories />
      </div>
      <div className="mb-10 h-full w-full rounded-3xl border border-neutral-700">
        <Cards />
      </div>
      <div className="mb-10 h-full w-full rounded-3xl border border-neutral-700">
        <Benefits />
      </div>
      <div className="mb-10 h-full w-full rounded-3xl border border-neutral-700">
        <Reviews />
      </div>
      <div className="mb-10 h-full w-full rounded-3xl border border-neutral-700">
        <FAQPartial />
      </div>
    </div>
  );
}
