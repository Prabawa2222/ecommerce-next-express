import Image from "next/image";
import Link from "next/link";
import Badge from "../badge";

type Props = {
  product:
    | {
        href: string;
        images: { src: string; alt: string }[];
        name: string;
        badge: string;
        price: string;
        discountPercent?: undefined;
        discountPrice?: undefined;
      }
    | {
        href: string;
        images: { src: string; alt: string }[];
        name: string;
        badge: string;
        price: string;
        discountPercent: string;
        discountPrice: string;
      };
};

export default function ProductCard({ product }: Props) {
  const img1 = product.images.at(0);
  const img2 = product.images.at(1);

  return (
    <Link
      href={product.href}
      className="relative flex flex-col items-center justify-center w-full cursor-pointer gap-y-3"
    >
      <Badge
        className="absolute top-2 right-2 z-10"
        title={product.badge}
      ></Badge>
      <div className="group relative w-full h-[380px] overflow-hidden rounded-sm">
        <Image
          src={img1?.src || "/no-img-placeholder.svg"}
          alt={img1?.alt || "No image Placeholder"}
          fill
          className="object-cover"
        />
        <Image
          src={img2?.src || "/no-img-placeholder.svg"}
          alt={img1?.alt || "No image Placeholder"}
          fill
          className="object-cover absolute opacity-0 group-hover:opacity-100 transition-all duration-100 "
        />
      </div>
      <div className="flex flex-col justify-between items-center w-full gap-y-1">
        {product.discountPercent && product.discountPrice ? (
          <>
            <div className="flex justify-between items-center w-full">
              <h4 className="grow text-xl font-bold">{product.name}</h4>
              <p className="text-sm">{product.discountPercent}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="font-bold text">{product.discountPrice}</p>
              <p className="text-brand-white-200/70 line-through">
                {product.price}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center w-full">
              <h4 className="grow text-xl font-bold">{product.name}</h4>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="font-bold text">{product.price}</p>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
