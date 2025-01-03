import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function ShopFeatured() {
  return (
    <div className="z-10">
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

          <div className="grid lg:grid-cols-3 lg:grid-rows-3"></div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
