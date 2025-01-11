type Props = {
  params: Promise<{ productId: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const productId = (await params).productId;
  return <div>ProductDetailPage</div>;
}
