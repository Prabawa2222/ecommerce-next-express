import Banner from "@/components/shared/banner";
import CTA from "@/components/shared/cta";
import HeroVideo from "@/components/shared/hero-video";
import LocomotiveScroll from "@/components/shared/locomotive-scroll";
import HeroHeadline from "./_components/hero-headline";
import ShopFeatured from "./_components/shop-featured";

export default function HomePage() {
  return (
    <LocomotiveScroll>
      <HeroVideo />
      <HeroHeadline />
      <ShopFeatured />
      <CTA
        images={Array.from({ length: 4 }, () => "/cta-background.avif")}
        imgwidth={972}
        imgheight={1024}
      />
      <Banner
        contentWidth={700}
        content={
          <div className="flex items-center w-full h-full justify-start mx-4 gap-x-4">
            <p>Get 10% Off on Frameship.io!</p>
            <p>
              Use the code <span className="text-green-500">MOISE</span> when
              purchasing the plugin.
            </p>
          </div>
        }
      />
    </LocomotiveScroll>
  );
}
