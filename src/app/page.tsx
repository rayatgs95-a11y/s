import AnnouncementBar from "@/components/sections/AnnouncementBar";
import SiteHeader from "@/components/sections/SiteHeader";
import Hero from "@/components/sections/Hero";
import MarqueeSeparator from "@/components/sections/MarqueeSeparator";
import Collections from "@/components/sections/Collections";
import NewArrivals from "@/components/sections/NewArrivals";
import TopPicksBestSellers from "@/components/sections/TopPicksBestSellers";
import WomenKids from "@/components/sections/WomenKids";
import PrintShop from "@/components/sections/PrintShop";
import RetroMystery from "@/components/sections/RetroMystery";
import Reviews from "@/components/sections/Reviews";
import Newsletter from "@/components/sections/Newsletter";
import SiteFooter from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <Hero />
        <MarqueeSeparator />
        <Collections />
        <NewArrivals />
        <TopPicksBestSellers />
        <WomenKids />
        <PrintShop />
        <RetroMystery />
        <Reviews />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  );
}
