import Carousel from "@/components/shared/carousel";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import Image from "next/image";
import Link from "next/link";

export default function ShopFeatured() {
  const carouselItems = Array.from({ length: 10 }, (_, i) => (
    <div key={i} className="px-3">
      <Link
        href={"#"}
        className="flex flex-col items-center justify-center w-full cursor-pointer gap-y-3"
      >
        {/* TODO: handle case when images is only 1 */}
        <div className="group relative w-full h-[380px] overflow-hidden rounded-sm">
          <Image
            src={"/product-sneaker-1.avif"}
            alt="Sneakers"
            fill
            className="object-cover"
          />
          <Image
            src={"/product-sneaker-2.avif"}
            alt="Sneakers"
            fill
            className="object-cover absolute opacity-0 group-hover:opacity-100 transition-all duration-100 "
          />
        </div>
        <div className="flex flex-col justify-between items-center w-full gap-y-1">
          <div className="flex justify-between items-center w-full">
            <h4 className="grow text-xl font-bold">Sneakers White</h4>
            <p className="text-sm">50%</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="font-bold text">$50.00</p>
            <p className="text-brand-white-200/70 line-through">$100</p>
          </div>
        </div>
      </Link>
    </div>
  ));

  return (
    <div className="">
      <MaxWidthWrapper className="min-h-screen py-12 px-6 relative">
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="flex flex-col w-full h-full justify-center items-center gap-4 max-w-screen-md text-center">
            <h1 className="uppercase text-[44px] font-bold">
              Elevating Your Style Game
            </h1>
            <p className="uppercase text-sm">
              Discover the Perfect Blend of Comfort and Trend with Our Exclusive
              Collection. Explore Deals on Jeans, Sneakers, and More!
            </p>
          </div>

          <div className="relative w-full flex items-center justify-center">
            <div className="grid grid-cols-3 grid-rows-12 gap-6 h-[80vh] w-full">
              <div className="row-start-1 row-end-8 relative border border-zinc-900">
                {/* background */}
                <div className="absolute inset-0">
                  <div className="relative w-full h-full bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
                    <div className="absolute inset-0 grainy-dark opacity-[0.02]"></div>
                  </div>
                </div>
                {/* content */}
                <div className="absolute inset-0 overflow-hidden">
                  <Link
                    href={"#"}
                    className="flex flex-col items-center py-12 px-10 gap-6 cursor-pointer"
                  >
                    <h4 className="uppercase text-[34px] font-bold">Jeans</h4>
                    <p className="text-sm text-center text-brand-white-200/70">
                      Style and comfort meet in our collection of jeans.
                      Discover the latest trends and perfect cuts for an
                      impeccable look.
                    </p>
                    <div className="relative">
                      <Image
                        src={"/featured-shop-jeans.avif"}
                        alt="Jeans"
                        className="object-cover"
                        width={500}
                        height={500}
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="row-start-8 row-span-full relative border border-zinc-900">
                {/* background */}
                <div className="absolute inset-0">
                  <div className="relative w-full h-full bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
                    <div className="absolute inset-0 grainy-dark opacity-[0.02]"></div>
                  </div>
                </div>
                {/* content */}
                <div className="absolute inset-0 overflow-hidden">
                  <Link
                    href={"#"}
                    className="flex flex-col items-center py-12 px-10 gap-6 cursor-pointer"
                  >
                    <h4 className="uppercase text-[34px] font-bold">Shirts</h4>
                    <p className="text-sm text-center text-brand-white-200/70">
                      Style and comfort meet in our collection of shirt.
                      Discover the latest trends and perfect cuts
                    </p>
                    <div className="relative">
                      <Image
                        src={"/featured-shop-shirt.avif"}
                        alt="Jeans"
                        className="object-cover"
                        width={500}
                        height={500}
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="row-span-full col-start-2 relative border border-zinc-900 ">
                {/* background */}
                <div className="absolute inset-0">
                  <div className="relative w-full h-full bg-gradient-to-b from-[[#0a0a0a]] via-[#121212] to-[#0a0a0a]">
                    <div className="absolute inset-0 grainy-dark opacity-[0.01]"></div>
                  </div>
                </div>
                {/* content */}
                <div className="absolute inset-0 overflow-hidden">
                  <Link
                    href={"#"}
                    className="relative flex flex-col items-center py-12 px-10 gap-6 cursor-pointer h-full"
                  >
                    <div className="absolute -top-32">
                      <Image
                        src={"/featured-shop-promotion.avif"}
                        alt="Promotion"
                        className="object-cover -z-10 min-w-[350px] min-  h-[350px]"
                        width={500}
                        height={500}
                      />
                    </div>
                    <div className="grow flex flex-col items-center justify-center gap-6 z-10">
                      <h4 className="uppercase text-[34px] font-bold">
                        Promotions
                      </h4>
                      <p className="text-sm text-center text-brand-white-200/70">
                        Explore exclusive deals on our top products. The perfect
                        opportunity to enrich your wardrobe with trendy pieces
                        at affordable prices.
                      </p>
                    </div>
                    <div className="absolute xl:-bottom-48 -bottom-32">
                      <Image
                        src={"/featured-shop-promotion.avif"}
                        alt="Promotion"
                        className="object-cover -z-10 min-w-[350px] min-h-[350px]"
                        width={450}
                        height={450}
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="row-start-1 row-end-6 col-start-3 relative border border-zinc-900">
                {/* background */}
                <div className="absolute inset-0">
                  <div className="relative w-full h-full bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
                    <div className="absolute inset-0 grainy-dark opacity-[0.02]"></div>
                  </div>
                </div>
                {/* content */}
                <div className="absolute inset-0 overflow-hidden">
                  <Link
                    href={"#"}
                    className="flex flex-col items-center py-12 px-10 gap-6 cursor-pointer"
                  >
                    <h4 className="uppercase text-[34px] font-bold">
                      T-Shirts
                    </h4>
                    <p className="text-sm text-center text-brand-white-200/70">
                      Style and comfort meet in our collection of tshirt.
                      Discover the latest trends and perfect cuts
                    </p>
                    <div className="relative -top-14">
                      <Image
                        src={"/featured-shop-tshirt.avif"}
                        alt="T-Shirts"
                        className="object-cover"
                        width={500}
                        height={500}
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="row-start-6 row-span-full relative border border-zinc-900">
                {/* background */}
                <div className="absolute inset-0">
                  <div className="relative w-full h-full bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
                    <div className="absolute inset-0 grainy-dark opacity-[0.02]"></div>
                  </div>
                </div>
                {/* content */}
                <div className="absolute inset-0 overflow-hidden">
                  <Link
                    href={"#"}
                    className="flex flex-col items-center py-12 px-10 gap-6 cursor-pointer"
                  >
                    <h4 className="uppercase text-[34px] font-bold">
                      Sneakers
                    </h4>
                    <p className="text-sm text-center text-brand-white-200/70">
                      Passion for fashion and comfort is reflected in every pair
                      of sneakers. Experience style and functionality in a
                      single step.
                    </p>
                    <div className="relative ">
                      <Image
                        src={"/featured-shop-sneaker.avif"}
                        alt="T-Shirts"
                        className="object-cover"
                        width={500}
                        height={500}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="min-h-screen py-12 px-6 relative">
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="flex flex-col w-full h-full justify-center items-center gap-4 max-w-screen-md text-center">
            <h1 className="uppercase text-[44px] font-bold">Trending Now</h1>
            <p className="uppercase text-sm">
              Discover the Perfect Blend of Comfort and Trend with Our Exclusive
              Collection. Explore Deals on Jeans, Sneakers, and More!
            </p>
          </div>

          <div className="flex flex-col items-center justify-center w-full gap-12">
            <Carousel items={carouselItems} />
            <Carousel items={carouselItems} />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
