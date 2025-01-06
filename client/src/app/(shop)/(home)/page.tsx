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
    </LocomotiveScroll>
  );
}
