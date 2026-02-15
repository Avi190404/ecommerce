import Categories from "@/components/category";
import FeaturedCollection from "@/components/features";
import Hero from "@/components/Hero";
import NewArrivals from "@/components/newArrival";
import Testimonials from "@/components/Testimonial";
import TrendingProducts from "@/components/trending";
import TrustSignals from "@/components/trust-signals";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero/>
      <NewArrivals/>
      <Categories />
      <TrendingProducts />
      <FeaturedCollection />
      <TrustSignals />
      {/* <Testimonials /> */}
    </div>
  );
}
